import { createNewThread, createReply } from "./_messages";
import { getThread, getThreadByAsset, getThreads } from "./_threads";

export const MessageService = {
  createReply,
  createNewThread,
  getThreads,
  getThread,
  getThreadByAsset,
};
