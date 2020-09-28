import DB from "../db/database.ts";
import type { User } from "../model/user.ts";

const userCollection = DB.collection("users");

export const saveUser = async (user: User) => {
  return await userCollection.insertOne(user);
};

export const selectUserByPhone = async (phone: string) => {
  return await userCollection.findOne({ phone: phone });
};
