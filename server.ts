import { router } from "./routing/router.ts";
import { host, port } from "./config/server_config.ts";
import { serve } from "./config/deps.ts";

console.log(`Starting HTTP server at: ${host}${port}`);
await serve(router, { port });
