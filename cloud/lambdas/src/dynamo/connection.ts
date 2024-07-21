import { createConnection, getConnection } from "@typedorm/core";
import { DocumentClientV2 } from "@typedorm/document-client";

import { globalTable } from "./table";
import AWS = require("aws-sdk");
import { Gym } from "crimpy-model/entities/gym.entity";
import { Wall } from "crimpy-model/entities/wall.entity";
import { User } from "crimpy-model/entities/user.entity";
import { Session } from "crimpy-model/entities/session.entity";
import { IndoorRoute } from "crimpy-model/entities/indoor-route.entity";
import { Gradesystem } from "crimpy-model/entities/gradesystem.entity";
import { Effort } from "crimpy-model/entities/effort.entity";
import { Comment } from "crimpy-model/entities/comment.entity";


export function getDynamoConnection() {
  const documentClient = new DocumentClientV2(
    new AWS.DynamoDB.DocumentClient()
  );

  try {
    return getConnection();
  } catch (e) {
    return createConnection({
      table: globalTable,
      entities: [Gym, Wall, User, Session, IndoorRoute, Gradesystem, Effort, Comment],
      documentClient,
    });
  }
}
