import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import { PageLayout } from "../components/page-layout";
import { useDispatch, useSelector } from "react-redux";
import { addSiteUser } from "../features/siteUser/siteUserslice";
import { CreateUserForm } from "../components/forms/create-user-form";
import { UpdateUserForm } from "../components/forms/update-user-form";

export const UserDashboard = () => {
  const baseUrl = process.env.REACT_APP_BACKEND_URL;
  const dispatch = useDispatch();
  const siteUser = useSelector((state) => state.siteUser.firstName);
  const { user } = useAuth0();
  const userSubFormatted = user.sub.replace("auth0|", "");
  var url =
    baseUrl + "/findUserByEmailAndSub/" + user.email + "/" + userSubFormatted;
  useEffect(() => {
    const userFetch = async () => {
      const response = await fetch(url);
      const userData = await response.json();
      dispatch(addSiteUser(userData));
    };
    userFetch();
  });

  return (
    <PageLayout>
      <div className="content-layout">
        <div className="content__body">
          {siteUser.length < 1 && <CreateUserForm />}
          {siteUser.length > 1 && <UpdateUserForm />}
        </div>
      </div>
    </PageLayout>
  );
};
