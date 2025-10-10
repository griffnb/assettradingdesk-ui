import { AccountModel } from "../models/account/model/AccountModel";
import { AdminModel } from "../models/admin/model/AdminModel";
import { AiToolModel } from "../models/ai_tool/model/AiToolModel";
import { CategoryModel } from "../models/category/model/CategoryModel";
import { LeadModel } from "../models/lead/model/LeadModel";
import { RegistrationModel } from "../models/registration/RegistrationModel";
import { SageProductModel } from "../models/sage_product/SageProductModel";
import { APIStore } from "./api/APIStore";

//: Partial<{ [key in StoreKeys]: IStore<any> }>
export const Store = {
  registration: new APIStore({
    _class: RegistrationModel,
    modelName: "registration",
  }),
  sage_product: new APIStore({
    _class: SageProductModel,
    modelName: "sage_product",
  }),

  admin: new APIStore({
    _class: AdminModel,
    modelName: "admin",
  }),
  account: new APIStore({
    _class: AccountModel,
    modelName: "account",
  }),
  ai_tool: new APIStore({
    _class: AiToolModel,
    modelName: "ai_tool",
  }),
  lead: new APIStore({
    _class: LeadModel,
    modelName: "lead",
  }),
  category: new APIStore({
    _class: CategoryModel,
    modelName: "category",
  }),
};

export const LandingPageStore = {
  registration: new APIStore({
    _class: RegistrationModel,
    modelName: "registration",
  }),
  sage_product: new APIStore({
    _class: SageProductModel,
    modelName: "sage_product",
  }),
};
