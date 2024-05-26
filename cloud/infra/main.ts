import { App } from "cdktf";
import { IAMStack } from "./stacks/iam-stack";
import { DynamoStack } from "./stacks/dynamo-stack";
import { APIStack } from "./stacks/api-stack";

const app = new App();
const dynamoStack = new DynamoStack(app, "crimpy-dynamo");
const iamStack = new IAMStack(app, "crimpy-iam", {
  dynmoDBTable: dynamoStack.dynamoDB,
});
new APIStack(app, "crimpy-api", {
  lamdaDynamoExecutionRole: iamStack.lambdaExecutionRoleWithDynamo,
  apiRoleAccessLambda: iamStack.apiRoleAccessLambda,
});

app.synth();
