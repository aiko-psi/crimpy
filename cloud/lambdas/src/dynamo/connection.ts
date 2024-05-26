import { createConnection, getConnection } from "@typedorm/core";
import { DocumentClientV2 } from "@typedorm/document-client";

import { globalTable } from "./table";
import AWS = require("aws-sdk");
import { Gym } from "../entities/gym.entity";

export function getDynamoConnection() {
  const documentClient = new DocumentClientV2(
    new AWS.DynamoDB.DocumentClient()
  );

  try {
    return getConnection();
  } catch (e) {
    return createConnection({
      table: globalTable,
      entities: [Gym],
      documentClient,
    });
  }
}
