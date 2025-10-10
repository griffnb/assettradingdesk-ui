import { StoreModel } from "@/models/store/StoreModel";
import { isObjectValid, ValidationType } from "@/utils/validations";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import { ReactNode, useState } from "react";
type ChildrenProps = {
  append: ReactNode;
};

interface InlineEditCellWrapProps<T extends ValidationType & StoreModel> {
  children: (props: ChildrenProps) => ReactNode;
  record: T;
  field: keyof T;
  displayField?: keyof T;
  route?: string;
}
const InlineEditCellWrap = observer(
  <T extends ValidationType & StoreModel>(
    props: InlineEditCellWrapProps<T>,
  ) => {
    const [isEditing, setIsEditing] = useState(false);

    const field = props.displayField || props.field;

    const handleSave = () => {
      runInAction(async () => {
        const messages = isObjectValid<T>(props.record);
        if (messages.length > 0) {
          return false;
        }
        await props.record.save();
        await props.record.reload();
        setIsEditing(false);
      });
    };

    const handleCancel = () => {
      props.record.rollback();
      setIsEditing(false);
    };

    return (
      <>
        {isEditing ? (
          props.children({
            append: (
              <div className="contents" data-nowrap={true}>
                <button
                  type="button"
                  className="relative -ml-px inline-flex items-center px-4 py-3 align-bottom text-sm font-semibold text-error-500 ring-1 ring-inset ring-gray-200 hover:bg-gray-50"
                  onClick={handleCancel}
                >
                  <i className="fa fa-xmark"></i>
                </button>
                <button
                  type="button"
                  className="relative -ml-px inline-flex items-center rounded-r-md px-4 py-3 align-bottom text-sm font-semibold text-success-500 ring-1 ring-inset ring-gray-200 hover:bg-gray-50"
                  onClick={handleSave}
                >
                  <i className="fa fa-check"></i>
                </button>
              </div>
            ),
          })
        ) : (
          <div className="group/edit flex items-center">
            {props.route ? (
              <Link
                href={props.route}
                className="mr-2 border-b-2 border-dotted border-blue-500 font-medium text-blue-600"
              >
                {props.record[field] as string}
              </Link>
            ) : (
              <div className="mr-2 border-b-2 border-dotted border-gray-500">
                {props.record[field] as string}
              </div>
            )}
            <button
              className="invisible group-hover/edit:visible"
              onClick={() => setIsEditing(true)}
            >
              <i className="fa-solid fa-pencil text-gray-700"></i>
            </button>
          </div>
        )}
      </>
    );
  },
);

export default InlineEditCellWrap;
