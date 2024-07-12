import { Fn, TerraformStack, Token } from "cdktf";
import { Construct } from "constructs";
import { configureAWSProvider } from "../common/configure-aws-provider";
import { IamRole } from "@cdktf/provider-aws/lib/iam-role";
import { IamPolicy } from "@cdktf/provider-aws/lib/iam-policy";
import { DynamodbTable } from "@cdktf/provider-aws/lib/dynamodb-table";

type Props = {
  dynmoDBTable: DynamodbTable;
};

export class IAMStack extends TerraformStack {
  readonly lambdaExecutionRoleWithDynamo: IamRole;
  readonly apiRoleAccessLambda: IamRole;

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id);

    configureAWSProvider(this, id);

    this.lambdaExecutionRoleWithDynamo =
      this.createLamdaExecutionRoleWithDynamo(props.dynmoDBTable);
    this.apiRoleAccessLambda = this.createAPIRoleForLambda();
  }

  private createLamdaExecutionRoleWithDynamo(dynamoDBTable: DynamodbTable) {
    const dynamoAccessPolicy = new IamPolicy(this, "dynamo-access", {
      name: "CrimpyDynmoAccess",
      policy: Token.asString(
        Fn.jsonencode({
          Statement: [
            {
              Sid: "ListAndDescribe",
              Effect: "Allow",
              Action: [
                "dynamodb:List*",
                "dynamodb:DescribeReservedCapacity*",
                "dynamodb:DescribeLimits",
                "dynamodb:DescribeTimeToLive",
              ],
              Resource: "*",
            },
            {
              Sid: "SpecificTable",
              Effect: "Allow",
              Action: [
                "dynamodb:BatchGet*",
                "dynamodb:DescribeStream",
                "dynamodb:DescribeTable",
                "dynamodb:Get*",
                "dynamodb:Query",
                "dynamodb:Scan",
                "dynamodb:BatchWrite*",
                "dynamodb:CreateTable",
                "dynamodb:Delete*",
                "dynamodb:Update*",
                "dynamodb:PutItem",
              ],
              Resource: dynamoDBTable.arn,
            },
          ],
          Version: "2012-10-17",
        })
      ),
    });

    const basicExecutionRole = new IamPolicy(
      this,
      "lambda-basic-execution-policy",
      {
        name: "CrimpyExecution",
        policy: Token.asString(
          Fn.jsonencode({
            Statement: [
              {
                Sid: "ListAndDescribe",
                Effect: "Allow",
                Action: [
                  "logs:CreateLogGroup",
                  "logs:CreateLogStream",
                  "logs:PutLogEvents",
                ],
                Resource: "*",
              },
            ],
            Version: "2012-10-17",
          })
        ),
      }
    );

    const networkConnect = new IamPolicy(this, "lambda-endpoint-connect", {
      name: "CrimpyEndpointConnect",
      policy: Token.asString(
        Fn.jsonencode({
          Statement: [
            {
              Effect: "Allow",
              Action: [
                "ec2:DescribeNetworkInterfaces",
                "ec2:DescribeAvailabilityZones",
                "ec2:CreateNetworkInterface",
                "ec2:DeleteNetworkInterface",
                "ec2:ModifyNetworkInterfaceAttribute",
                "ec2:CreateTags",
              ],
              Resource: "*",
            },
          ],
          Version: "2012-10-17",
        })
      ),
    });

    return new IamRole(this, "lambda-iam-role-dynamo", {
      name: "LambdaExecutionRoleDynamo",
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
      managedPolicyArns: [
        dynamoAccessPolicy.arn,
        basicExecutionRole.arn,
        networkConnect.arn,
      ],
    });
  }

  private createAPIRoleForLambda() {
    return new IamRole(this, "api-role", {
      name: "APIRoleCrimpy",
      assumeRolePolicy: Token.asString(
        Fn.jsonencode({
          Statement: [
            {
              Sid: "ApiAllow",
              Effect: "Allow",
              Action: ["sts:AssumeRole"],
              Principal: {
                Service: "apigateway.amazonaws.com",
              },
            },
          ],
          Version: "2012-10-17",
        })
      ),
      managedPolicyArns: ["arn:aws:iam::aws:policy/service-role/AWSLambdaRole"],
    });
  }
}
