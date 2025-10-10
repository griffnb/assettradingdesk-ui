import { StoreModel } from "@/models/store/StoreModel";
import { debugLog } from "@/utils/debug";
import { isObjectValid, ValidationType } from "@/utils/validations";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { ReactNode, useState } from "react";
import FieldWrap from "../fields/FormFieldWrap";
import DetailInput from "./DetailInput";
import { DetailFieldProps } from "./types";

type ChildrenProps = {
  append: ReactNode;
  handleSave: () => void;
  handleCancel: () => void;
};

export type LabelButtonProps = {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  handleSave: () => void;
  handleCancel: () => void;
};

/**
 *
 * @example
 * [&_*[data-slot='field-wrap-label']]:border-t
 *
 * ##DetailFieldWrap Slots
 * @slot {"detail-field-wrap-append"} data-slot="detail-field-wrap-append" data-[slot=detail-field-wrap-append]: [data-slot="detail-field-wrap-append"]:
 *
 * ## FormFieldWrap
 * @slot {"field-wrap"} data-slot="field-wrap" data-[slot=field-wrap]: [data-slot="field-wrap"]:
 * @slot {"field-wrap-label"} data-slot="field-wrap-label" data-[slot=field-wrap-label]: [data-slot="field-wrap-label"]:
 * @slot {"field-wrap-input"} data-slot="field-wrap-input" data-[slot=field-wrap-input]: [data-slot="field-wrap-input"]:
 */

interface DetailFieldWrapProps<T extends StoreModel & ValidationType>
  extends DetailFieldProps<T> {
  children: (props: ChildrenProps) => ReactNode;
  value: string;
  textArea?: boolean;
  readOnly?: boolean;
  rows?: number;
  render?: (
    props: DetailFieldWrapProps<T>,
    setIsEditing: (value: boolean) => void
  ) => ReactNode;
  labelClassName?: string;
  labelButton?: (props: LabelButtonProps) => ReactNode;
  detailWrapAppend?: ReactNode;
  className?: string;
  linkLabel?: string;
  linkHandler?: () => void;
}
const DetailFieldWrap = observer(
  <T extends StoreModel & ValidationType>(
    rawProps: DetailFieldWrapProps<T>
  ) => {
    const { className, ...props } = rawProps;

    const [isEditing, setIsEditing] = useState(false);

    const handleCancel = () => {
      runInAction(() => {
        if (props.parentRecord) {
          props.parentRecord.rollback();
        } else {
          props.record.rollback();
        }
        setIsEditing(false);
      });
    };

    const handleSave = async () => {
      runInAction(async () => {
        const messages = isObjectValid<T>(props.record);
        if (messages.length > 0) {
          debugLog(messages);
          return false;
        }

        let success = false;
        if (props.parentRecord) {
          const resp = await props.parentRecord.save();
          success = resp.success;
        } else {
          const resp = await props.record.save();
          success = resp.success;
        }

        if (!success) {
          return;
        }

        setIsEditing(false);

        if (props.reloadOnSave) {
          if (typeof props.reloadOnSave === "function") {
            await props.reloadOnSave();
          } else {
            if (props.parentRecord) {
              await props.parentRecord.reload();
            } else {
              await props.record.reload();
            }
          }
        }
      });
    };

    return (
      <FieldWrap
        linkLabel={props.linkLabel}
        linkHandler={props.linkHandler}
        className={className}
        field={props.field}
        label={props.label}
        labelClassName={props.labelClassName}
        labelButton={
          props.labelButton &&
          props.labelButton({
            isEditing,
            setIsEditing,
            handleSave,
            handleCancel,
          })
        }
      >
        {!isEditing ? (
          props.render ? (
            props.render(props, setIsEditing)
          ) : (
            <DetailInput
              {...props}
              append={
                props.readOnly ? null : (
                  <div className="contents" data-nowrap={true}>
                    <button
                      type="button"
                      className="relative inline-flex items-center rounded-r-md border-l px-4 py-3 align-bottom text-sm font-semibold text-gray-900 hover:bg-gray-50"
                      onClick={() => setIsEditing(true)}
                    >
                      <i className="fa fa-pencil"></i>
                    </button>
                    {props.detailWrapAppend}
                  </div>
                )
              }
            />
          )
        ) : (
          props.children({
            handleSave,
            handleCancel,
            append: (
              <div
                data-slot="detail-field-wrap-append"
                className="contents"
                data-nowrap={true}
              >
                <button
                  type="button"
                  className="relative inline-flex items-center border-l px-4 py-3 align-bottom text-sm font-semibold text-error-500 hover:bg-gray-50"
                  onClick={handleCancel}
                >
                  <i className="fa fa-xmark"></i>
                </button>
                <button
                  type="button"
                  className="relative inline-flex items-center rounded-r-md border-l px-4 py-3 align-bottom text-sm font-semibold text-success-500 hover:bg-gray-50"
                  onClick={handleSave}
                >
                  <i className="fa fa-check"></i>
                </button>
              </div>
            ),
          })
        )}
      </FieldWrap>
    );
  }
);

export default DetailFieldWrap;
