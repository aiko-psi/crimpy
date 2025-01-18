//@ts-ignore: This is a weird problem for later https://github.com/pocketbase/js-sdk/issues/92
import PocketBase from "pocketbase";
import { helpersFrom } from "zod-pocketbase";
import { GymRecord } from "./schemas/zod-pocketbase";

const pocketbaseBackendBasePath = "http://127.0.0.1:8090";
const pb = new PocketBase(pocketbaseBackendBasePath);

const { getRecord, getRecords } = helpersFrom({ pocketbase: pb });

export async function getAllGyms(): Promise<GymRecord[]> {
  const { items: allGyms } = await getRecords("gym", {
    schema: GymRecord,
    sort: "-updated",
  });
  return allGyms;
}

