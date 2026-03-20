import { getPublicEnvVar } from "@/common_lib/utils/env";
import { ValidationType } from "@/common_lib/utils/validations";
import { StoreModel } from "@/models/store/StoreModel";
import { Button } from "@/ui/common/components/buttons/Button";
import { DetailFieldCheckbox } from "@/ui/common/components/form/details/DetailFieldCheckbox";
import { DetailFieldText } from "@/ui/common/components/form/details/DetailFieldText";
import { SimpleModal } from "@/ui/common/components/modal/SimpleModal";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import { Fragment } from "react";

export const ViewRecordModalId = "ViewRecordModal";

interface ViewRecordModalProps {
  record: StoreModel | object;
}
export const ViewRecordModal = observer((props: ViewRecordModalProps) => {
  const attributes =
    typeof (props.record as StoreModel).getAttributes === "function"
      ? (props.record as StoreModel).getAttributes()
      : props.record;

  const editable = getPublicEnvVar("PUBLIC_ENVIRONMENT") !== "production";

  return (
    <SimpleModal id={ViewRecordModalId} className="overflow-hidden">
      <div className="grid max-h-[80svh] grid-cols-2 space-y-2 divide-y overflow-y-auto p-5">
        {Object.keys(attributes)
          .sort()
          .map((field) => (
            <Fragment key={field}>
              <strong>{field}:</strong>
              {(() => {
                switch (typeof attributes[field as keyof typeof attributes]) {
                  case "object":
                    if (
                      dayjs.isDayjs(
                        attributes[field as keyof typeof attributes],
                      )
                    ) {
                      return (
                        <span>
                          {dayjs(
                            attributes[field as keyof typeof attributes],
                          ).format("YYYY-MM-DD HH:mm:ss")}
                        </span>
                      );
                    }

                    return (
                      <Disclosure as="div" defaultOpen={false}>
                        <DisclosureButton
                          as={Button}
                          variant={"tertiary"}
                          size={"xs"}
                        >
                          Expand
                        </DisclosureButton>
                        <DisclosurePanel className="mt-2 text-sm">
                          <div className="whitespace-pre-wrap">
                            {JSON.stringify(
                              attributes[field as keyof typeof attributes],
                              null,
                              2,
                            )}
                          </div>
                        </DisclosurePanel>
                      </Disclosure>
                    );
                  case "string":
                    return editable &&
                      Object.prototype.hasOwnProperty.call(
                        props.record,
                        "_model_name",
                      ) ? (
                      <DetailFieldText
                        record={props.record as StoreModel & ValidationType}
                        field={field as keyof typeof props.record}
                        type="text"
                        label=""
                      />
                    ) : (
                      <span>
                        {attributes[field as keyof typeof attributes]}
                      </span>
                    );
                  case "number":
                    return editable &&
                      Object.prototype.hasOwnProperty.call(
                        props.record,
                        "_model_name",
                      ) ? (
                      <DetailFieldText
                        record={props.record as StoreModel & ValidationType}
                        field={field as keyof typeof props.record}
                        type="number"
                        label=""
                      />
                    ) : (
                      <span>
                        {attributes[field as keyof typeof attributes]}
                      </span>
                    );
                  case "boolean":
                    return editable &&
                      Object.prototype.hasOwnProperty.call(
                        props.record,
                        "_model_name",
                      ) ? (
                      <DetailFieldCheckbox
                        record={props.record as StoreModel & ValidationType}
                        field={field as keyof typeof props.record}
                        label=""
                      />
                    ) : (
                      <span>
                        {attributes[field as keyof typeof attributes]}
                      </span>
                    );

                  default:
                    return <div>uknown type</div>;
                }
              })()}
            </Fragment>
          ))}
      </div>
    </SimpleModal>
  );
});
