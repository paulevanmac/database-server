import { assertEquals, describe, it } from "../config/deps.ts";
import { save, findByKey } from "./store.ts";

describe("Store behaviour", () => {
    it("should return undefined for a key/value pair that does not exist", () => {
        const result = findByKey("test");
        assertEquals(result, undefined);
    });

    it("should return the value for a key/value pair that exists", () => {
        save("hello", "world");
        const result = findByKey("hello");
        assertEquals(result, "world");
    });
});
