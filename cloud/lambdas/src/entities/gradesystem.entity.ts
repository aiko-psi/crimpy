import {
  Attribute,
  Entity,
  AutoGenerateAttribute,
  INDEX_TYPE,
} from "@typedorm/common";
import { AUTO_GENERATE_ATTRIBUTE_STRATEGY } from "@typedorm/common";

@Entity({
  name: "gradesystem",
  primaryKey: {
    partitionKey: "GS#{{name}}",
    sortKey: "GS#{{name}}",
  },
  indexes: {
    // specify GSI1 key - "GSI1" named global secondary index needs to exist in above table declaration
    GSI1: {
      partitionKey: "GYM#{{id}}",
      sortKey: "GYM#{{id}}",
      type: INDEX_TYPE.GSI,
    },
  },
})
export class Gradesystem {
  @AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.UUID4,
  })
  id: string;

  @Attribute()
  gymId: string;

  @Attribute()
  name: string;

  @AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.EPOCH_DATE,
    autoUpdate: true, // this will make this attribute and any indexes referencing it auto update for any write operation
  })
  updatedAt: number;
}
