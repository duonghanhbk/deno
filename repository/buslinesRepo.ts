import DB from "../db/database.ts";
import { Buslines, Region, SingleLinesItem } from "../model/buslines.ts";

const buslinesCollection = DB.collection("buslines");

export const getBuslines = async () => {
  return await buslinesCollection.findOne();
};
