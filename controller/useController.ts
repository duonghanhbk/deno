import type { Context } from "https://deno.land/x/oak/mod.ts";

import Db from "../db/database.ts";

// Defining schema interface
interface UserSchema {
  _id: { $oid: string };
  username: string;
  password: string;
}

const users = Db.collection<UserSchema>("users");

export const testApiHandler = async (context: Context) => {
  console.log(users);
  const insertId = await users.insertOne({
    username: "user1",
    password: "pass1",
  });

  console.log(insertId);
  context.response.body = "Hello !";
};
