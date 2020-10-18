// deno-lint-ignore-file
import type { Context, Status } from "../deps.ts";

export const Response = (context: Context, status: Status, data: any) => {
  context.response.status = status;
  context.response.body = data;
};
