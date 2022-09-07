import { defaultController } from "./default_controller.ts";
import { getController } from "./get_controller.ts";
import { setController } from "./set_controller.ts";

interface Route {
    pattern: URLPattern;
    controller: (request: Request) => Promise<Response>;
}

const routes: Array<Route> = [
    {
        pattern: new URLPattern({ pathname: "/" }),
        controller: defaultController,
    },
    {
        pattern: new URLPattern({ pathname: "/get" }),
        controller: getController,
    },
    {
        pattern: new URLPattern({ pathname: "/set" }),
        controller: setController,
    },
];

async function router(request: Request): Promise<Response> {
    for (const route of routes) {
        const match = route.pattern.test(request.url);
        if (match) {
            return route.controller(request);
        }
    }

    return await new Promise<Response>((resolve) => {
        resolve(new Response(null, { status: 404 }));
    });
}

export { router };
