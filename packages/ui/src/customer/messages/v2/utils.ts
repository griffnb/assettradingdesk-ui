import { MessageModel } from "@/models/models/message/model/MessageModel";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

/**
 * Format a date/time for display in messages
 * Shows time (h:mm A) for recent messages, relative time for older ones
 */
export function formatDateTime(date: dayjs.Dayjs | null): string {
  if (!date) return "";

  const now = dayjs();
  const hoursAgo = now.diff(date, "hour");

  // Show relative time if more than 24 hours ago
  if (hoursAgo > 24) {
    return date.fromNow();
  }

  // Show clock time for recent messages
  return date.format("h:mm A");
}

/**
 * Format a price value as currency
 * Returns "Contact for Price" for null/zero values
 */
export function formatPrice(price: number | null): string {
  if (!price || price === 0) {
    return "Contact for Price";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Group messages by asset_id, then by opportunity_id within each asset
 * Returns a map of asset IDs to their opportunity threads
 */
export function groupMessagesByAsset(messages: MessageModel[]): Map<string, Map<string, MessageModel[]>> {
  const assetMap = new Map<string, Map<string, MessageModel[]>>();

  messages.forEach((message) => {
    if (!message.asset_id || !message.opportunity_id) return;

    if (!assetMap.has(message.asset_id)) {
      assetMap.set(message.asset_id, new Map());
    }

    const opportunityMap = assetMap.get(message.asset_id)!;

    if (!opportunityMap.has(message.opportunity_id)) {
      opportunityMap.set(message.opportunity_id, []);
    }

    opportunityMap.get(message.opportunity_id)!.push(message);
  });

  return assetMap;
}

/**
 * Group messages by opportunity_id
 * Returns a map of opportunity IDs to their messages
 */
export function groupMessagesByOpportunity(messages: MessageModel[]): Map<string, MessageModel[]> {
  const opportunityMap = new Map<string, MessageModel[]>();

  messages.forEach((message) => {
    if (!message.opportunity_id) return;

    if (!opportunityMap.has(message.opportunity_id)) {
      opportunityMap.set(message.opportunity_id, []);
    }

    opportunityMap.get(message.opportunity_id)!.push(message);
  });

  return opportunityMap;
}
