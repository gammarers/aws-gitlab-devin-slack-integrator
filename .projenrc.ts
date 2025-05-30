import { awscdk, javascript } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'yicr',
  authorAddress: 'yicr@users.noreply.github.com',
  cdkVersion: '2.189.1',
  defaultReleaseBranch: 'main',
  typescriptVersion: '5.8.x',
  jsiiVersion: '5.8.x',
  name: '@gammarers/aws-gitlab-merge-request-devin-review-slack-messenger',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/gammarers/aws-gitlab-merge-request-devin-review-slack-messenger.git',
  deps: [],
  releaseToNpm: false,
  npmAccess: javascript.NpmAccess.PUBLIC,
  minNodeVersion: '20.0.0',
  workflowNodeVersion: '22.x',
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['yicr'],
  },
});
project.synth();