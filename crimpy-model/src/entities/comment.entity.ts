import {
    Attribute,
    Entity,
    INDEX_TYPE,
  } from "@typedorm/common";
import { Base } from "./base.entity";
  
  @Entity({
    name: "comment",
    primaryKey: {
      partitionKey: "COMM#{{id}}",
      sortKey: "TIME#{{createdAt}}",
    },
    indexes: {
      GSI1: {
        partitionKey: "ROUTE#{{routeId}}",
        sortKey: "TIME#{{createdAt}}",
        type: INDEX_TYPE.GSI,
      },
      GSI2: {
        partitionKey: "USER#{{userId}}",
        sortKey: "TIME#{{createdAt}}",
        type: INDEX_TYPE.GSI,
      },
    },
  })
  export class Comment extends Base {
    @Attribute()
    userId: string;

    @Attribute()
    routeId: string;

    @Attribute()
    comment: string;
  }