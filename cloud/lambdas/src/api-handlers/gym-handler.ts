import "reflect-metadata";
import { Callback, Context } from "aws-lambda";
import { getDynamoConnection } from "../dynamo/connection";
import { Gym } from "../entities/gym.entity";

export const handler = async (
  _event: any,
  _context: Context,
  callback: Callback
) => {
  console.log("starting lambda");

  const connection = getDynamoConnection();
  const entityManger = connection.entityManager;

  const gym = new Gym();
  gym.name = "Crimpy Climbing";
  gym.shortName = "Crimpy";
  gym.location = "London";
  gym.toploggerId = "123";
  gym.topoId = "456";

  console.log("Connection created " + JSON.stringify(connection.table));

  // create item
  const resp = await entityManger.create<Gym>(gym);

  console.log("resp from saving " + JSON.stringify(resp));

  // get item
  const retrievedItem = await entityManger.findOne(Gym, {
    id: resp.id,
    shortName: resp.shortName,
  });

  console.log("retrieved item " + JSON.stringify(retrievedItem));

  const response = {
    statusCode: 200,
    body: JSON.stringify(
      "Hello from Lambda! The resp from saving is " +
        JSON.stringify(resp) +
        " and the retrieved item is " +
        JSON.stringify(retrievedItem)
    ),
  };
  callback(null, response);
};
