import { ServerService } from "@/common_lib/services/ServerService";

/**
 * Create a reply message in an existing thread
 * @param data - Message data containing thread_id and body
 * @returns Promise with the created message
 */
export const createReply = async (data: {
  body: string;
  thread_id: string;
}) => {
  return ServerService.callPost("message", `reply/${data.thread_id}`, data);
};

export const createNewThread = async (data: {
  body: string;
  asset_id: string;
}) => {
  return ServerService.callPost("message", `new/${data.asset_id}`, data);
};
