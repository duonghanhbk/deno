import { Router } from "https://deno.land/x/oak/mod.ts";

import {
  signInHandler,
  signOut,
  signUpHandler,
  profileHandler,
} from "../controller/useController.ts";

import { jwtMiddleware } from "../middleware/jwtMiddleware.ts";

const router = new Router();
router
  .post("/api/user/login", signInHandler)
  .post("/api/user/sign-up", signUpHandler)
  .post("/api/user/auth/logout", jwtMiddleware, signOut)
  .get("/api/user/profile", jwtMiddleware, profileHandler);

export default router;
