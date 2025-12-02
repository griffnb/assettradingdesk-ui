import { ServerService } from "@/common_lib/services/ServerService";

/**
 * Create a seller reply to an existing message
 * @param data - Message data containing message_id and body
 * @returns Promise with the created message
 */
export const createSellerMessage = async (data: {
  body: string;
  message_id: string;
}) => {
  return ServerService.callPost("message", "seller", { data });
};
