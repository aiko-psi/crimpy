import { App } from "cdktf";
import { DatabaseStack } from "./stacks/database-stack";
import { NetworkStack } from "./stacks/network-stack";
import { IAMStack } from "./stacks/iam-stack";

const app = new App();
const networkStack = new NetworkStack(app, "crimpy-network");
const database = new DatabaseStack(app, "crimpy-database", {
  vpc: networkStack.vpc,
});
new IAMStack(app, "crimpy-iam", {
  rdsARN: database.databaseClusterARN,
  databaseSecretARN: database.rootUserSecret.arn,
});

app.synth();
