import { App } from "cdktf";
import { IAMStack } from "./stacks/iam-stack";
import { DynamoStack } from "./stacks/dynamo-stack";
import { APIStack } from "./stacks/api-stack";
import { AuthStack } from "./stacks/auth-stack";

const app = new App();
const dynamoStack = new DynamoStack(app, "crimpy-dynamo");
const iamStack = new IAMStack(app, "crimpy-iam", {
  dynmoDBTable: dynamoStack.dynamoDB,
});
const authStack = new AuthStack(app, "crimpy-auth");
new APIStack(app, "crimpy-api", {
  lamdaDynamoExecutionRole: iamStack.lambdaExecutionRoleWithDynamo,
  apiRoleAccessLambda: iamStack.apiRoleAccessLambda,
  userPool: authStack.userPool,
  clientId: authStack.clientId,
});

app.synth();
