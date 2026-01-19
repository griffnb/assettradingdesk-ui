import { Store } from "@/models/store/Store";

/**
 * Fetch message threads
 * @returns Promise with the threads
 */
export const getThreads = async () => {
  return Store.message.queryRecords("threads", {});
};

/**
 * Fetch a specific message thread by ID
 * @param threadId - ID of the thread to fetch
 * @returns Promise with the thread
 */
export const getThread = async (threadId: string) => {
  return Store.message.queryRecords(`threads/${threadId}`, {});
};

export const getThreadByAsset = async (assetId: string) => {
  return Store.message.queryRecords(`threads/asset/${assetId}`, {});
};
