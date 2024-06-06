import {
  Attribute,
  Entity,
  AutoGenerateAttribute,
  INDEX_TYPE,
} from "@typedorm/common";
import { AUTO_GENERATE_ATTRIBUTE_STRATEGY } from "@typedorm/common";

@Entity({
  name: "indoor-route",
  primaryKey: {
    partitionKey: "IROUTE#{{id}}",
    sortKey: "IROUTE#{{name}}",
  },
  indexes: {
    // specify GSI1 key - "GSI1" named global secondary index needs to exist in above table declaration
    GSI1: {
      partitionKey: "GYM#{{id}}",
      sortKey: "IROUTE#STATUS#{{active}}",
      type: INDEX_TYPE.GSI,
    },
  },
})
export class IndoorRoute {
  @AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.UUID4,
  })
  id: string;

  @Attribute()
  gymId: string;

  @Attribute()
  active: boolean;

  @Attribute()
  color: string;

  @Attribute()
  name: string | undefined;

  @Attribute()
  topLoggerId: number;

  @Attribute()
  initialGrade: number;

  @Attribute()
  initialGradeId: string;

  @Attribute()
  tags: string[];

  @Attribute()
  qualityRatings: number[];

  @Attribute()
  comments: string[];

  @Attribute()
  settingDate: Date;

  @Attribute()
  unsettingDate: Date | undefined;

  @AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.EPOCH_DATE,
    autoUpdate: true, // this will make this attribute and any indexes referencing it auto update for any write operation
  })
  updatedAt: number;
}
