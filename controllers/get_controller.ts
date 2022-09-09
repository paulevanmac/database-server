import { findByKey } from "../persistence/store.ts";

const searchParamIdentifier = "key";
const errorResponse = "Query param not found.";

async function getController(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const key = url.searchParams.get(searchParamIdentifier);

    if (key === null) {
        return await new Promise<Response>((resolve) => {
            resolve(
                new Response(errorResponse, {
                    status: 400,
                })
            );
        });
    }

    const value = findByKey(key);

    if (!value) {
        return await new Promise<Response>((resolve) => {
            resolve(
                new Response(errorResponse, {
                    status: 404,
                })
            );
        });
    }

    return await new Promise<Response>((resolve) => {
        resolve(new Response(value, { status: 200 }));
    });
}

export { getController };
