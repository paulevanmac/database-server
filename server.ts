import { host, port } from "./config/server_config.ts";
import { serve } from "./config/deps.ts";
import { router } from "./routing/router.ts";

console.log(`Starting HTTP server at: ${host}${port}`);
await serve(router, { port });
