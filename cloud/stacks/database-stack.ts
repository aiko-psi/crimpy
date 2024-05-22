import { Construct } from "constructs";
import { TerraformStack, TerraformOutput } from "cdktf";
import { configureAWSProvider } from "../common/configure-aws-provider";
import { SecretsmanagerSecret } from "@cdktf/provider-aws/lib/secretsmanager-secret";
import { SecretsmanagerSecretVersion } from "@cdktf/provider-aws/lib/secretsmanager-secret-version";
import { Password } from "@cdktf/provider-random/lib/password";
import { RdsCluster } from "@cdktf/provider-aws/lib/rds-cluster";
import { RdsClusterInstance } from "@cdktf/provider-aws/lib/rds-cluster-instance";
import { RandomProvider } from "@cdktf/provider-random/lib/provider";
import { Vpc } from "@cdktf/provider-aws/lib/vpc";
import { SecurityGroup } from "@cdktf/provider-aws/lib/security-group";
import { DbSubnetGroup } from "@cdktf/provider-aws/lib/db-subnet-group";
import { DataAwsSubnets } from "@cdktf/provider-aws/lib/data-aws-subnets";

type Props = {
  vpc: Vpc;
};

export class DatabaseStack extends TerraformStack {
  readonly databaseName = "crimpy";
  readonly databaseClusterARN: string;
  readonly rootUserSecret: SecretsmanagerSecret;
  readonly clusterUrl: string;
  readonly clusterWriterEndpoint: string;
  readonly clusterReaderEndpoint: string;

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id);

    configureAWSProvider(this);
    new RandomProvider(this, "random");

    const username = "crimpyadmin";

    this.rootUserSecret = new SecretsmanagerSecret(
      this,
      "crimpy-database-secret",
      {
        name: "crimpy-database-secret",
        description: "Root secret for the crimpy database.",
      }
    );

    const password = new Password(this, "db-password", {
      length: 48,
      special: false,
    });

    new SecretsmanagerSecretVersion(this, "database-secret-version-id", {
      secretId: this.rootUserSecret.id,
      secretString: JSON.stringify({
        username: username,
        password: password.result,
      }),
    });

    const securityGroup = new SecurityGroup(this, "crimpy-db-sec-group", {
      vpcId: props.vpc.id,
      name: "crimpy-db-sec-group",
    });

    const dataSubnets = new DataAwsSubnets(this, "data-subnets", {
      filter: [{ name: "vpc-id", values: [props.vpc.id] }],
      tags: { Tier: "Isolated" },
    });

    const subnetGroup = new DbSubnetGroup(this, "crimpy-subnet-group", {
      name: "crimpy-subnet-group",
      subnetIds: dataSubnets.ids,
    });

    const cluster = new RdsCluster(this, "crimpy-database-cluster", {
      clusterIdentifier: "crimpy-database-cluster",
      databaseName: this.databaseName,
      engine: "aurora-postgresql",
      engineMode: "provisioned",
      engineVersion: "15.4",
      masterPassword: password.result,
      masterUsername: username,
      serverlessv2ScalingConfiguration: {
        maxCapacity: 1,
        minCapacity: 0.5,
      },
      storageEncrypted: true,
      vpcSecurityGroupIds: [securityGroup.id],
      dbSubnetGroupName: subnetGroup.name,
      enableHttpEndpoint: true,
    });

    this.databaseClusterARN = cluster.arn;

    const awsRdsClusterInstance = new RdsClusterInstance(
      this,
      "crimpy-database-cluster-instance",
      {
        clusterIdentifier: cluster.id,
        engine: cluster.engine,
        engineVersion: cluster.engineVersion,
        instanceClass: "db.serverless",
      }
    );
    /*This allows the Terraform resource name to match the original name. You can remove the call if you don't need them to match.*/
    awsRdsClusterInstance.overrideLogicalId("crimpy-database-cluster");

    this.clusterUrl = awsRdsClusterInstance.endpoint;
    this.clusterWriterEndpoint = cluster.endpoint;
    this.clusterReaderEndpoint = cluster.readerEndpoint;

    new TerraformOutput(this, "cluster-arn", {
      value: cluster.arn,
    });
  }
}
