import {
    Attribute,
    Entity,
    AutoGenerateAttribute,
    INDEX_TYPE,
  } from "@typedorm/common";
  import { AUTO_GENERATE_ATTRIBUTE_STRATEGY } from "@typedorm/common";
  
  @Entity({
    name: "grade",
    primaryKey: {
      partitionKey: "GRADE#{{id}}",
      sortKey: "GRADE#{{id}}",
    },
    indexes: {
      // specify GSI1 key - "GSI1" named global secondary index needs to exist in above table declaration
      GSI1: {
        partitionKey: "GS#{{id}}",
        sortKey: "GS#{{id}}",
        type: INDEX_TYPE.GSI,
      },
    },
  })
  export class Gym {
    @AutoGenerateAttribute({
      strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.UUID4,
    })
    id: string;

    @Attribute()
    gradesystemId: string;
  
    @Attribute()
    title: string;
  
    @Attribute()
    value: number;
  
    @AutoGenerateAttribute({
      strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.EPOCH_DATE,
      autoUpdate: true, // this will make this attribute and any indexes referencing it auto update for any write operation
    })
    updatedAt: number;
  }
  