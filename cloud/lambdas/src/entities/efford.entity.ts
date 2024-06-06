import {
  Attribute,
  Entity,
  AutoGenerateAttribute,
  INDEX_TYPE,
} from "@typedorm/common";
import { AUTO_GENERATE_ATTRIBUTE_STRATEGY } from "@typedorm/common";

@Entity({
  name: "efford",
  primaryKey: {
    partitionKey: "EFF#{{id}}",
    sortKey: "IROUTE#{{routeId}}",
  },
  indexes: {
    // specify GSI1 key -IROUTE "GSI1" named global secondary index needs to exist in above table declaration
    GSI1: {
      partitionKey: "USER#{{userId}}",
      sortKey: "IROUTE#{{routeId}}",
      type: INDEX_TYPE.GSI,
    },
  },
})
export class Efford {
  @AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.UUID4,
  })
  id: string;

  @Attribute()
  routeId: string;

  @Attribute()
  userId: string;

  @Attribute()
  toploggerId: string | undefined;

  @Attribute()
  status: string;

  @Attribute()
  tries: number | undefined;

  @AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.EPOCH_DATE,
  })
  savedAt: number;

  @AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.EPOCH_DATE,
    autoUpdate: true, // this will make this attribute and any indexes referencing it auto update for any write operation
  })
  updatedAt: number;
}
