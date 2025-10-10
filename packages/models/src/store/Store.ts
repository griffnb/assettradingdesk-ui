import { AccountModel } from "../models/account/model/AccountModel";
import { AdminModel } from "../models/admin/model/AdminModel";

import { APIStore } from "./api/APIStore";

//: Partial<{ [key in StoreKeys]: IStore<any> }>
export const Store = {
  admin: new APIStore({
    _class: AdminModel,
    modelName: "admin",
  }),
  account: new APIStore({
    _class: AccountModel,
    modelName: "account",
  }),
};
