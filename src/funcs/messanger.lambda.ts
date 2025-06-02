import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { WebClient } from '@slack/web-api';
import { APIGatewayProxyHandlerV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import axios from 'axios';


const SECRET_MANAGER_GET_URL = 'http://localhost:2773/secretsmanager/get';
const AWS_SESSION_TOKEN = process.env.AWS_SESSION_TOKEN || '';
const TABLE_NAME = process.env.TABLE_NAME!;
const SECRET_NAME = process.env.SECRET_NAME!;

const ddbClient = new DynamoDBClient({});
const ddb = DynamoDBDocumentClient.from(ddbClient);

type Secrets = {
  GitLabSecretToken: string;
  SlackSecretToken: string;
  SlackDevinUserIdentifier: string;
  GitLabDevinUserIdentifier: number;
};

const responseHeaders = {
  'Content-Type': 'application/json',
};

export const handler: APIGatewayProxyHandlerV2 = async (event): Promise<APIGatewayProxyResultV2> => {
  // パスパラメータからチャンネルID取得
  const channelId = event.pathParameters?.channel;
  if (!channelId) {
    return { statusCode: 400, body: 'Missing channel parameter' };
  }

  // Get GitLab Secret by SecretManger
  const secrets = await (async () => {
    const result = await axios.get(SECRET_MANAGER_GET_URL, {
      params: {
        secretId: encodeURIComponent(SECRET_NAME), // require URI Encord "/"
        // withDecryption: true,
      },
      headers: {
        'X-Aws-Parameters-Secrets-Token': AWS_SESSION_TOKEN,
      },
    });
    return JSON.parse(result.data.SecretString) as Secrets;
  })();

  // Validate GitLab SecretToken
  const gitlabToken = event.headers['x-gitlab-token'];
  if (gitlabToken !== secrets.GitLabSecretToken) {
    return { statusCode: 403, body: 'Invalid GitLab token' };
  }

  const payload = JSON.parse(event.body!);
  console.log(payload);
  let text: string;
  let mrid: string;

  switch (payload.object_kind) {
    case 'merge_request':
      const mr = payload.object_attributes;
      mrid = mr.id as string;
      if (mr.assignee_id == secrets.GitLabDevinUserIdentifier) {
        text = `Hey <@${secrets.SlackDevinUserIdentifier}> \n🥳 Merge Request: <${mr.url}|${mr.title}> by ${payload.user.username}\nI have created a MR, please review it. Please review the description of the MR.`;

        // MR投稿 → Slack へ message を投げ、ts を取得して保存
        const slackClient = new WebClient(secrets.SlackSecretToken);
        const res = await slackClient.chat.postMessage({ channel: channelId, text });
        const ts = res.ts;
        if (ts) {
          await ddb.send(new PutCommand({
            TableName: TABLE_NAME,
            Item: { mrid, threadTs: ts },
          }));
        }
        return {
          headers: responseHeaders,
          statusCode: 200,
          body: JSON.stringify({
            message: 'OK',
            detail: 'Created a MR',
          }),
        };
      } else {
        return {
          headers: responseHeaders,
          statusCode: 200,
          body: JSON.stringify({
            message: 'OK',
            detail: 'This request went through (Not assigned to devin).',
          }),
        };
      }

    default:
      return { statusCode: 400, body: 'Event ignored' };
  }
};