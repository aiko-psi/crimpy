import { Attribute, Entity } from "@typedorm/common";
import { Base } from "./base.entity";

@Entity({
  name: "user",
  primaryKey: {
    partitionKey: "USER#{{id}}",
    sortKey: "USER#{{name}}",
  },
})
export class User extends Base {
  @Attribute()
  name: string;

  @Attribute()
  topLoggerId: number | null;
}
