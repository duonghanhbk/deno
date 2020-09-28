import { Context, Status, STATUS_TEXT } from "https://deno.land/x/oak/mod.ts";

import { Response } from "../helper/repsonse.ts";

import { saveUser, selectUserByPhone } from "../repository/userRepo.ts";
import { encryptPass } from "../security/pass.ts";

export const signInHandler = async (context: Context) => {
  context.response.status = Status.OK;
  context.response.body = "SignIn";
};

export const signUpHandler = async (context: Context) => {
  const body = context.request.body();
  const reqData = body.value;
  console.log("requ", context);
  // const user = await selectUserByPhone(reqData.phone);
  // if (user) {
  //   return Response(
  //     context,
  //     Status.Conflict,
  //     { status: Status.Conflict, message: STATUS_TEXT.get(Status.Conflict) },
  //   );
  // }

  // reqData.password = encryptPass(reqData.password);
  // const insertId = await saveUser(body.value);

  // if (!insertId) {
  //   return Response(
  //     context,
  //     Status.InternalServerError,
  //     {
  //       status: Status.InternalServerError,
  //       message: STATUS_TEXT.get(Status.InternalServerError),
  //     },
  //   );
  // }
  return Response(
    context,
    Status.OK,
    {
      status: Status.OK,
      message: STATUS_TEXT.get(Status.OK),
    },
  );
};
