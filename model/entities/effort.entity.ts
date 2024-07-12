import {
  Attribute,
  Entity,
  INDEX_TYPE,
} from "@typedorm/common";
import { Base } from "./base.entity";

@Entity({
  name: "effort",
  primaryKey: {
    partitionKey: "ROUTE#{{routeId}}",
    sortKey: "TIME#{{createdAt}}",
  },
  indexes: {
    GSI1: {
      partitionKey: "USER#{{userId}}",
      sortKey: "TIME#{{createdAt}}",
      type: INDEX_TYPE.GSI,
    },
  },
})
export class Effort extends Base {
  @Attribute()
  routeId: string;

  @Attribute()
  userId: string;

  @Attribute()
  sessionId: string;

  @Attribute()
  toploggerId: string | null;

  @Attribute()
  status: string;

  @Attribute()
  tries: number | null;
}
