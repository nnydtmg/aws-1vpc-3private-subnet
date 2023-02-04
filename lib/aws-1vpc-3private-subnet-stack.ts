import * as cdk from '@aws-cdk/core';
import { CfnVPC, CfnSubnet } from '@aws-cdk/aws-ec2';

export class Aws1Vpc3PrivateSubnetStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const systemName = this.node.tryGetContext('systemName');
    const envType = this.node.tryGetContext('envType');

    const vpc = new CfnVPC(this, 'Vpc', {
      cidrBlock: '10.0.0.0/16',
      tags: [{ key: 'Name', value: `${systemName}-${envType}-vpc` }]
    });

    const subnetPublic1a = new CfnSubnet(this, 'SubnetPublic1a', {
      cidrBlock: '10.0.0.0/24',
      vpcId: vpc.ref,
      availabilityZone: 'ap-northeast-1a',
      mapPublicIpOnLaunch: true,
      tags: [{ key: 'Name', value: `${systemName}-${envType}-public-subnet-1a-1` }]
    })
    const subnetPublic1c = new CfnSubnet(this, 'SubnetPublic1c', {
      cidrBlock: '10.0.1.0/24',
      vpcId: vpc.ref,
      availabilityZone: 'ap-northeast-1c',
      mapPublicIpOnLaunch: true,
      tags: [{ key: 'Name', value: `${systemName}-${envType}-public-subnet-1c-1` }]
    })
    const subnetPublic1d = new CfnSubnet(this, 'SubnetPublic1d', {
      cidrBlock: '10.0.2.0/24',
      vpcId: vpc.ref,
      availabilityZone: 'ap-northeast-1d',
      mapPublicIpOnLaunch: true,
      tags: [{ key: 'Name', value: `${systemName}-${envType}-public-subnet-1d-1` }]
    })

    const subnetPrivate1a1 = new CfnSubnet(this, 'SubnetPrivate1a1', {
      cidrBlock: '10.0.10.0/24',
      vpcId: vpc.ref,
      availabilityZone: 'ap-northeast-1a',
      mapPublicIpOnLaunch: false,
      tags: [{ key: 'Name', value: `${systemName}-${envType}-private-subnet-1a-1` }]
    })
    const subnetPrivate1a2 = new CfnSubnet(this, 'SubnetPrivate1a2', {
      cidrBlock: '10.0.20.0/24',
      vpcId: vpc.ref,
      availabilityZone: 'ap-northeast-1a',
      mapPublicIpOnLaunch: false,
      tags: [{ key: 'Name', value: `${systemName}-${envType}-private-subnet-1a-2` }]
    })
    const subnetPrivate1c1 = new CfnSubnet(this, 'SubnetPrivate1c1', {
      cidrBlock: '10.0.11.0/24',
      vpcId: vpc.ref,
      availabilityZone: 'ap-northeast-1c',
      mapPublicIpOnLaunch: false,
      tags: [{ key: 'Name', value: `${systemName}-${envType}-private-subnet-1c-1` }]
    })
    const subnetPrivate1c2 = new CfnSubnet(this, 'SubnetPrivate1c2', {
      cidrBlock: '10.0.21.0/24',
      vpcId: vpc.ref,
      availabilityZone: 'ap-northeast-1c',
      mapPublicIpOnLaunch: false,
      tags: [{ key: 'Name', value: `${systemName}-${envType}-private-subnet-1c-2` }]
    })
    const subnetPrivate1d1 = new CfnSubnet(this, 'SubnetPrivate1d1', {
      cidrBlock: '10.0.12.0/24',
      vpcId: vpc.ref,
      availabilityZone: 'ap-northeast-1d',
      mapPublicIpOnLaunch: false,
      tags: [{ key: 'Name', value: `${systemName}-${envType}-private-subnet-1d-1` }]
    })
    const subnetPrivate1d2 = new CfnSubnet(this, 'SubnetPrivate1d2', {
      cidrBlock: '10.0.22.0/24',
      vpcId: vpc.ref,
      availabilityZone: 'ap-northeast-1d',
      mapPublicIpOnLaunch: false,
      tags: [{ key: 'Name', value: `${systemName}-${envType}-private-subnet-1d-2` }]
    })
  }
}