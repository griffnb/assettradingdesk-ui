import { Outlet } from "react-router";

export default function RootIndex() {
  return (
    <>
      Unauthed Layout <Outlet />
    </>
  );
}
