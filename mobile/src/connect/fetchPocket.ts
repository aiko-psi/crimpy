import PocketBase, { ListResult } from "pocketbase";

const pocketbaseBackendBasePath = "http://127.0.0.1:8090";
const pb = new PocketBase(pocketbaseBackendBasePath);

export function fetchPocket<T>(): Promise<ListResult<T> | null> {
  return pb.collection<T>("test").getList();
}
