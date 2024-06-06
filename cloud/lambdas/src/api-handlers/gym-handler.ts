import "reflect-metadata";
import {
  APIGatewayProxyCallbackV2,
  APIGatewayProxyEventV2,
  Context,
} from "aws-lambda";
import { getDynamoConnection } from "../dynamo/connection";
import { Gym } from "../entities/gym.entity";

const connection = getDynamoConnection();
const entityManger = connection.entityManager;

export const postHandler = async (
  event: APIGatewayProxyEventV2,
  _context: Context,
  callback: APIGatewayProxyCallbackV2
) => {
  const gym = new Gym();

  try {
    const body = JSON.parse(event.body || "");
    gym.name = body.name;
    gym.shortName = body.shortName;
    gym.location = body.location;
    gym.toploggerId = body.topLoggerId;
    gym.topoId = body.topoId;
  } catch (e) {
    callback(undefined, {
      statusCode: 400,
      body: "Parsing failed with error: " + e,
    });
  }

  // create item
  const resp = await entityManger.create<Gym>(gym);

  const response = {
    statusCode: 200,
    body: JSON.stringify(resp),
  };
  callback(null, response);
};
