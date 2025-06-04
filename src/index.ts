import { Duration, RemovalPolicy, Stack } from 'aws-cdk-lib';
import { HttpApi, HttpMethod } from 'aws-cdk-lib/aws-apigatewayv2';
import * as integrations from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as logs from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';
import { IntegratorFunction } from './funcs/integrator-function';

export interface GitLabDevinSlackIntegratorProps {
  readonly secretName: string;
}

export class GitLabDevinSlackIntegrator extends Construct {
  constructor(scope: Construct, id: string, props: GitLabDevinSlackIntegratorProps) {
    super(scope, id);

    // 👇 Get account & region
    const account = Stack.of(scope).account;
    const region = Stack.of(scope).region;
    const partition = Stack.of(scope).partition;

    // Create DynamoDB(GitLab MR ID & Slack message timestamp)
    const table = new dynamodb.Table(this, 'GitLabMargeRquestTimestampTable', {
      partitionKey: { name: 'mrid', type: dynamodb.AttributeType.NUMBER },
      removalPolicy: RemovalPolicy.DESTROY,
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });

    // GitLab Webhook Lambda
    const messangerFunction = new IntegratorFunction(this, 'IntegratorFunction', {
      description: 'Send Slack message function',
      architecture: lambda.Architecture.ARM_64,
      role: new iam.Role(this, 'MessangerFunctionExecutionRole', {
        // roleName: names.functionRoleName,
        description: '',
        assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
        managedPolicies: [
          iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
        ],
        inlinePolicies: {
          'get-secret-policy': new iam.PolicyDocument({
            statements: [
              new iam.PolicyStatement({
                effect: iam.Effect.ALLOW,
                actions: [
                  'secretsmanager:GetSecretValue',
                ],
                resources: [
                  `arn:${partition}:secretsmanager:${region}:${account}:secret:${props.secretName}*`,
                ],
              }),
            ],
          }),
        },
      }),
      timeout: Duration.seconds(10),
      paramsAndSecrets: lambda.ParamsAndSecretsLayerVersion.fromVersion(lambda.ParamsAndSecretsVersions.V1_0_103, {
        cacheSize: 500,
        logLevel: lambda.ParamsAndSecretsLogLevel.INFO,
      }),
      environment: {
        TABLE_NAME: table.tableName,
        SECRET_NAME: props.secretName,
      },
      loggingFormat: lambda.LoggingFormat.JSON,
      systemLogLevelV2: lambda.SystemLogLevel.INFO,
      applicationLogLevelV2: lambda.ApplicationLogLevel.INFO,
      logGroup: new logs.LogGroup(this, 'MessangerFunctionLogGroup', {
        //logGroupName: names.functionName ? `/aws/lambda/${names.functionName}` : undefined,
        retention: logs.RetentionDays.THREE_MONTHS,
        removalPolicy: RemovalPolicy.RETAIN_ON_UPDATE_OR_DELETE,
      }),
    });
    // todo: get/put/deleteの厳密な定義を行う
    table.grantReadWriteData(messangerFunction);

    // HTTP API
    const api = new HttpApi(this, 'SlackGitlabIntegrationAPI', {
      apiName: 'Slack GitLab Integration API',
    });

    // GitLab Webhook 用ルート（path-based channel）
    api.addRoutes({
      path: '/gitlab/merge/request/{channel}',
      methods: [HttpMethod.POST],
      integration: new integrations.HttpLambdaIntegration('GitlabWebhookIntegration', messangerFunction),
    });
  }
}