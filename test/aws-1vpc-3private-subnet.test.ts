import { Match, Template } from '@aws-cdk/assertions';
import * as cdk from '@aws-cdk/core';
//import { StackDeployment } from 'aws-cdk-lib/pipelines';
import * as MyAws1Vpc3PrivateSubnetStack from '../lib/aws-1vpc-3private-subnet-stack';

const app = new cdk.App();
const stack = new MyAws1Vpc3PrivateSubnetStack.Aws1Vpc3PrivateSubnetStack(app, 'MyTestStack');
const template = Template.fromStack(stack);

const getResouceIds = (type: string, props?: any): string[] =>
  Object.keys(template.findResources(type, props ? {properties: props } : {} ));

const getResouceId = (type: string, props?: any): string => {
  const resouceIds = getResouceIds(type, props);
  if(resouceIds.length !== 1)
    throw new Error('リソースが無いか1つに特定出来ません');
  return resouceIds[0];
};

test('VPCがCidr10.0.0.0/16で1つ作成されること', () => {
  template.resourceCountIs('AWS::EC2::VPC', 1);
  template.hasResourceProperties('AWS::EC2::VPC', {
    CidrBlock: '10.0.0.0/16',
    Tags: [{ 'Key': 'Name', 'Value': 'template-vpc' }]
  });
});

//後で使うためのVPCのリソースIDを取得
const vpcId = getResouceId('AWS::EC2::VPC');

test('サブネットが9つ作成されること', () => {
  template.resourceCountIs('AWS::EC2::Subnet', 9);
});

//パブリックサブネット
test('パブリックサブネットが/24で3つ作成されること', () => {
  template.resourceCountIs('AWS::EC2::Subnet', 3);
  template.hasResourceProperties('AWS::EC2::Subnet', {
    VpcId: { Ref: vpcId },
    CidrBlock: Match.stringLikeRegexp('.*/24'),
    MapPublicIpOnLaunch: true
  });
});

test('AZ-aにパブリックサブネットが1つ作成されること', () => {
  template.hasResourceProperties('AWS::EC2::Subnet', {
    VpcId: { Ref: vpcId },
    CidrBlock: '10.0.0.0/24',
    AvailabilityZone: 'ap-northeast-1a',
    Tags: [{ 'Key': 'Name', 'Value': 'template-public-subnet-1a-1' }]
  });
});

test('AZ-cにパブリックサブネットが1つ作成されること', () => {
  template.hasResourceProperties('AWS::EC2::Subnet', {
    VpcId: { Ref: vpcId },
    CidrBlock: '10.0.1.0/24',
    AvailabilityZone: 'ap-northeast-1c',
    Tags: [{ 'Key': 'Name', 'Value': 'template-public-subnet-1c-1' }]
  });
});

test('AZ-dにパブリックサブネットが1つ作成されること', () => {
  template.hasResourceProperties('AWS::EC2::Subnet', {
    VpcId: { Ref: vpcId },
    CidrBlock: '10.0.2.0/24',
    AvailabilityZone: 'ap-northeast-1d',
    Tags: [{ 'Key': 'Name', 'Value': 'template-public-subnet-1d-1' }]
  });
});


//プライベートサブネット
test('プライベートサブネットが/24で6つ作成されること', () => {
  template.resourceCountIs('AWS::EC2::Subnet', 6);
  template.hasResourceProperties('AWS::EC2::Subnet', {
    VpcId: { Ref: vpcId },
    CidrBlock: Match.stringLikeRegexp('.*/24'),
    MapPublicIpOnLaunch: false
  });
});

test('AZ-aにプライベートサブネットが2つ作成されること', () => {
  template.hasResourceProperties('AWS::EC2::Subnet', {
    VpcId: { Ref: vpcId },
    CidrBlock: '10.0.10.0/24',
    AvailabilityZone: 'ap-northeast-1a',
    Tags: [{ 'Key': 'Name', 'Value': 'template-private-subnet-1a-1' }]
  });
  template.hasResourceProperties('AWS::EC2::Subnet', {
    VpcId: { Ref: vpcId },
    CidrBlock: '10.0.20.0/24',
    AvailabilityZone: 'ap-northeast-1a',
    Tags: [{ 'Key': 'Name', 'Value': 'template-private-subnet-1a-2' }]
  });
});

test('AZ-cにプライベートサブネットが2つ作成されること', () => {
  template.hasResourceProperties('AWS::EC2::Subnet', {
    VpcId: { Ref: vpcId },
    CidrBlock: '10.0.11.0/24',
    AvailabilityZone: 'ap-northeast-1c',
    Tags: [{ 'Key': 'Name', 'Value': 'template-private-subnet-1c-1' }]
  });
  template.hasResourceProperties('AWS::EC2::Subnet', {
    VpcId: { Ref: vpcId },
    CidrBlock: '10.0.21.0/24',
    AvailabilityZone: 'ap-northeast-1c',
    Tags: [{ 'Key': 'Name', 'Value': 'template-private-subnet-1c-2' }]
  });
});

test('AZ-dにプライベートサブネットが2つ作成されること', () => {
  template.hasResourceProperties('AWS::EC2::Subnet', {
    VpcId: { Ref: vpcId },
    CidrBlock: '10.0.12.0/24',
    AvailabilityZone: 'ap-northeast-1d',
    Tags: [{ 'Key': 'Name', 'Value': 'template-private-subnet-1d-1' }]
  });
  template.hasResourceProperties('AWS::EC2::Subnet', {
    VpcId: { Ref: vpcId },
    CidrBlock: '10.0.22.0/24',
    AvailabilityZone: 'ap-northeast-1d',
    Tags: [{ 'Key': 'Name', 'Value': 'template-private-subnet-1d-2' }]
  });
});
