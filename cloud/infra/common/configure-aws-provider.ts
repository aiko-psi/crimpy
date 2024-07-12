import { AwsProvider } from "@cdktf/provider-aws/lib/provider";
import { S3Backend } from "cdktf";
import { Construct } from "constructs";

export function configureAWSProvider(scope: Construct, id: string) {
  new AwsProvider(scope, "aws", {
    sharedConfigFiles: ["~/.aws/config"],
    sharedCredentialsFiles: ["~/.aws/credentials"],
  });

  new S3Backend(scope, {
    bucket: "crimpy-cdktf-state",
    dynamodbTable: "crimpy-cdktf-state",
    key: `${id}.state`,
    region: "eu-central-1",
  });
}
