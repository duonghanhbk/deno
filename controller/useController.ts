// deno-lint-ignore-file
import { Context, Status, STATUS_TEXT, parseAndDecode } from "../deps.ts";

import { Response } from "../helper/repsonse.ts";
import { parseToken } from "../helper/token.ts";
import { saveUser, selectUserByUsername } from "../repository/userRepo.ts";
import { encryptPass, verifyPass } from "../security/pass.ts";
import { genToken } from "../security/jwt.ts";

export const signInHandler = async (context: Context) => {
  const body = context.request.body();
  const reqData = await body.value;

  const user = await selectUserByUsername(reqData.username);

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
  const token = await genToken(user!.username);
  return Response(
    context,
    Status.OK,
    {
      meta: {
        code: Status.OK,
        message: STATUS_TEXT.get(Status.OK),
      },
      data: {
        username: user!.username,
        displayName: user!.displayName,
        avatar: user!.avatar,
        phone: user!.phone,
        access_token: token,
        expires_at: 1635478382,
        refresh_token: "",
        token_type: "Bearer",
      },
    },
  );
};

export const signUpHandler = async (context: Context) => {
  const body = context.request.body();
  const reqData = await body.value;
  const user = await selectUserByUsername(reqData.username);
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
  const token = await genToken(reqData.username);
  return Response(
    context,
    Status.OK,
    {
      meta: {
        code: Status.OK,
        message: STATUS_TEXT.get(Status.OK),
      },
      data: {
        username: reqData.username,
        displayName: reqData.displayName,
        avatar: reqData.avatar,
        phone: reqData.phone,
        access_token: token,
        expires_at: 1635478382,
        refresh_token: "",
        token_type: "Bearer",
      },
    },
  );
};

export const profileHandler = async (context: Context) => {
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
  return Response(
    context,
    Status.OK,
    {
      status: Status.OK,
      message: STATUS_TEXT.get(Status.OK),
      data: {
        username: user!.username,
        displayName: user!.displayName,
        avatar: user!.avatar,
        phone: user!.phone,
      },
    },
  );
};

export const signOut = async (context: Context) => {
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
  return Response(
    context,
    Status.OK,
    {
      meta: {
        code: Status.OK,
        message: STATUS_TEXT.get(Status.OK),
      },
    },
  );
};
