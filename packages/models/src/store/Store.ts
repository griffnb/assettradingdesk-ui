import { AccountModel } from "../models/account/model/AccountModel";
import { AdminModel } from "../models/admin/model/AdminModel";
import { AssetModel } from "../models/asset/model/AssetModel";
import { CategoryModel } from "../models/category/model/CategoryModel";
import { ChangeLogModel } from "../models/change_log/model/ChangeLogModel";
import { ClientModel } from "../models/client/model/ClientModel";
import { CompanyModel } from "../models/company/model/CompanyModel";
import { FacilityModel } from "../models/facility/model/FacilityModel";
import { GlobalConfigModel } from "../models/global_config/model/GlobalConfigModel";
import { IndustryModel } from "../models/industry/model/IndustryModel";
import { ManufacturerModel } from "../models/manufacturer/model/ManufacturerModel";
import { OpportunityModel } from "../models/opportunity/model/OpportunityModel";
import { OrganizationModel } from "../models/organization/model/OrganizationModel";
import { PipelineModel } from "../models/pipeline/model/PipelineModel";
import { RequestModel } from "../models/request/model/RequestModel";

import { APIStore } from "./api/APIStore";

//: Partial<{ [key in StoreKeys]: IStore<any> }>
export const Store = {
  change_log: new APIStore({
    _class: ChangeLogModel,
    modelName: "change_log",
  }),
  admin: new APIStore({
    _class: AdminModel,
    modelName: "admin",
  }),
  account: new APIStore({
    _class: AccountModel,
    modelName: "account",
  }),
  asset: new APIStore({
    _class: AssetModel,
    modelName: "asset",
  }),
  category: new APIStore({
    _class: CategoryModel,
    modelName: "category",
  }),
  client: new APIStore({
    _class: ClientModel,
    modelName: "client",
  }),
  company: new APIStore({
    _class: CompanyModel,
    modelName: "company",
  }),
  facility: new APIStore({
    _class: FacilityModel,
    modelName: "facility",
  }),
  global_config: new APIStore({
    _class: GlobalConfigModel,
    modelName: "global_config",
  }),
  industry: new APIStore({
    _class: IndustryModel,
    modelName: "industry",
  }),
  manufacturer: new APIStore({
    _class: ManufacturerModel,
    modelName: "manufacturer",
  }),
  organization: new APIStore({
    _class: OrganizationModel,
    modelName: "organization",
  }),
  opportunity: new APIStore({
    _class: OpportunityModel,
    modelName: "opportunity",
  }),
  pipeline: new APIStore({
    _class: PipelineModel,
    modelName: "pipeline",
  }),
  request: new APIStore({
    _class: RequestModel,
    modelName: "request",
  }),
};
