import React from "react";
import Toolbar from "./toolBar";
import { Outlet } from "react-router-dom";

export default function Layout({isAdmin}) {
  return (
    <>
      <Toolbar isAdmin={isAdmin} />
      <div className="content">
        <Outlet />
      </div>
    </>
  );
}
