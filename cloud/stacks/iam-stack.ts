import { Fn, TerraformStack, Token } from "cdktf";
import { Construct } from "constructs";
import { configureAWSProvider } from "../common/configure-aws-provider";
import { IamRole } from "@cdktf/provider-aws/lib/iam-role";
import { IamPolicy } from "@cdktf/provider-aws/lib/iam-policy";

type Props = {
  rdsARN: string;
  databaseSecretARN: string;
};

export class IAMStack extends TerraformStack {
  readonly lambdaExecutionRoleWithRDS;

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id);

    configureAWSProvider(this);

    const databaseSecretPolicy = new IamPolicy(this, "database-secret-access", {
      name: "CrimpyDatabaseSecretAccess",
      policy: Token.asString(
        Fn.jsonencode({
          Statement: [
            {
              Sid: "DatabaseSecretAccess",
              Effect: "Allow",
              Action: [
                "secretsmanager:ListSecrets",
                "secretsmanager:GetSecretValue",
                "tag:GetResources",
              ],
              Resource: props.databaseSecretARN,
            },
          ],
          Version: "2012-10-17",
        })
      ),
    });

    const databaseAccessPolicy = new IamPolicy(this, "database-access", {
      name: "CrimpyDatabaseAccess",
      policy: Token.asString(
        Fn.jsonencode({
          Statement: [
            {
              Sid: "RDSDataAccess",
              Effect: "Allow",
              Action: [
                "rds-data:ExecuteSql",
                "rds-data:ExecuteStatement",
                "rds-data:BatchExecuteStatement",
                "rds-data:BeginTransaction",
                "rds-data:CommitTransaction",
                "rds-data:RollbackTransaction",
                "tag:GetResources",
              ],
              Resource: props.rdsARN,
            },
          ],
          Version: "2012-10-17",
        })
      ),
    });

    this.lambdaExecutionRoleWithRDS = new IamRole(this, "lambda-iam-role-rds", {
      name: "LambdaExecutionRoleRDS",
      assumeRolePolicy: Token.asString(
        Fn.jsonencode({
          Statement: [
            {
              Sid: "LambdaAllow",
              Effect: "Allow",
              Action: ["sts:AssumeRole"],
              Principal: {
                Service: "lambda.amazonaws.com",
              },
            },
          ],
          Version: "2012-10-17",
        })
      ),
      managedPolicyArns: [databaseSecretPolicy.arn, databaseAccessPolicy.arn],
    });
  }
}
