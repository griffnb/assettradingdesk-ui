import { AccountModel } from "@/models/models/account/model/AccountModel";
import {
  RowActionColumn,
  RowActions,
  RowActionsActions,
} from "@/ui/common/components/table/cell/RowActions";

import { ServerService } from "@/common_lib/services/ServerService";
import { AccountStatus } from "@/models/models/account/_constants/status";
import { Status } from "@/models/types/constants";
import { MenuOption } from "@/ui/common/components/menu/MenuOption";
import { TableCellProps } from "@/ui/common/components/types/columns";
import { getPublicEnvVar } from "@/utils/env";
import { equals } from "@/utils/numbers";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { ReactNode } from "react";
interface AccountRowActionsProps extends TableCellProps<AccountModel> {
  children?: ReactNode;
  column: RowActionColumn<AccountModel>;
}
export const AccountRowActions = observer((props: AccountRowActionsProps) => {
  const getStatus = (status: number) => {
    const statusObj = props.column.statuses.find((s: Status) =>
      equals(s.id, status),
    );
    return statusObj;
  };

  const disableRecord = () => {
    if (window.confirm("Are you sure you want to disable?")) {
      runInAction(() => {
        props.record.status = 200;
        props.record.save();
      });
    }
  };

  const deleteRecord = () => {
    if (window.confirm("Are you sure you want to delete?")) {
      runInAction(() => {
        props.record.status = 300;
        props.record.save();
      });
    }
  };

  const logInAs = async (redirect = false) => {
    if (window.confirm("Are you sure you want to login as this account?")) {
      await ServerService.postRaw(`/admin/login/super/${props.record.id}`, {});
      if (redirect) {
        const customerURL = getPublicEnvVar("PUBLIC_CUSTOMER_URL");
        window.open(`${customerURL}`, "_blank");
      }
    }
  };

  const getInviteLink = async () => {
    if (
      window.confirm(
        "Are you sure you want to get using an invite link? WARNING: Will reset any existing invite link. DO NOT LOG IN PRODUCTION WITH THIS",
      )
    ) {
      const resp = await ServerService.callPost(
        "account",
        `${props.record.id}/inviteLink`,
        {},
      );
      if (resp.success && resp.data) {
        window.prompt(
          "Use this to log in with incognito NOT IN PROD",
          resp.data,
        );
        return;
      }
    }
  };

  const logInAsLocal = async () => {
    if (getPublicEnvVar("PUBLIC_ENVIRONMENT") == "production") {
      return;
    }

    if (window.confirm("Are you sure you want to login as this account?")) {
      const resp = await ServerService.postRaw(
        `/admin/login/super/${props.record.id}`,
        {},
      );
      const customerURL = getPublicEnvVar("PUBLIC_CUSTOMER_URL");
      if (resp.success && resp.data) {
        window.prompt(
          "Use this to log in with incognito",
          `${customerURL}/token?token=${resp.data.token}`,
        );
      }
    }
  };

  return (
    <RowActions {...props}>
      <RowActionsActions>
        {props.record.status != AccountStatus.Disabled && (
          <MenuOption
            onClick={disableRecord}
            prependIcon={
              <i
                className={`${getStatus(AccountStatus.Disabled)?.class} mr-2`}
              ></i>
            }
          >
            Set {getStatus(AccountStatus.Disabled)?.label}
          </MenuOption>
        )}

        {props.record.status != AccountStatus.Deleted && (
          <MenuOption
            onClick={deleteRecord}
            prependIcon={
              <i
                className={`${getStatus(AccountStatus.Deleted)?.class} mr-2`}
              ></i>
            }
          >
            Set {getStatus(AccountStatus.Deleted)?.label}
          </MenuOption>
        )}

        <MenuOption
          prependIcon={<i className={`fa fa-arrow-right-to-bracket mr-2`}></i>}
          onClick={() => logInAs(true)}
        >
          Log In As Account
        </MenuOption>

        {(props.record.status == AccountStatus.PendingInvite ||
          props.record.status == AccountStatus.PendingEmailVerification) && (
          <MenuOption
            prependIcon={<i className={`fa fa-qrcode mr-2`}></i>}
            onClick={() => getInviteLink()}
          >
            Log In Using Family Invite Link
          </MenuOption>
        )}

        {getPublicEnvVar("PUBLIC_ENVIRONMENT") != "production" && (
          <MenuOption
            prependIcon={<i className={`fa fa-user-secret mr-2`}></i>}
            onClick={() => logInAsLocal()}
          >
            Log In Link for Incognito
          </MenuOption>
        )}
      </RowActionsActions>
    </RowActions>
  );
});
