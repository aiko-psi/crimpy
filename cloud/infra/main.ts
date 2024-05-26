import { App } from "cdktf";
import { NetworkStack } from "./stacks/network-stack";
import { IAMStack } from "./stacks/iam-stack";
import { DynamoStack } from "./stacks/dynamo-stack";
import { APIStack } from "./stacks/api-stack";

const app = new App();
const networkStack = new NetworkStack(app, "crimpy-network");
const dynamoStack = new DynamoStack(app, "crimpy-dynamo");
const iamStack = new IAMStack(app, "crimpy-iam", {
  dynmoDBTable: dynamoStack.dynamoDB,
});
new APIStack(app, "crimpy-api", {
  privateSubnetIds: networkStack.vpc.privateSubnetIDs,
  dynamoSecurityGroup: networkStack.dynamoSecurityGroup,
  apiVPCLinkSecurityGroup: networkStack.apiVPCLinkSecurityGroup,
  lamdaDynamoExecutionRole: iamStack.lambdaExecutionRoleWithDynamo,
  apiRoleAccessLambda: iamStack.apiRoleAccessLambda,
});

app.synth();
