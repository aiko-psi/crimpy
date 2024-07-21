import { Attribute, Entity, INDEX_TYPE } from "@typedorm/common";
import { Base } from "./base.entity";

@Entity({
  name: "user",
  primaryKey: {
    partitionKey: "USER#{{id}}",
    sortKey: "USER#{{name}}",
  },
  indexes: {
    GSI1: {
      partitionKey: "USER#{{id}}",
      sortKey: "USER#{{name}}",
      type: INDEX_TYPE.GSI,
    },
    // Need two indexes for every entity
    GSI2: {
      partitionKey: "USER#{{id}}",
      sortKey: "USER#{{name}}",
      type: INDEX_TYPE.GSI,
    },
  },
})
export class User extends Base {
  @Attribute()
  name: string;

  @Attribute()
  topLoggerId: number | null;
}
