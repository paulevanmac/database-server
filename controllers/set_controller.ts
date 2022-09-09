import { save } from "../persistence/store.ts";

async function setController(request: Request): Promise<Response> {
    const url = new URL(request.url);

    for (const [key, value] of url.searchParams.entries()) {
        save(key, value);
    }

    return await new Promise<Response>((resolve) => {
        resolve(new Response(null, { status: 201 }));
    });
}

export { setController };
