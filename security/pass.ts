import { bcrypt } from "../deps.ts";

export const encryptPass = (stringToHash: string) => {
  return bcrypt.hashSync(stringToHash);
};

export const verifyPass = (text: string, hash: string) => {
  return bcrypt.compareSync(text, hash);
};
