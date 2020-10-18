import type { Context } from "../deps.ts";

export const parseToken = async (context: Context) => {
  const headers: Headers = context.request.headers;
  const authorization = headers.get("Authorization");

  if (!authorization) {
    return "";
  }

  const token = authorization.split(" ")[1];
  if (!token) {
    return "";
  }
  return token;
};
