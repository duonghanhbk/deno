import { validateJwt } from "../deps.ts";
import {
  makeJwt,
} from "../deps.ts";

import type { Jose, Payload } from "../deps.ts";

export const key = "thisissecretkey";

const header: Jose = {
  alg: "HS256",
  typ: "JWT",
};

export const genToken = async (payload: Payload) => {
  return await makeJwt({ header, payload, key });
};

export const validateToken = async (token: string) => {
  return (await validateJwt({ jwt: token, key, algorithm: "HS256" }));
};
