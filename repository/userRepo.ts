import DB from "../db/database.ts";
import type { User } from "../model/user.ts";

const userCollection = DB.collection<User>("users");

export const saveUser = async (user: User) => {
  return await userCollection.insertOne(user);
};

export const selectUserByUsername = async (username: string) => {
  return await userCollection.findOne({ username: username });
};
