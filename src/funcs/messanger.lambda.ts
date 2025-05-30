import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand } from '@aws-sdk/lib-dynamodb';
import { WebClient } from '@slack/web-api';
import { APIGatewayProxyHandlerV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import axios from 'axios';


const SECRET_MANAGER_GET_URL = 'http://localhost:2773/secretsmanager/get';
const AWS_SESSION_TOKEN = process.env.AWS_SESSION_TOKEN || '';
const TABLE_NAME = process.env.TABLE_NAME!;

const ddbClient = new DynamoDBClient({});
const ddb = DynamoDBDocumentClient.from(ddbClient);

type Secrets = {
  GitLabSecretToken: string;
  SlackSecretToken: string;
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
        secretId: encodeURIComponent(process.env.SLACK_WEBOOK_SECRET_NAME!), // require URI Encord "/"
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
  let text: string;
  let mrId: string;

  switch (payload.object_kind) {
    case 'merge_request':
      const mr = payload.object_attributes;
      mrId = mr.id as string;
      text = `Hey <@U08SFTBUUPM> \n🥳 Merge Request: <${mr.url}|${mr.title}> by ${payload.user.username}\I have ncreated a MR, please review it. Please review the description of the MR.`;

      // MR投稿 → Slack へ message を投げ、ts を取得して保存
      const slackClient = new WebClient(secrets.SlackSecretToken);
      const res = await slackClient.chat.postMessage({ channel: channelId, text });
      const ts = res.ts;
      if (ts) {
        await ddb.send(new PutCommand({
          TableName: TABLE_NAME,
          Item: { mrId, threadTs: ts },
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
    default:
      return { statusCode: 400, body: 'Event ignored' };
  }
};