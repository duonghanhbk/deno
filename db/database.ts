import { MongoClient } from "https://deno.land/x/mongo@v0.11.1/mod.ts";

const client = new MongoClient();
client.connectWithUri(
  "mongodb+srv://duonghanhbk:Abcd123456%40@cluster0.yg3g2.mongodb.net/demo?retryWrites=true&w=majority",
);

const db = client.database("demo");

export default db;
