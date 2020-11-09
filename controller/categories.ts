// deno-lint-ignore-file
import {
  Context,
  helpers,
  parseAndDecode,
  Status,
  STATUS_TEXT,
} from "../deps.ts";

import { Response } from "../helper/repsonse.ts";
import { parseToken } from "../helper/token.ts";
import { selectUserByUsername } from "../repository/userRepo.ts";
import {
  getDetailCategory,
  getListCategories,
  saveCategory,
  totalCategories,
} from "../repository/categories.ts";

export const createCategoryHandler = async (context: Context) => {
  const token = await parseToken(context);
  const payload: any = await parseAndDecode(token)?.payload;
  const user = await selectUserByUsername(payload!.username);
  if (!user) {
    return Response(
      context,
      Status.NotFound,
      { status: Status.NotFound, message: STATUS_TEXT.get(Status.NotFound) },
    );
  }

  const body = context.request.body();
  const reqData = await body.value;
  const data = { ...reqData, id: totalCategories + 1 };
  const insertId = await saveCategory(data);

  if (!insertId) {
    return Response(
      context,
      Status.InternalServerError,
      {
        status: Status.InternalServerError,
        message: STATUS_TEXT.get(Status.InternalServerError),
      },
    );
  }
  return Response(
    context,
    Status.OK,
    {
      meta: {
        code: Status.OK,
        message: STATUS_TEXT.get(Status.OK),
      },
      data: {
        ...reqData,
      },
    },
  );
};

export const getListCategoriesHandler = async (context: Context) => {
  const token = await parseToken(context);
  const payload: any = await parseAndDecode(token)?.payload;
  const user = await selectUserByUsername(payload!.username);
  if (!user) {
    return Response(
      context,
      Status.NotFound,
      { status: Status.NotFound, message: STATUS_TEXT.get(Status.NotFound) },
    );
  }

  const { _start, _limit } = helpers.getQuery(context);
  const categoriesList = await getListCategories(
    +_start,
    +_limit,
  );
  if (!categoriesList) {
    return Response(
      context,
      Status.InternalServerError,
      {
        status: Status.InternalServerError,
        message: STATUS_TEXT.get(Status.InternalServerError),
      },
    );
  }
  const responseData = categoriesList.map((item) => {
    const { name, name_en, id, description, description_en } = item;
    return {
      name,
      name_en,
      id,
      description,
      description_en,
    };
  });
  return Response(
    context,
    Status.OK,
    {
      meta: {
        code: Status.OK,
        message: STATUS_TEXT.get(Status.OK),
        total: totalCategories,
      },
      data: responseData,
    },
  );
};

export const getDetailCategoryHandler = async (context: Context) => {
  const token = await parseToken(context);
  const payload: any = await parseAndDecode(token)?.payload;
  const user = await selectUserByUsername(payload!.username);
  if (!user) {
    return Response(
      context,
      Status.NotFound,
      { status: Status.NotFound, message: STATUS_TEXT.get(Status.NotFound) },
    );
  }

  const { id } = helpers.getQuery(context, { mergeParams: true });

  const category = await getDetailCategory(+id);

  if (!category) {
    return Response(
      context,
      Status.InternalServerError,
      {
        status: Status.InternalServerError,
        message: STATUS_TEXT.get(Status.InternalServerError),
      },
    );
  }

  const { name, name_en, description, description_en } = category;
  const responseData = {
    name,
    name_en,
    id,
    description,
    description_en,
  };

  return Response(
    context,
    Status.OK,
    {
      meta: {
        code: Status.OK,
        message: STATUS_TEXT.get(Status.OK),
      },
      data: responseData,
    },
  );
};
