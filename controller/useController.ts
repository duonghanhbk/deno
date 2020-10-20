// deno-lint-ignore-file
import { Context, Status, STATUS_TEXT, parseAndDecode } from "../deps.ts";
import type { Payload } from "../deps.ts";

import { Response } from "../helper/repsonse.ts";
import { parseToken } from "../helper/token.ts";
import { saveUser, selectUserByPhone } from "../repository/userRepo.ts";
import { encryptPass, verifyPass } from "../security/pass.ts";
import { genToken } from "../security/jwt.ts";

export const signInHandler = async (context: Context) => {
  const body = context.request.body();
  const reqData = await body.value;

  const user = await selectUserByPhone(reqData.phone);

  if (!user) {
    return Response(
      context,
      Status.NotFound,
      { status: Status.NotFound, message: STATUS_TEXT.get(Status.NotFound) },
    );
  }

  const passIsValid = verifyPass(reqData.password, user.password);
  if (!passIsValid) {
    return Response(
      context,
      Status.Unauthorized,
      {
        status: Status.Unauthorized,
        message: STATUS_TEXT.get(Status.Unauthorized),
      },
    );
  }
  const token = await genToken({ phone: user!.phone });
  return Response(
    context,
    Status.OK,
    {
      status: Status.OK,
      message: STATUS_TEXT.get(Status.OK),
      data: {
        displayName: user!.displayName,
        avatar: user!.avatar,
        token,
      },
    },
  );
};

export const signUpHandler = async (context: Context) => {
  const body = context.request.body();
  const reqData = await body.value;
  const user = await selectUserByPhone(reqData.phone);
  if (user) {
    return Response(
      context,
      Status.Conflict,
      { status: Status.Conflict, message: STATUS_TEXT.get(Status.Conflict) },
    );
  }
  reqData.password = encryptPass(reqData.password);
  const insertId = await saveUser(reqData);
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
  const token = await genToken({ phone: reqData.phone });
  return Response(
    context,
    Status.OK,
    {
      status: Status.OK,
      message: STATUS_TEXT.get(Status.OK),
      data: {
        displayName: reqData.displayName,
        avatar: reqData.avatar,
        token,
      },
    },
  );
};

export const profileHandler = async (context: Context) => {
  const token = await parseToken(context);
  const payload: any = await parseAndDecode(token)?.payload;
  const user = await selectUserByPhone(payload!.phone);
  if (!user) {
    return Response(
      context,
      Status.NotFound,
      { status: Status.NotFound, message: STATUS_TEXT.get(Status.NotFound) },
    );
  }
  return Response(
    context,
    Status.OK,
    {
      status: Status.OK,
      message: STATUS_TEXT.get(Status.OK),
      data: {
        displayName: user!.displayName,
        avatar: user!.avatar,
        phone: user!.phone,
      },
    },
  );
};
