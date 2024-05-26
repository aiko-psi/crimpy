import { AwsProvider } from "@cdktf/provider-aws/lib/provider";
import { Construct } from "constructs";

export function configureAWSProvider(scope: Construct) {
  new AwsProvider(scope, "aws", {
    sharedConfigFiles: ["~/.aws/config"],
    sharedCredentialsFiles: ["~/.aws/credentials"],
  });
}
