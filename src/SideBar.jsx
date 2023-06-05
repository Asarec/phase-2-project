import { Outlet } from "react-router-dom";

function SideBar() {
  return (
    <>
      <p>This is the SideBar.</p>
      <Outlet />
    </>
  );
}

export default SideBar;
