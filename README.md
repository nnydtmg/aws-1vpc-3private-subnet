# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template

# This Repository creates these aws resouces.

* 1VPC at ap-northeast-1
* 3PublicSubnet at ap-northeast-1a,ap-northeast-1c and ap-northeast-1d
* 6PrivateSubnet at ap-northeast-1a,ap-northeast-1c and ap-northeast-1d each 2 subnets
* InternetGateway
* RouteTable (Public and Private)