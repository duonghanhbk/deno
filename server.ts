import { Application, oakCors } from "./deps.ts";
import apiRouter from "./router/router.ts";
const app = new Application();

app.use(apiRouter.routes());
app.use(oakCors()); // Enable CORS for All Routes
app.use(apiRouter.allowedMethods());

await app.listen({ port: 8000 });
