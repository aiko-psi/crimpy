import { TerraformStack } from "cdktf";
import { Construct } from "constructs";
import { configureAWSProvider } from "../common/configure-aws-provider";
import { CognitoUserPool } from "@cdktf/provider-aws/lib/cognito-user-pool";
import { CognitoIdentityProvider } from "@cdktf/provider-aws/lib/cognito-identity-provider";
import { DataAwsSecretsmanagerSecretVersion } from "@cdktf/provider-aws/lib/data-aws-secretsmanager-secret-version";
import { CognitoUserPoolDomain } from "@cdktf/provider-aws/lib/cognito-user-pool-domain";
import { CognitoUserPoolClient } from "@cdktf/provider-aws/lib/cognito-user-pool-client";

export class AuthStack extends TerraformStack {
  readonly userPool: CognitoUserPool;
  readonly clientId: string;

  constructor(scope: Construct, id: string) {
    super(scope, id);
    configureAWSProvider(this);

    const googleClientSecret = new DataAwsSecretsmanagerSecretVersion(
      this,
      "secret-version",
      {
        secretId:
          "arn:aws:secretsmanager:eu-central-1:905418121177:secret:crimpy-app-google-client-secret-OeBBta",
      }
    );

    this.userPool = new CognitoUserPool(this, "crimpy-user-pool", {
      autoVerifiedAttributes: ["email"],
      name: "crimpy-pool",
    });

    new CognitoIdentityProvider(this, "crimpy-provider", {
      attributeMapping: {
        email: "email",
        username: "sub",
      },
      providerDetails: {
        authorize_scopes: "email",
        client_id:
          "226972165684-c0vt3t59cb8ib02obcl6pjunkh5paqr6.apps.googleusercontent.com",
        client_secret: googleClientSecret.secretString,
      },
      providerName: "Google",
      providerType: "Google",
      userPoolId: this.userPool.id,
    });

    new CognitoUserPoolDomain(this, "crimpy-login-domain", {
      domain: "crimpy-login",
      userPoolId: this.userPool.id,
    });

    const client = new CognitoUserPoolClient(this, "crimpy-client", {
      name: "crimpy-app",
      userPoolId: this.userPool.id,
      callbackUrls: ["http://localhost:8080"],
      supportedIdentityProviders: ["COGNITO", "Google"],
      allowedOauthScopes: ["email", "openid"],
      allowedOauthFlows: ["code", "implicit"],
      allowedOauthFlowsUserPoolClient: true,
      explicitAuthFlows: ["USER_PASSWORD_AUTH"],
    });

    this.clientId = client.id;
  }
}
