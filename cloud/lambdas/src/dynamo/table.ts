import { Table, INDEX_TYPE } from "@typedorm/common";

export const globalTable = new Table({
  name: "crimpy-dynamo",
  partitionKey: "PK",
  sortKey: "SK",
  indexes: {
    GSI1: {
      type: INDEX_TYPE.GSI,
      partitionKey: "GSI1PK",
      sortKey: "GSI1SK",
    },
  },
});
