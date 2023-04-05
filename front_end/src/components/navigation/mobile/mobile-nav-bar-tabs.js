import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { MobileNavBarTab } from "./mobile-nav-bar-tab";

export const MobileNavBarTabs = ({ handleClick }) => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="mobile-nav-bar__tabs">
      <MobileNavBarTab path="/" label="Home" handleClick={handleClick} />
      <MobileNavBarTab
        path="/adminApproval"
        label="Admin Approval"
        handleClick={handleClick}
      />
      <MobileNavBarTab
        path="/adminApproval"
        label="Admin Approval"
        handleClick={handleClick}
      />
      {isAuthenticated && (
        <>
          <MobileNavBarTab
            path="/userDashboard"
            label="User Dashboard"
            handleClick={handleClick}
          />
        </>
      )}
    </div>
  );
};
