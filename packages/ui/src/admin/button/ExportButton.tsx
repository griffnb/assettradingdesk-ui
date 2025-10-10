import { ServerService } from "@/common_lib/services/ServerService";
import { BaseModel } from "@/models/BaseModel";
import { Button } from "@/ui/common/components/buttons/Button";
import { MenuOption } from "@/ui/common/components/menu/MenuOption";
import { observer } from "mobx-react-lite";

interface ExportButtonProps<T extends BaseModel> {
  record: T;
  variant?: "default" | "menu";
}

export const ExportButton = observer(
  <T extends BaseModel>(props: ExportButtonProps<T>) => {
    const exportObj = async () => {
      if (!props.record) {
        return;
      }
      const resp = await ServerService.callGet(
        props.record._model_name,
        `${props.record.id as string}/export`,
      );
      if (!resp.success) {
        return;
      }

      const stringData = JSON.stringify(resp.data);

      const element = document.createElement("a");
      const file = new Blob([stringData], {
        type: "text/plain",
      });
      element.href = URL.createObjectURL(file);
      element.download = `${props.record._model_name}_${props.record.id}.json`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    };

    return (
      <>
        {props.variant && props.variant === "menu" ? (
          <MenuOption
            prependIcon={<i className="fa fa-download mr-2"></i>}
            onClick={exportObj}
          >
            Export
          </MenuOption>
        ) : (
          <Button
            onClick={exportObj}
            variant="primary"
            size="sm"
            className="ml-auto"
          >
            Export
          </Button>
        )}
      </>
    );
  },
);
