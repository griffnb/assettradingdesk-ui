export type BlockType =
  | "canned"
  | "answer"
  | "amazon"
  | "adsense"
  | "call"
  | "button"
  | "bubbles"
  | "afs"
  | "chat"
  | "html";

export type BaseBlockConfig = {
  type: BlockType;
  bodyHTML?: string;
  wrapHTML?: string;
  overrideClasses?: string;
  appendClasses?: string;
};

export type TemplateTarget = "upper" | "middle" | "lower";

export type TargetConfig = {
  overrideClasses?: string;
  appendClasses?: string;
  blocks: BlockConfig[];
};

export type TemplateConfig = {
  [key in TemplateTarget]: TargetConfig;
};

export type BlockConfig =
  | AmazonBlock
  | AdsenseBlock
  | HTMLBlock
  | Chat
  | Canned
  | Call;

interface HTMLBlock extends BaseBlockConfig {
  type: "html";
  bodyHTML: string;
}

type AdsenseBlock = Adsense & BaseBlockConfig;
interface Adsense {
  type: "adsense";
  otID: string;
  className?: string;
  adSize: string | number;
  adSlotID: string;
}

type AmazonBlock = Amazon & BaseBlockConfig;
interface Amazon {
  type: "amazon";
  otID: string;
  className?: string;
  adSize?: string | number;
}

interface Chat extends BaseBlockConfig {
  type: "chat";
}

interface Canned extends BaseBlockConfig {
  type: "canned";
}

interface Call extends BaseBlockConfig {
  type: "call";
  otOrOGID: string;
  isPingTree: boolean;
  defaultNumber: string;
  bodyHtml: string;
}
