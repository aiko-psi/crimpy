import { createConnection, getConnection } from "@typedorm/core";
import { DocumentClientV2 } from "@typedorm/document-client";

import { globalTable } from "./table";
import AWS = require("aws-sdk");
import { Gym } from "../entities/gym.entity";
import { User } from "../entities/user.entity";
import { Wall } from "../entities/wall.entity";
import { Session } from "inspector";
import { IndoorRoute } from "../entities/indoor-route.entity";
import { Gradesystem } from "../entities/gradesystem.entity";
import { Effort } from "../entities/effort.entity";
import { Comment } from "../entities/comment.entity";

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
