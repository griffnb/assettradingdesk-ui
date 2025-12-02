import { ServerService } from "@/common_lib/services/ServerService";

/**
 * Create a buyer message - either starting a new conversation or replying
 * @param data - Message data containing either asset_id (new) or message_id (reply)
 * @returns Promise with the created message
 */
export const createBuyerMessage = async (data: {
  body: string;
  asset_id?: string;
  message_id?: string;
}) => {
  return ServerService.callPost("message", "buyer", { data });
};
