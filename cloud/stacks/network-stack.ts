import { Fn, TerraformStack } from "cdktf";
import { Construct } from "constructs";
import { configureAWSProvider } from "../common/configure-aws-provider";
import { Vpc } from "@cdktf/provider-aws/lib/vpc";
import { DataAwsAvailabilityZones } from "@cdktf/provider-aws/lib/data-aws-availability-zones";
import { Subnet } from "@cdktf/provider-aws/lib/subnet";
import { RouteTable } from "@cdktf/provider-aws/lib/route-table";
import { InternetGateway } from "@cdktf/provider-aws/lib/internet-gateway";
import { RouteTableAssociation } from "@cdktf/provider-aws/lib/route-table-association";

export class NetworkStack extends TerraformStack {
  readonly vpc;
  readonly cidrRange = "172.31.0.0/16";

  constructor(scope: Construct, id: string) {
    super(scope, id);

    configureAWSProvider(this);

    this.vpc = new Vpc(this, "crimpy-vpc", {
      cidrBlock: this.cidrRange,
      tags: { Name: "crimpy-vpc" },
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
      { vpcId: this.vpc.id }
    );

    const publicSubnetRouteTable = new RouteTable(
      this,
      "crimpy-public-sub-route-table",
      {
        vpcId: this.vpc.id,
        route: [{ cidrBlock: "0.0.0.0/0", gatewayId: internetGateway.id }],
      }
    );

    let cidrIndex = 0;
    const range = this.cidrRange;
    function getNextCIDRIndex() {
      return Fn.cidrsubnet(range, 10, cidrIndex++);
    }

    for (let i = 0; i < 2; i++) {
      const zoneId = Fn.element(allAvailabilityZones.zoneIds, i);
      const publicSubnet = new Subnet(this, `public-sub-${i}`, {
        vpcId: this.vpc.id,
        availabilityZoneId: zoneId,
        cidrBlock: getNextCIDRIndex(),
        tags: { Name: `public-sub-${i}`, Tier: 'Public' },
      });
      new RouteTableAssociation(this, `table-ass-${i}`, {
        routeTableId: publicSubnetRouteTable.id,
        subnetId: publicSubnet.id,
      });

      new Subnet(this, `isolated-sub-${i}`, {
        vpcId: this.vpc.id,
        availabilityZoneId: zoneId,
        cidrBlock: getNextCIDRIndex(),
        tags: { Name: `isolated-sub-${i}`, Tier: 'Isolated'},
      });
    }


  }
}
