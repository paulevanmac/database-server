import { host, port } from "../config/server_config.ts";
import { assertEquals, describe, it } from "../config/deps.ts";
import { router } from "./router.ts";

describe("Routing e2e behaviour", () => {
    const baseUrl = `${host}${port}/`;

    it("should test that request without a controller match returns 404", async () => {
        const unknownUrl = baseUrl + "unknown";
        const request = new Request(unknownUrl);
        const result = await router(request);

        assertEquals(result.status, 404);
    });

    it("should test that default_controller request returns 200", async () => {
        const request = new Request(baseUrl);
        const result = await router(request);

        assertEquals(result.status, 200);
    });

    it("should test that a valid set_controller request leads to a successful get_controller request", async () => {
        // Set request
        const setUrl = baseUrl + "set?hello=world";
        const setRequest = new Request(setUrl);
        const setResult = await router(setRequest);
        assertEquals(setResult.status, 201);

        // Get request
        const getUrl = baseUrl + "get?key=hello";
        const getRequest = new Request(getUrl);
        const getResult = await router(getRequest);
        assertEquals(getResult.status, 200);
        getResult.text().then((body) => assertEquals(body, "world"));
    });
});
