import { Apigatewayv2Api } from "@cdktf/provider-aws/lib/apigatewayv2-api";
import { Apigatewayv2Integration } from "@cdktf/provider-aws/lib/apigatewayv2-integration";
import { Apigatewayv2Route } from "@cdktf/provider-aws/lib/apigatewayv2-route";
import { LambdaFunction } from "@cdktf/provider-aws/lib/lambda-function";
import { DataArchiveFile } from "@cdktf/provider-archive/lib/data-archive-file";
import { LambdaLayerVersion } from "@cdktf/provider-aws/lib/lambda-layer-version";
import { AssetType, TerraformAsset, TerraformStack, Token } from "cdktf";
import { Construct } from "constructs";
import { configureAWSProvider } from "../common/configure-aws-provider";
import { IamRole } from "@cdktf/provider-aws/lib/iam-role";
import { ArchiveProvider } from "@cdktf/provider-archive/lib/provider";
import { Apigatewayv2Stage } from "@cdktf/provider-aws/lib/apigatewayv2-stage";
import { CloudwatchLogGroup } from "@cdktf/provider-aws/lib/cloudwatch-log-group";
import { Apigatewayv2Authorizer } from "@cdktf/provider-aws/lib/apigatewayv2-authorizer";
import { CognitoUserPool } from "@cdktf/provider-aws/lib/cognito-user-pool";

type Props = {
  lamdaDynamoExecutionRole: IamRole;
  apiRoleAccessLambda: IamRole;
  userPool: CognitoUserPool;
  clientId: string;
};

export class APIStack extends TerraformStack {
  readonly api: Apigatewayv2Api;
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id);

    configureAWSProvider(this, id);
    new ArchiveProvider(this, "archive-provider");

    const logGroup = new CloudwatchLogGroup(this, "crimpy-api-lg", {
      name: "crimpy-api",
      retentionInDays: 7,
    });

    this.api = new Apigatewayv2Api(this, "crimpy-api", {
      name: "crimpy-api",
      protocolType: "HTTP",
    });

    const authorizer = new Apigatewayv2Authorizer(this, "crimpy-authorizer", {
      apiId: this.api.id,
      name: "crimpy-authorizer",
      authorizerType: "JWT",
      identitySources: ["$request.header.Authorization"],
      jwtConfiguration: {
        audience: [Token.asString(props.clientId)],
        issuer: "https://" + Token.asString(props.userPool.endpoint),
      },
    });

    new Apigatewayv2Stage(this, "crimpy-api-stage-v1", {
      apiId: this.api.id,
      name: "v1",
      autoDeploy: true,
      accessLogSettings: {
        destinationArn: logGroup.arn,
        format: JSON.stringify({
          requestId: "$context.requestId",
          ip: "$context.identity.sourceIp",
          requestTime: "$context.requestTime",
          httpMethod: "$context.httpMethod",
          routeKey: "$context.routeKey",
          status: "$context.status",
          protocol: "$context.protocol",
          responseLength: "$context.responseLength",
          extendedRequestId: "$context.extendedRequestId",
          errorMessage: "$context.error.message",
          integrationError: "$context.integrationErrorMessage",
        }),
      },
    });

    const lamdaLayerArchive = new DataArchiveFile(
      this,
      "lambda-layer-archive",
      {
        type: "zip",
        sourceDir: "../../../../lambdas/lambda-layer/dependency-layer",
        outputPath: "../../../../lambda-layer/dependency-layer.zip",
      }
    );

    const lambdaLayer = new LambdaLayerVersion(this, "lambda-layer", {
      layerName: "crimpy-dependency-layer",
      filename: lamdaLayerArchive.outputPath,
      compatibleRuntimes: ["nodejs20.x"],
    });

    const codeAssets = new TerraformAsset(this, "code-asset", {
      path: "../lambdas/dist",
      type: AssetType.ARCHIVE,
    });

    const addGymLambda = this.createAPILambda(
      "gym-lambda",
      "api-handlers/gym-handler.postHandler",
      codeAssets,
      lambdaLayer,
      props.lamdaDynamoExecutionRole
    );

    const newGymIntegration = new Apigatewayv2Integration(
      this,
      "add-gym-integration",
      {
        apiId: Token.asString(this.api.id),
        connectionType: "INTERNET",
        description: "Lambda add Gym",
        integrationMethod: "POST",
        integrationType: "AWS_PROXY",
        integrationUri: addGymLambda.invokeArn,
        passthroughBehavior: "WHEN_NO_MATCH",
        credentialsArn: props.apiRoleAccessLambda.arn,
      }
    );

    new Apigatewayv2Route(this, "add-gym-route", {
      apiId: this.api.id,
      routeKey: "POST /gym",
      target: "integrations/${" + newGymIntegration.id + "}",
      authorizationType: "JWT",
      authorizerId: authorizer.id,
    });
  }

  private createAPILambda(
    name: string,
    handler: string,
    codeAssets: TerraformAsset,
    lambdaLayer: LambdaLayerVersion,
    lamdaDynamoExecutionRole: IamRole
  ) {
    return new LambdaFunction(this, name, {
      functionName: name,
      handler: handler,
      runtime: "nodejs20.x",
      timeout: 30,
      role: lamdaDynamoExecutionRole.arn,
      filename: codeAssets.path,
      layers: [lambdaLayer.arn],
    });
  }
}
