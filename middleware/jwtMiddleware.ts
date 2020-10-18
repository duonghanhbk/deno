import { Context, Status } from "../deps.ts";
import { Response } from "../helper/repsonse.ts";

import { validateToken } from "../security/jwt.ts";

import { parseToken } from "../helper/token.ts";
// deno-lint-ignore no-explicit-any
export const jwtMiddleware = async (context: Context, next: any) => {
  const token = await parseToken(context);
  if (!token || !(await validateToken(token)).isValid) {
    return Response(
      context,
      Status.Unauthorized,
      { status: Status.Unauthorized, message: "Invalid token" },
    );
  } else {
    await next();
    return;
  }
};
