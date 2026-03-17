import { describe, expect, it } from "vitest";
// npm exec vitest UserStore.test.ts

import { idDecode, idEncode } from "./encode";

describe("idEncode", () => {
  it("should encode the ID correctly", () => {
    for (let i = 0; i < 30; i++) {
      const id = Math.floor(Math.random() * 1000);
      const encodedId = idEncode(id);
      const decodedID = idDecode(encodedId);
      console.log({ id, encodedId, decodedID });
      expect(decodedID).toEqual(id);
    }
  });
});
