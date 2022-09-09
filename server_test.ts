import { host, port } from "./config/server_config.ts";
import { assertEquals, describe, it } from "./config/deps.ts";
import { router } from "./routing/router.ts";

describe("Server e2e behaviour", () => {
    const baseUrl = `${host}${port}/`;

    it("Should test that request without a controller match returns 404", async () => {
        const unknownUrl = baseUrl + "unknown";
        const request = new Request(unknownUrl);
        const result = await router(request);

        assertEquals(result.status, 404);
    });

    it("Should test that default_controller request returns 200", async () => {
        const request = new Request(baseUrl);
        const result = await router(request);

        assertEquals(result.status, 200);
    });

    it("Should test that default_controller request returns 'Hello, World!'", async () => {
        const request = new Request(baseUrl);
        const result = await router(request);

        result.text().then((body) => assertEquals(body, "Hello, World!"));
    });

    it("Should test that get_controller request with missing param key returns status 400", async () => {
        const setUrl = baseUrl + "get?test=hello";
        const request = new Request(setUrl);
        const result = await router(request);

        assertEquals(result.status, 400);
    });

    it("Should test that get_controller request with invalid query key returns status 404", async () => {
        const setUrl = baseUrl + "get?key=hello";
        const request = new Request(setUrl);
        const result = await router(request);

        assertEquals(result.status, 404);
    });

    it("Should test that a valid set_controller request returns status 201 created", async () => {
        const setUrl = baseUrl + "set?hello=world";
        const request = new Request(setUrl);
        const result = await router(request);

        assertEquals(result.status, 201);
    });

    it("Should test that a valid set_controller request leads to a successful get_controller request", async () => {
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