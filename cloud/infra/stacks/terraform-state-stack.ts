import { TerraformStack } from "cdktf";
import { Construct } from "constructs";
import { configureAWSProvider } from "../common/configure-aws-provider";
import { ArchiveProvider } from "@cdktf/provider-archive/lib/provider";
import { S3Bucket } from "@cdktf/provider-aws/lib/s3-bucket";
import { DynamodbTable } from "@cdktf/provider-aws/lib/dynamodb-table";

/**
 * This is only used to create the initial components for the remote backend
 */
export class TerraformStateStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    configureAWSProvider(this, id);
    new ArchiveProvider(this, "archive-provider");

    new S3Bucket(this, "crimpy-state-bucket", {
      bucket: "crimpy-cdktf-state",
    });

    new DynamodbTable(this, "crimpy-state-table", {
      name: "crimpy-cdktf-state",
      hashKey: "LockID",
      attribute: [
        {
          name: "LockID",
          type: "S",
        },
      ],
      billingMode: "PAY_PER_REQUEST",
    });
  }
}
