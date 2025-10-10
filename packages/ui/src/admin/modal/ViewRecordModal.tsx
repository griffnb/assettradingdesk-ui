import { StoreModel } from "@/models/store/StoreModel";
import { Button } from "@/ui/common/components/buttons/Button";
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
  record: StoreModel;
}
export const ViewRecordModal = observer((props: ViewRecordModalProps) => {
  const attributes = props.record.getAttributes();

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
                        attributes[field as keyof typeof attributes]
                      )
                    ) {
                      return (
                        <span>
                          {dayjs(
                            attributes[field as keyof typeof attributes]
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
                              2
                            )}
                          </div>
                        </DisclosurePanel>
                      </Disclosure>
                    );
                  case "string":
                    return (
                      <span>
                        {attributes[field as keyof typeof attributes]}
                      </span>
                    );
                  case "number":
                    return (
                      <span>
                        {attributes[field as keyof typeof attributes]}
                      </span>
                    );
                  case "boolean":
                    return (
                      <span>
                        {attributes[field as keyof typeof attributes]
                          ? "true"
                          : "false"}
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
