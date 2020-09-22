import { Router } from "https://deno.land/x/oak/mod.ts";

import { testApiHandler } from "../controller/useController.ts";

const router = new Router();
router
  .get("/api/test", testApiHandler);

export default router;
