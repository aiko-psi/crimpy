import "reflect-metadata";
import {
  APIGatewayProxyCallbackV2,
  APIGatewayProxyEventV2,
  Context,
} from "aws-lambda";
import { getDynamoConnection } from "../dynamo/connection";
import { GymService } from "../services/gym-service";

const connection = getDynamoConnection();
const entityManger = connection.entityManager;
const gymService = new GymService(entityManger);

export const postHandler = async (
  event: APIGatewayProxyEventV2,
  _context: Context,
  callback: APIGatewayProxyCallbackV2
) => {
  const gym = gymService.parseGym(event.body);

  // create item
  const resp = await gymService.createGym(gym);

  const response = {
    statusCode: 200,
    body: JSON.stringify(resp),
  };
  callback(null, response);
};
