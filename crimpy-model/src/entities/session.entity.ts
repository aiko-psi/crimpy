import { Attribute, Entity, INDEX_TYPE } from "@typedorm/common";
import { Base } from "./base.entity";

@Entity({
  name: "session",
  primaryKey: {
    partitionKey: "SESS#{{id}}",
    sortKey: "SESS#{{id}}",
  },
  indexes: {
    GSI1: {
      partitionKey: "USER{{id}}",
      sortKey: "SESS#{{id}}",
      type: INDEX_TYPE.GSI,
    },
    // Need two indexes for every entity
    GSI2: {
      partitionKey: "USER{{id}}",
      sortKey: "SESS#{{id}}",
      type: INDEX_TYPE.GSI,
    },
  },
})
export class Session extends Base {
  @Attribute()
  userId: string;

  @Attribute()
  startDate: Date;

  @Attribute()
  endDate: Date | null;
}
