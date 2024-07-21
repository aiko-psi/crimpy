import { Attribute, Entity, INDEX_TYPE } from "@typedorm/common";
import { Base } from "./base.entity";

@Entity({
  name: "wall",
  primaryKey: {
    partitionKey: "WALL#{{id}}",
    sortKey: "WALL#{{name}}",
  },
  indexes: {
    GSI1: {
      partitionKey: "GYM#{{gymId}}",
      sortKey: "WALL#{{id}}",
      type: INDEX_TYPE.GSI,
    },
    // Need two indexes for every entity
    GSI2: {
      partitionKey: "GYM#{{gymId}}",
      sortKey: "WALL#{{id}}",
      type: INDEX_TYPE.GSI,
    }
  },
})
export class Wall extends Base {
  @Attribute()
  name: string;

  @Attribute()
  gymId: string;

  @Attribute()
  topLoggerId: number | null;

  @Attribute()
  desctiption: string | null;
}
