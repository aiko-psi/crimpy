import { Fn, TerraformStack } from "cdktf";
import { Construct } from "constructs";
import { configureAWSProvider } from "../common/configure-aws-provider";
import { Vpc } from "@cdktf/provider-aws/lib/vpc";
import { VpcEndpoint } from "@cdktf/provider-aws/lib/vpc-endpoint";
import { DataAwsAvailabilityZones } from "@cdktf/provider-aws/lib/data-aws-availability-zones";
import { Subnet } from "@cdktf/provider-aws/lib/subnet";
import { RouteTable } from "@cdktf/provider-aws/lib/route-table";
import { InternetGateway } from "@cdktf/provider-aws/lib/internet-gateway";
import { RouteTableAssociation } from "@cdktf/provider-aws/lib/route-table-association";
import { SecurityGroup } from "@cdktf/provider-aws/lib/security-group";

export type VPCWithSubnets = {
  vpc: Vpc;
  publicSubnetIDs: string[];
  privateSubnetIDs: string[];
};

export class NetworkStack extends TerraformStack {
  readonly vpc: VPCWithSubnets;
  readonly dynamoSecurityGroup: SecurityGroup;
  readonly apiVPCLinkSecurityGroup: SecurityGroup;
  readonly dynamoVpcEndpoint: VpcEndpoint;
  readonly cidrRange = "172.31.0.0/16";

  constructor(scope: Construct, id: string) {
    super(scope, id);

    configureAWSProvider(this);

    this.vpc = this.createVPC();
    this.dynamoVpcEndpoint = this.createVPCEntpoint(this.vpc);
    this.dynamoSecurityGroup = this.createDynamoSecurityGroup(
      this.vpc.vpc,
      this.dynamoVpcEndpoint
    );
    this.apiVPCLinkSecurityGroup = new SecurityGroup(this, "api-vpc-link-sg", {
      name: "api-vpc-link-sg",
      vpcId: this.vpc.vpc.id,
      tags: {
        Name: "api-vpc-link-sg",
      },
    });
  }

  private createVPC(): VPCWithSubnets {
    const privateSubs: string[] = [];
    const publicSubs: string[] = [];

    const vpc = new Vpc(this, "crimpy-vpc", {
      cidrBlock: this.cidrRange,
      tags: { Name: "crimpy-vpc" },
      enableDnsSupport: true,
      enableDnsHostnames: true,
    });

    const allAvailabilityZones = new DataAwsAvailabilityZones(
      this,
      "data-av-zones",
      {
        filter: [
          {
            name: "opt-in-status",
            values: ["opt-in-not-required"],
          },
        ],
      }
    );

    const internetGateway = new InternetGateway(
      this,
      "crimpy-internet-gateway",
      { vpcId: vpc.id }
    );

    const publicSubnetRouteTable = new RouteTable(
      this,
      "crimpy-public-sub-route-table",
      {
        vpcId: vpc.id,
        tags: { name: "crimpy-prublic-sub-rt" },
        route: [{ cidrBlock: "0.0.0.0/0", gatewayId: internetGateway.id }],
      }
    );

    const privateSubnetRouteTableVithVPC = new RouteTable(
      this,
      "crimpy-private-sub-route-table",
      { vpcId: vpc.id, tags: { name: "crimpy-private-sub-rt" } }
    );

    let cidrIndex = 0;
    const range = this.cidrRange;
    function getNextCIDRIndex() {
      return Fn.cidrsubnet(range, 10, cidrIndex++);
    }

    for (let i = 0; i < 2; i++) {
      const zoneId = Fn.element(allAvailabilityZones.zoneIds, i);
      const publicSubnet = new Subnet(this, `public-sub-${i}`, {
        vpcId: vpc.id,
        availabilityZoneId: zoneId,
        cidrBlock: getNextCIDRIndex(),
        tags: { Name: `public-sub-${i}`, Tier: "Public" },
      });
      new RouteTableAssociation(this, `table-ass-public-${i}`, {
        routeTableId: publicSubnetRouteTable.id,
        subnetId: publicSubnet.id,
      });
      publicSubs.push(publicSubnet.id);

      const privateSubnet = new Subnet(this, `private-sub-${i}`, {
        vpcId: vpc.id,
        availabilityZoneId: zoneId,
        cidrBlock: getNextCIDRIndex(),
        tags: { Name: `isolated-sub-${i}`, Tier: "Isolated" },
      });
      new RouteTableAssociation(this, `table-ass-private-${i}`, {
        routeTableId: privateSubnetRouteTableVithVPC.id,
        subnetId: privateSubnet.id,
      });
      privateSubs.push(privateSubnet.id);
    }

    return {
      vpc: vpc,
      publicSubnetIDs: publicSubs,
      privateSubnetIDs: privateSubs,
    };
  }

  private createDynamoSecurityGroup(vpc: Vpc, endpoint: VpcEndpoint) {
    return new SecurityGroup(this, "dynamo-sg", {
      name: "crimpy-dynamo-sg",
      description: "Allows access to VPC endpoint to DymanoDB",
      tags: {
        name: "crimpy-dynamo-sg",
      },
      vpcId: vpc.id,
      egress: [
        {
          fromPort: 0,
          prefixListIds: [endpoint.prefixListId],
          protocol: "-1",
          toPort: 0,
        },
      ],
    });
  }

  private createVPCEntpoint(vpc: VPCWithSubnets) {
    return new VpcEndpoint(this, "dynamo-endpoint", {
      serviceName: "com.amazonaws.eu-central-1.dynamodb",
      vpcEndpointType: "Interface",
      vpcId: vpc.vpc.id,
      subnetIds: vpc.privateSubnetIDs,
    });
  }
}
