import { Attribute, Entity, INDEX_TYPE } from "@typedorm/common";
import { Base } from "./base.entity";

@Entity({
  name: "gradesystem",
  primaryKey: {
    partitionKey: "GS#{{name}}",
    sortKey: "GS#{{name}}",
  },
  indexes: {
    GSI1: {
      partitionKey: "GS#{{name}}",
      sortKey: "GS#{{name}}",
      type: INDEX_TYPE.GSI,
    },
    // Need two indexes for every entity
    GSI2: {
      partitionKey: "GS#{{name}}",
      sortKey: "GS#{{name}}",
      type: INDEX_TYPE.GSI,
    },
  },
})
export class Gradesystem extends Base {
  @Attribute()
  name: string;

  @Attribute()
  grades: Grade[];
}

export class Grade {
  label: string;

  value: number;
}
