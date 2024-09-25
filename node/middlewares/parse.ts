import { json } from "co-body";
import axios from "axios";
import { UserInputError } from "@vtex/api";
import { EMAIL_REGEX } from "../utils/regex";

export async function parseAndValidate(ctx: Context, next: () => Promise<any>) {
  const {
    vtex: { account },
    clients: {},
  } = ctx;

  const data = await json(ctx.req);

  const { clientEmail, accountId, requesterEmail } = data;
  console.log(account);
  ctx.state.body = data;

  if (!clientEmail || !accountId || !requesterEmail) {
    throw new UserInputError(
      `The fields clientEmail, accountId and requesterEmail should be filled correctly`
    );
  } else {
    try {
      const options: any = {
        method: "GET",
        url: `http://${accountId}.myvtex.com/admin`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-VTEX-Use-Https": "true",
          VtexIdClientAutCookie: ctx.vtex.authToken,
        },
      };
      const validateAccount = await axios.request(options).then((res) => {
        return res.status;
      });

      console.log(validateAccount);
    } catch (e) {
      throw new UserInputError(`The accountId needs to be valid`);
    }
  }

  console.log(ctx.state.body);

  if (EMAIL_REGEX.test(clientEmail) == false) {
    throw new UserInputError(`The client email needs to be valid`);
  } else {
    if (EMAIL_REGEX.test(requesterEmail) == false) {
      throw new UserInputError(`The requesterEmail email needs to be valid`);
    } else {
      ctx.status = 200;
      ctx.body = {
        message: `The data associated with the user ${clientEmail} will be deleted`,
      };
    }
  }

  await next();
}
