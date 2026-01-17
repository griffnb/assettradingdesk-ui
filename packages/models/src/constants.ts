import { browser } from "@/models/constants/browser";
import { os } from "@/models/constants/os";
import { platform } from "@/models/constants/platform";
import { states } from "@/models/constants/states";
import { countries } from "./constants/countries";
import { constants as account } from "./models/account/constants";
import { constants as admin } from "./models/admin/constants";
import { constants as asset } from "./models/asset/constants";
import { constants as asset_file } from "./models/asset_file/constants";
import { constants as billing_plan } from "./models/billing_plan/constants";
import { constants as category } from "./models/category/constants";
import { constants as change_log } from "./models/change_log/constants";
import { constants as client } from "./models/client/constants";
import { constants as company } from "./models/company/constants";
import { constants as facility } from "./models/facility/constants";
import { constants as global_config } from "./models/global_config/constants";
import { constants as industry } from "./models/industry/constants";
import { constants as manufacturer } from "./models/manufacturer/constants";
import { constants as message } from "./models/message/constants";
import { constants as model } from "./models/model/constants";
import { constants as opportunity } from "./models/opportunity/constants";
import { constants as organization } from "./models/organization/constants";
import { constants as pipeline } from "./models/pipeline/constants";
import { constants as request } from "./models/request/constants";
import { constants as subscription } from "./models/subscription/constants";

export const model_constants = {
  admin,
  account,
  asset,
  asset_file,
  category,
  client,
  company,
  facility,
  industry,
  manufacturer,
  message,
  model,
  organization,
  opportunity,
  pipeline,
  request,
  subscription,
  billing_plan,
  global_config,
  change_log,
};

export const constants = {
  ...model_constants,
  countries,
  states,
  browser,
  platform,
  os,
};
