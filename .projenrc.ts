import { awscdk, javascript } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'yicr',
  authorAddress: 'yicr@users.noreply.github.com',
  cdkVersion: '2.189.1',
  defaultReleaseBranch: 'main',
  typescriptVersion: '5.8.x',
  jsiiVersion: '5.8.x',
  name: '@gammarers/aws-gitlab-devin-slack-integrator',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/gammarers/aws-gitlab-devin-slack-integrator.git',
  devDeps: [
    '@types/aws-lambda@^8.10.149',
    '@slack/web-api@^7.9.2',
    '@aws-sdk/client-dynamodb@^3.817.0',
    '@aws-sdk/lib-dynamodb@^3.817.0',
    'axios@^1.9.0',
    '@gammarers/jest-aws-cdk-asset-filename-renamer@^0.5.50',
  ],
  jestOptions: {
    jestConfig: {
      snapshotSerializers: ['@gammarers/jest-aws-cdk-asset-filename-renamer'],
    },
    extraCliOptions: ['--silent'],
  },
  lambdaOptions: {
    runtime: awscdk.LambdaRuntime.NODEJS_22_X,
    bundlingOptions: {
      externals: ['@aws-sdk/*'],
      sourcemap: true,
    },
  },
  releaseToNpm: false,
  npmAccess: javascript.NpmAccess.PUBLIC,
  minNodeVersion: '20.0.0',
  workflowNodeVersion: '22.x',
  depsUpgradeOptions: {
    workflowOptions: {
      labels: ['auto-approve', 'auto-merge'],
      // schedule: javascript.UpgradeDependenciesSchedule.expressions(['2 16 * * 3']),
    },
  },
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['yicr'],
  },
});
project.synth();