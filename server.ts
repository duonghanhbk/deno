import { Application } from "https://deno.land/x/oak/mod.ts";

import apiRouter from "./router/router.ts";
const app = new Application();

app.use(apiRouter.routes());
app.use(apiRouter.allowedMethods());

await app.listen({ port: 8000 });
