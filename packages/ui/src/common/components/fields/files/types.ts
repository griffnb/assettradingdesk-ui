const mimeTypes: { [key: string]: string } = {
  html: "text/html",
  css: "text/css",
  js: "application/javascript",
  json: "application/json",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  svg: "image/svg+xml",
  pdf: "application/pdf",
  txt: "text/plain",
  xml: "application/xml",
  zip: "application/zip",
  mp3: "audio/mpeg",
  mp4: "video/mp4",
  wav: "audio/wav",
  webm: "video/webm",
  ogg: "application/ogg",
  avi: "video/x-msvideo",
  mov: "video/quicktime",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
};

export function getMimeType(extension: string): string {
  return mimeTypes[extension.toLowerCase()] || "application/octet-stream";
}

export type ImageHolder = {
  file: File;
  uploading: boolean;
  errored: boolean;
  finished: boolean;
  assetURL: string;
  dataURL?: string;
};
