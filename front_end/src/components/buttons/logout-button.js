import { useAuth0 } from "@auth0/auth0-react";
import { removeSiteUser } from "../../features/siteUser/siteUserslice";
import React from "react";
import { useDispatch } from "react-redux";

export const LogoutButton = () => {
  const { logout } = useAuth0();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(removeSiteUser());
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <button className="button__logout" onClick={handleLogout}>
      Log Out
    </button>
  );
};
