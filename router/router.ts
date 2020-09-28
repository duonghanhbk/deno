import { Router } from "https://deno.land/x/oak/mod.ts";

import { signInHandler, signUpHandler } from "../controller/useController.ts";

const router = new Router();
router
  .post("/api/user/sign-in", signInHandler)
  .post("/api/user/sign-up", signUpHandler);

export default router;
