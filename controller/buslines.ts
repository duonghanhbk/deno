// deno-lint-ignore-file
import { Context, Status, STATUS_TEXT, parseAndDecode } from "../deps.ts";

import { Response } from "../helper/repsonse.ts";
import { parseToken } from "../helper/token.ts";
import {
  selectUserByUsername,
} from "../repository/userRepo.ts";
import {
  getBuslines,
} from "../repository/buslinesRepo.ts";

export const buslinesHandler = async (context: Context) => {
  const token = await parseToken(context);
  const payload: any = await parseAndDecode(token)?.payload;
  const user = await selectUserByUsername(payload!.username);

  if (!user) {
    return Response(
      context,
      Status.Unauthorized,
      {
        status: Status.Unauthorized,
        message: STATUS_TEXT.get(Status.Unauthorized),
      },
    );
  }

  const buslines = await getBuslines();
  if (!buslines) {
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
        ...buslines,
      },
    },
  );
};
