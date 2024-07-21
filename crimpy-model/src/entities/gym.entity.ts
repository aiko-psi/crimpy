import { Attribute, Entity, INDEX_TYPE } from "@typedorm/common";
import { Base } from "./base.entity";

@Entity({
  name: "gym",
  primaryKey: {
    partitionKey: "GYM#{{id}}",
    sortKey: "GYM#{{shortName}}",
  },
  indexes: {
    GSI1: {
      partitionKey: "NAME#{{name}}",
      sortKey: "GYM#{{id}}",
      type: INDEX_TYPE.GSI,
    },
    // Need two indexes for every entity
    GSI2: {
      partitionKey: "NAME#{{name}}",
      sortKey: "GYM#{{id}}",
      type: INDEX_TYPE.GSI,
    },
  },
})
export class Gym extends Base {
  @Attribute()
  shortName: string;

  @Attribute()
  name: string;

  @Attribute()
  location: string;

  @Attribute()
  toploggerId: string | null;

  @Attribute()
  topoId: string | null;

  @Attribute()
  defaultGradeSystemId: string;
}
