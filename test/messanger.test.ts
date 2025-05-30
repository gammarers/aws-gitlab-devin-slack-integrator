import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { GitLabMergeRequestDevinReviewSlackMessanger } from '../src';

describe('Subscription Testing', () => {

  const app = new App();
  const stack = new Stack(app, 'TestingStack');

  new GitLabMergeRequestDevinReviewSlackMessanger(stack, 'GitLabMergeRequestDevinReviewSlackMessanger', {
    secretName: 'foobar',
  });

  const template = Template.fromStack(stack);

  it('Is Lambda Function Resource Count', () => {
    template.resourceCountIs('AWS::Lambda::Function', 1);
  });

  it('Is IAM Role Resource Count', () => {
    template.resourceCountIs('AWS::IAM::Role', 1);
  });

  it('Is Logs LogGroup Resource Count', () => {
    template.resourceCountIs('AWS::Logs::LogGroup', 1);
  });

  it('Should match snapshot', () => {
    expect(template.toJSON()).toMatchSnapshot();
  });
});