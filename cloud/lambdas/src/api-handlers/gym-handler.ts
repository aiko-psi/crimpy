import "reflect-metadata";
import {
  APIGatewayProxyCallbackV2,
  APIGatewayProxyEventV2,
  Context,
} from "aws-lambda";
import { getDynamoConnection } from "../dynamo/connection";
import { GymService } from "../services/gym-service";
import { Gym } from "crimpy-model/entities/gym.entity";

const connection = getDynamoConnection();
const entityManger = connection.entityManager;
const gymService = new GymService(entityManger);

export const getAllHandler = async (
  _event: APIGatewayProxyEventV2,
  _context: Context,
  callback: APIGatewayProxyCallbackV2
) => {
  const allGyms = entityManger.find(Gym, undefined);

  callback(undefined, { statusCode: 200, body: JSON.stringify(allGyms) });
};

export const getHandler = async (
  event: APIGatewayProxyEventV2,
  _context: Context,
  callback: APIGatewayProxyCallbackV2
) => {
  const params = event.queryStringParameters;
  const gymId = params ? params.gym : undefined;

  const allGyms = entityManger.findOne(Gym, { id: gymId });

  callback(undefined, { statusCode: 200, body: JSON.stringify(allGyms) });
};

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
