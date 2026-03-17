import { ManufacturersIndex as ManufacturersIndexUI } from "@/ui/customer/manufacturers/ManufacturersIndex";
import { observer } from "mobx-react-lite";

export const ManufacturersIndex = observer(function ManufacturersIndex() {
  return <ManufacturersIndexUI />;
});
