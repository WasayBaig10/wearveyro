import type { RequestForQueries } from "convex/react";
import { api } from "../../convex/_generated/api";

export function buildStorageUrlQueries(
  storageIds: (string | undefined | null)[],
  prefix: string
): RequestForQueries {
  const queries: RequestForQueries = {};
  storageIds.forEach((storageId, i) => {
    if (!storageId) return;
    queries[`${prefix}${i}`] = {
      query: api.storage.getUrl,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      args: { storageId: storageId as any },
    };
  });
  return queries;
}
