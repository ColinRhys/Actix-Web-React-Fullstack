import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { NavBarTab } from "./nav-bar-tab";

export const NavBarTabs = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="nav-bar__tabs">
      <NavBarTab path="/" label="Home" />
      <NavBarTab path="/adminApproval" label="Admin Approval" />
      {isAuthenticated && (
        <>
          <NavBarTab path="/userDashboard" label="User Dashboard" />
        </>
      )}
    </div>
  );
};
