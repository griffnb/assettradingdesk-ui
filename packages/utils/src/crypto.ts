import { type IJSONAPI } from "@/common_lib/services/ServerService";

function base64ToArrayBuffer(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

function hexToUint8Array(hex: string) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
  }
  return bytes;
}

export async function decryptResponse(
  response: IJSONAPI,
  encryptionKey: string | undefined
): Promise<IJSONAPI> {
  if (
    response.success &&
    response.data &&
    encryptionKey &&
    encryptionKey !== "" &&
    encryptionKey !== "_"
  ) {
    try {
      // Decode Base64 to ArrayBuffer
      const encryptedData = base64ToArrayBuffer(response.data);

      // Extract nonce (first 12 bytes) and ciphertext
      const nonce = encryptedData.slice(0, 12); // 12-byte nonce
      const ciphertext = encryptedData.slice(12); // Remaining bytes are ciphertext
      // Convert hex key to Uint8Array
      const rawKey = hexToUint8Array(encryptionKey);
      // Import the key
      const key = await crypto.subtle.importKey(
        "raw", // Raw key material
        rawKey,
        { name: "AES-GCM" },
        false, // Non-exportable
        ["decrypt"]
      );

      // Decrypt the ciphertext
      const decryptedBuffer = await crypto.subtle.decrypt(
        {
          name: "AES-GCM",
          iv: nonce, // Initialization vector
        },
        key,
        ciphertext
      );

      // Convert the decrypted ArrayBuffer to a string
      const decryptedText = new TextDecoder().decode(decryptedBuffer);
      response.data = JSON.parse(decryptedText); // Parse and return JSON
      return response;
    } catch (error) {
      console.error("Decryption failed:", error);
      response.data = null;
      return response;
    }
  } else {
    return response;
  }
}
