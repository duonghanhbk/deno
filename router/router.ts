import { Router } from "../deps.ts";

import {
  profileHandler,
  signInHandler,
  signOut,
  signUpHandler,
} from "../controller/useController.ts";
import { buslinesHandler } from "../controller/buslines.ts";
import {
  createCategoryHandler,
  getDetailCategoryHandler,
  getListCategoriesHandler,
} from "../controller/categories.ts";

import { jwtMiddleware } from "../middleware/jwtMiddleware.ts";

const router = new Router();
router
  .post("/api/user/login", signInHandler)
  .post("/api/user/sign-up", signUpHandler)
  .post("/api/user/auth/logout", jwtMiddleware, signOut)
  .post("/api/vinbus/v1/categories", jwtMiddleware, createCategoryHandler)
  .get("/api/vinbus/v1/categories", jwtMiddleware, getListCategoriesHandler)
  .get("/api/vinbus/v1/categories/:id", jwtMiddleware, getDetailCategoryHandler)
  .get("/api/user/profile", jwtMiddleware, profileHandler)
  .get("/api/vinbus-merchant/v1/bus-line", jwtMiddleware, buslinesHandler);

export default router;
