import {
    Attribute,
    Entity,
    AutoGenerateAttribute,
    INDEX_TYPE,
  } from "@typedorm/common";
  import { AUTO_GENERATE_ATTRIBUTE_STRATEGY } from "@typedorm/common";
  
  @Entity({
    name: "user",
    primaryKey: {
      partitionKey: "USER#{{id}}",
      sortKey: "USER#{{name}}",
    },
    indexes: {
      // specify GSI1 key - "GSI1" named global secondary index needs to exist in above table declaration
      GSI1: {
        partitionKey: "USER#TLID#{{topLoggerId}}",
        sortKey: "USER#NAME#{{name}}",
        type: INDEX_TYPE.GSI,
      },
    },
  })
  export class User {
    @AutoGenerateAttribute({
      strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.UUID4,
    })
    id: string;
  
    @Attribute()
    name: string;

    @Attribute()
    topLoggerId: number;
  
    
    @AutoGenerateAttribute({
      strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.EPOCH_DATE,
      autoUpdate: true, // this will make this attribute and any indexes referencing it auto update for any write operation
    })
    updatedAt: number;
  }