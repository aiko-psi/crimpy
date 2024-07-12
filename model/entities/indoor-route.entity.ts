import { Attribute, Entity, INDEX_TYPE } from "@typedorm/common";
import { Base } from "./base.entity";

@Entity({
  name: "indoor-route",
  primaryKey: {
    partitionKey: "IROUTE#{{id}}",
    sortKey: "IROUTE#{{name}}",
  },
  indexes: {
    GSI1: {
      partitionKey: "GYM#{{id}}",
      sortKey: "STATUS#{{active}}#WALL#{wallId]#IROUTE{id}#",
      type: INDEX_TYPE.GSI,
    },
  },
})
export class IndoorRoute extends Base {
  @Attribute()
  gymId: string;

  @Attribute()
  wallId: string;

  @Attribute()
  active: boolean;

  @Attribute()
  color: string | null;

  @Attribute()
  name: string | null;

  @Attribute()
  topLoggerId: number | null;

  @Attribute()
  initialGradeId: string;

  @Attribute()
  tags: string[];

  @Attribute()
  settingDate: Date;

  @Attribute()
  unsettingDate: Date | undefined;
}
