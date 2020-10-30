import DB from "../db/database.ts";
import type { Categories } from "../model/categories.ts";

const categoriesCollection = DB.collection<Categories>("categories");

export const saveCategory = async (category: Categories) => {
  return await categoriesCollection.insertOne(category);
};

export const getAllCategories = async () => {
  return await categoriesCollection.find();
};

export const totalCategories = await categoriesCollection.count();

export const getListCategories = async (_start: number, _limit: number) => {
  return await categoriesCollection.find().skip(
    _start > 0 ? ((_start - 1) * _limit) : 0,
  )
    .limit(_limit);
};

export const getDetailCategory = async (id: number) => {
  return await categoriesCollection.findOne({ id: id });
};
