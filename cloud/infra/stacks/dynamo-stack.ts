import { TerraformStack } from "cdktf";
import { Construct } from "constructs";
import { configureAWSProvider } from "../common/configure-aws-provider";
import { DynamodbTable } from "@cdktf/provider-aws/lib/dynamodb-table";

export class DynamoStack extends TerraformStack {
  readonly dynamoDB: DynamodbTable;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    configureAWSProvider(this, id);

    this.dynamoDB = new DynamodbTable(this, "crimpy-dynamo", {
      name: "crimpy-dynamo",
      billingMode: "PAY_PER_REQUEST",
      tags: {
        Name: "crimpy-dynamo-table",
      },
      hashKey: "PK",
      rangeKey: "SK",
      attribute: [
        {
          name: "PK",
          type: "S",
        },
        {
          name: "SK",
          type: "S",
        },
        {
          name: "GSI1PK",
          type: "S",
        },
        {
          name: "GSI1SK",
          type: "S",
        },
      ],
      globalSecondaryIndex: [
        {
          hashKey: "GSI1PK",
          name: "GSI1",
          projectionType: "ALL",
          rangeKey: "GSI1SK",
        },
      ],
    });
  }
}
