import type { Context } from "https://deno.land/x/oak/mod.ts";

export const testApiHandler = (context: Context) => {
  context.response.body = "Hello !";
};
