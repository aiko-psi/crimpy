import "reflect-metadata";
import { Callback, Context } from "aws-lambda";

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});

const dynamo = DynamoDBDocumentClient.from(client);

const tableName = "crimpy-dynamo";

export const handler = async (
  _event: any,
  _context: Context,
  callback: Callback
) => {
  const resp = await dynamo.send(new ScanCommand({ TableName: tableName }));

  // console.log("starting lambda");

  // const connection = getDynamoConnection();
  // connection.connect();

  // const gym = new Gym();
  // gym.name = "Crimpy Climbing";
  // gym.shortName = "Crimpy";
  // gym.location = "London";
  // gym.toploggerId = "123";
  // gym.topoId = "456";

  // const entityManger = connection.entityManager;
  // console.log("Connection created " + JSON.stringify(connection));

  // // create item
  // const resp = await entityManger.create<Gym>(gym);

  // console.log("resp from saving " + JSON.stringify(resp));

  // // get item
  // const retrievedItem = await entityManger.findOne(Gym, {
  //   id: resp.id,
  // });

  // console.log("retrieved item " + JSON.stringify(retrievedItem));

  const response = {
    statusCode: 200,
    body: JSON.stringify(
      "Hello from Lambda! The resp from saving is " + JSON.stringify(resp)
      // JSON.stringify(resp) +
      // " and the retrieved item is " +
      // JSON.stringify(retrievedItem)
    ),
  };
  callback(null, response);
};
