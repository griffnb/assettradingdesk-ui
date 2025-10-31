import { SafeBaseModel } from "@/models/BaseModel";
import { constants } from "@/models/constants";
import { CategoryModel } from "@/models/models/category/model/CategoryModel";
import { ManufacturerModel } from "@/models/models/manufacturer/model/ManufacturerModel";
import { ModelModel } from "@/models/models/model/model/ModelModel";
import { RequestMetaData } from "@/models/models/request/model/RequestBaseModel";
import { RequestModel } from "@/models/models/request/model/RequestModel";
import { TextInput } from "@/ui/common/components/fields/TextInput";
import { DetailFieldContainer } from "@/ui/common/components/form/details/DetailFieldContainer";
import { FormFieldModelSearchSelect } from "@/ui/common/components/form/fields/FormFieldModelSearchSelect";
import FormFieldModelSelect from "@/ui/common/components/form/fields/FormFieldModelSelect";
import { FormFieldMultiSelect } from "@/ui/common/components/form/fields/FormFieldMultiSelect";
import { FormFieldSlider } from "@/ui/common/components/form/fields/FormFieldSlider";
import FormFieldTextArea from "@/ui/common/components/form/fields/FormFieldTextArea";
import { FormFieldWrap } from "@/ui/common/components/form/fields/FormFieldWrap";
import { FormWrap } from "@/ui/common/components/form/wrap/FormWrap";
import { isObjectValid } from "@/utils/validations";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";

interface CustomerRequestFormProps {
  record: RequestModel;
  onSuccess: (record: RequestModel) => void;
  onCancel: () => void;
}

const YEAR_MIN = 1990;
const YEAR_MAX = new Date().getFullYear() + 1;
const YEAR_STEP = 1;

export const CustomerRequestForm = observer(function CustomerRequestForm(
  props: CustomerRequestFormProps,
) {
  const modelSearchFilters: Record<string, string> = {
    disabled: "0",
  };

  if (props.record.manufacturer_id) {
    modelSearchFilters.manufacturer_id = props.record.manufacturer_id;
  }

  if (props.record.category_id) {
    modelSearchFilters.category_id = props.record.category_id;
  }

  const clearModelSelection = () => {
    if (!props.record.model_id) {
      return;
    }
    runInAction(() => {
      props.record.model_id = null;
    });
  };

  const resetYearRange = () => {
    runInAction(() => {
      props.record.meta_data.min_year = 0;
      props.record.meta_data.max_year = 0;
    });
  };

  const saveAction = async () => {
    runInAction(async () => {
      const messages = isObjectValid<RequestModel>(props.record);
      if (messages.length > 0) {
        console.log(messages);
        return false;
      }
      const resp = await props.record.save();

      if (resp.success) {
        props.onSuccess(props.record);
      }
    });
  };

  const cancelAction = () => {
    props.record.rollback();
    props.onCancel();
  };

  const noOptions = !(
    props.record.model_id ||
    props.record.manufacturer_id ||
    props.record.category_id
  );

  const showModelSelection = noOptions || props.record.model_id;
  const showMakeCategorySelection =
    noOptions || props.record.category_id || props.record.manufacturer_id;

  return (
    <FormWrap
      saveAction={saveAction}
      saveLabel="Save"
      showCancel={true}
      cancelLabel="Cancel"
      cancelAction={cancelAction}
    >
      {showMakeCategorySelection && (
        <DetailFieldContainer>
          <FormFieldModelSelect<RequestModel, CategoryModel>
            record={props.record}
            field="category_id"
            label="Category"
            placeholder="Search categories"
            modelName="category"
            modelDisplayField="label"
            modelSearchField="label"
            modelSearchFilters={{ disabled: "0" }}
            showClear={true}
            as="combobox"
            onValueUpdate={() => {
              clearModelSelection();
            }}
          />
          <FormFieldModelSelect<RequestModel, ManufacturerModel>
            record={props.record}
            field="manufacturer_id"
            label="Preferred Manufacturer"
            placeholder="Search manufacturers"
            modelName="manufacturer"
            modelDisplayField="label"
            modelSearchField="label"
            modelSearchFilters={{ disabled: "0" }}
            showClear={true}
            as="combobox"
            onValueUpdate={() => {
              clearModelSelection();
            }}
          />
        </DetailFieldContainer>
      )}
      {noOptions && (
        <div className="relative flex items-center justify-center self-stretch py-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t" />
          </div>
          <div className="relative bg-background px-4">
            <span className="text-sm font-medium text-muted-foreground">
              OR
            </span>
          </div>
        </div>
      )}
      {showModelSelection && (
        <DetailFieldContainer>
          <FormFieldModelSearchSelect<RequestModel, ModelModel>
            record={props.record}
            field="model_id"
            label="Specific Model"
            placeholder="Search models"
            modelName="model"
            modelDisplayField="label"
            modelSearchParam="q"
            modelSearchFilters={modelSearchFilters}
            showClear={true}
            as="combobox"
            onValueUpdate={(record, value) => {
              runInAction(() => {
                if (value) {
                  record.manufacturer_id = value.manufacturer_id;
                  record.category_id = value.category_id;
                }
              });
            }}
          />
        </DetailFieldContainer>
      )}

      {!noOptions && (
        <>
          <FormFieldSlider<RequestModel>
            label="Purchase Time Frame"
            record={props.record}
            field="time_frame"
            max={7}
            step={1}
            isRange={false}
            aria-label="Timeframe"
            topLabels={
              <div className="flex items-center justify-center text-sm font-medium text-gray-700">
                <span>{timeframeToName(props.record.time_frame || 0)}</span>
              </div>
            }
            bottomLabels={
              <div className="flex justify-between text-xs text-gray-500">
                <span>Immediately</span>
                <span>Unknown</span>
              </div>
            }
          />

          <FormFieldWrap label="Budget Range">
            <div className="mb-2 flex w-full items-center justify-center gap-3 text-sm text-gray-700">
              <TextInput
                type="number"
                value={props.record.min_price}
                handleChange={(val) => {
                  const value = parseFloat(val);
                  if (!isNaN(value)) {
                    props.record.min_price = value;
                  } else {
                    props.record.min_price = 0;
                  }
                }}
                prepend="$"
                className="w-full"
              />
              <span>to</span>
              <TextInput
                type="number"
                value={props.record.max_price}
                handleChange={(val) => {
                  const value = parseFloat(val);
                  if (!isNaN(value)) {
                    props.record.max_price = value;
                  } else {
                    props.record.max_price = 0;
                  }
                }}
                prepend="$"
                className="w-full"
              />
            </div>
          </FormFieldWrap>

          <FormFieldSlider
            className="w-full"
            labelButton={
              <button
                type="button"
                className="ml-auto text-xs font-medium text-text-brand-primary hover:underline"
                onClick={resetYearRange}
              >
                Clear
              </button>
            }
            label="Preferred Year Range"
            record={props.record.meta_data as SafeBaseModel<RequestMetaData>}
            field="min_year"
            endField="max_year"
            isRange={true}
            min={YEAR_MIN}
            max={YEAR_MAX}
            step={YEAR_STEP}
            aria-label="Preferred Year Range"
            topLabels={
              <div className="flex items-center justify-between text-sm font-medium text-gray-700">
                <span>{props.record.meta_data.min_year}</span>
                <span>{props.record.meta_data.max_year}</span>
              </div>
            }
            bottomLabels={
              <div className="flex justify-between text-xs text-gray-500">
                <span>{YEAR_MIN}</span>
                <span>{YEAR_MAX}</span>
              </div>
            }
          />

          <FormFieldMultiSelect
            record={props.record.meta_data}
            field="install_statuses"
            label="Acceptable Install Status"
            options={constants.asset.install_status}
            helpText="Choose any install states that work for you."
          />
          <FormFieldMultiSelect
            record={props.record.meta_data}
            field="operational_statuses"
            label="Acceptable Operational Status"
            options={constants.asset.operational_status}
            helpText="Let us know which operating conditions are acceptable."
          />

          <FormFieldTextArea
            record={props.record}
            field="description"
            label="What are you looking for?"
            placeholder="Share the specifics of the asset you need."
            rows={4}
          />
          <FormFieldTextArea
            record={props.record}
            field="configuration_notes"
            label="Configuration Notes"
            placeholder="Describe any must-have configurations or options."
            rows={3}
          />
        </>
      )}
    </FormWrap>
  );
});

const timeframeToName = (value: number) => {
  if (value == 0) {
    return "Immediately";
  }
  if (value == 1) {
    return "Within a month";
  }
  if (value == 2) {
    return "Within a few months";
  }

  if (value == 3) {
    return "Within 6 months";
  }

  if (value == 4) {
    return "Within a year";
  }

  if (value == 5) {
    return "Within 18 months";
  }

  if (value == 6) {
    return "Within 2 years";
  }

  return "Unknown";
};
