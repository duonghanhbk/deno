import { validateJwt } from "../deps.ts";
import {
  makeJwt,
} from "../deps.ts";

import type { Jose, Payload } from "../deps.ts";

export const key = "thisissecretkey";

const header: Jose = {
  alg: "HS256",
  typ: "JWT",
};
const permissions = {
  "exp": 1635485416,
  "iat": 1603949416,
  "id": 20631,
  "username": "VinShop631",
  "permissions": {
    "B2BOrdering": 15,
    "Biometrics": 1,
    "Dashboard": 1,
    "Merchant": 7,
    "MerchantAccount": 3,
    "POS": 15,
    "Permission": 1,
    "QR": 3,
    "Reconciliation": 1,
    "Refund": 4,
    "Role": 15,
    "Staff": 63,
    "Store": 7,
    "Transaction": 7,
    "VINBUS_Category_News": 31,
    "VINBUS_Feedback": 31,
    "VINBUS_News": 31,
    "VINBUS_Order": 31,
    "VINDIRECT_cartorder": 31,
    "VINDIRECT_sku": 31,
    "VINDIRECT_unitofmeasure": 31,
    "Vault": 7,
  },
  "merchant_id": 45552735,
  "merchant_sap_code": "Test546",
  "merchant_code": "VINBUS",
  "password_updated_at": "2020-10-07T07:07:56Z",
  "staff_store_permissions": null,
  "is_admin": true,
  "device_id": "8234d842-3e98-4747-b395-b93625b24d32",
};
export const genToken = async (username: string) => {
  return await makeJwt({ header, payload: { ...permissions, username }, key });
};

export const validateToken = async (token: string) => {
  return (await validateJwt({ jwt: token, key, algorithm: "HS256" }));
};
