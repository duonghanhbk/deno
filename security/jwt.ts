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
  "exp": 1635324878,
  "iat": 1603788878,
  "id": 2162,
  "permissions": {
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
    "VINDIRECT_cartorder": 31,
    "VINDIRECT_sku": 31,
    "VINDIRECT_unitofmeasure": 31,
    "VINHOMES_Giupviec": 3,
    "VINHOMES_account_management": 63,
    "VINHOMES_booking_online": 63,
    "VINHOMES_category": 63,
    "VINHOMES_event": 63,
    "VINHOMES_facilities": 63,
    "VINHOMES_feedback": 63,
    "VINHOMES_handover": 31,
    "VINHOMES_hotline": 63,
    "VINHOMES_manage_apartment_status": 63,
    "VINHOMES_message": 63,
    "VINHOMES_news": 63,
    "VINHOMES_payment_history": 63,
    "VINHOMES_phone_book": 63,
    "VINHOMES_phonebook_type": 63,
    "VINHOMES_project": 63,
    "VINHOMES_push_notification": 63,
    "VINHOMES_residents_handbook": 63,
    "VINHOMES_service_type": 63,
    "VINHOMES_term": 63,
    "VINHOMES_utility_blacklist": 63,
    "VINHOMES_utility_lock": 31,
    "VINHOMES_utility_type": 63,
    "VINTICKET": 7,
    "Vault": 7,
  },
  "merchant_id": 1000041,
  "merchant_sap_code": "vinhomes01",
  "merchant_code": "vinhomes01",
  "password_updated_at": "2019-07-18T11:14:31Z",
  "staff_store_permissions": null,
  "is_admin": true,
};
export const genToken = async (username: string) => {
  return await makeJwt({ header, payload: { ...permissions, username }, key });
};

export const validateToken = async (token: string) => {
  return (await validateJwt({ jwt: token, key, algorithm: "HS256" }));
};
