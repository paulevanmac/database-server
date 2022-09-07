import { host, port } from "./config/server_config.ts";
import { assertEquals } from "./config/deps.ts";
import { router } from "./routing/router.ts";

const baseUrl = `${host}${port}/`;

Deno.test(
    "Test that request with no controller match returns 404",
    async () => {
        const unknownUrl = baseUrl + "unknown";
        const request = new Request(unknownUrl);
        const result = await router(request);

        assertEquals(result.status, 404);
    }
);

Deno.test("Test that default_controller request returns 200", async () => {
    const request = new Request(baseUrl);
    const result = await router(request);

    assertEquals(result.status, 200);
});

Deno.test(
    "Test that default_controller request returns 'Hello, World!'",
    async () => {
        const request = new Request(baseUrl);
        const result = await router(request);

        result.text().then((body) => assertEquals(body, "Hello, World!"));
    }
);

Deno.test(
    "Test that get_controller request with missing key returns status 500",
    async () => {
        const setUrl = baseUrl + "get?test=hello";
        const request = new Request(setUrl);
        const result = await router(request);

        assertEquals(result.status, 500);
    }
);

Deno.test(
    "Test that a valid set_controller request returns status 201 created",
    async () => {
        const setUrl = baseUrl + "set?hello=world";
        const request = new Request(setUrl);
        const result = await router(request);

        assertEquals(result.status, 201);
    }
);

Deno.test(
    "Test that a valid set_controller request leads to a successful get_controller request",
    async () => {
        // Set request
        const setUrl = baseUrl + "set?hello=world";
        const setRequest = new Request(setUrl);
        const setResult = await router(setRequest);
        assertEquals(setResult.status, 201);

        // Get request
        const getUrl = baseUrl + "get?key=hello";
        const getRequest = new Request(getUrl);
        const getResult = await router(getRequest);
        getResult.text().then((body) => assertEquals(body, "world"));
    }
);
