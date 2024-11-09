import { Request, Response } from "express";

import {
  APIGatewayProxyEventV2,
  APIGatewayProxyCallbackV2,
  APIGatewayProxyResultV2,
  Context,
  APIGatewayProxyEventHeaders,
  APIGatewayEventRequestContextV2,
} from "aws-lambda";

export function mapRequest(req: Request): APIGatewayProxyEventV2 {
  return {
    body: req.body,
    isBase64Encoded: false,
    version: "2.0",
    routeKey: "no",
    rawPath: "no raw path",
    rawQueryString: "no",
    headers: {} as unknown as APIGatewayProxyEventHeaders,
    requestContext: {} as unknown as APIGatewayEventRequestContextV2,
  };
}

export function mapResponse(res: Response): APIGatewayProxyCallbackV2 {
  return (
    error?: string | Error | null,
    result?: APIGatewayProxyResultV2<any>
  ) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(result?.body);
    }
  };
}

export function createContext(_req: Request): Context {
  return {} as Context;
}
