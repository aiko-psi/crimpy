import { Attribute, Entity } from "@typedorm/common";
import { Base } from "./base.entity";

@Entity({
  name: "gradesystem",
  primaryKey: {
    partitionKey: "GS#{{name}}",
    sortKey: "GS#{{name}}",
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
