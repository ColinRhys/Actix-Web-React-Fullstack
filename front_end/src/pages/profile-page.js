import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import { CodeSnippet } from "../components/code-snippet";
import { PageLayout } from "../components/page-layout";
import { useDispatch } from "react-redux";
import { addSiteUser } from "../features/siteUser/siteUserslice";

export const ProfilePage = () => {
  const baseUrl = process.env.REACT_APP_BACKEND_URL;
  const dispatch = useDispatch();
  const { user } = useAuth0();
  console.log(user);
  const userSubFormatted = user.sub.replace("auth0|", "");
  console.log("The userSubFormatted - " + userSubFormatted);
  var url =
    baseUrl + "/findUserByEmailAndSub/" + user.email + "/" + userSubFormatted;
  console.log("The URL i will send is - /n" + url);
  useEffect(() => {
    const userFetch = async () => {
      const response = await fetch(url);
      console.log("The response - " + response);
      const userData = await response.json();
      console.log("The User Data - " + userData);
      dispatch(addSiteUser(userData));
    };
    userFetch();
  });

  if (!user) {
    return null;
  }

  return (
    <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Profile Page
        </h1>
        <div className="content__body">
          <p id="page-description">
            <span>
              You can use the <strong>ID Token</strong> to get the profile
              information of an authenticated user.
            </span>
            <span>
              <strong>Only authenticated users can access this page.</strong>
            </span>
          </p>
          <div className="profile-grid">
            <div className="profile__header">
              <img
                src={user.picture}
                alt="Profile"
                className="profile__avatar"
              />
              <div className="profile__headline">
                <h2 className="profile__title">{user.name}</h2>
                <span className="profile__description">{user.email}</span>
              </div>
            </div>
            <div className="profile__details">
              <CodeSnippet
                title="Decoded ID Token"
                code={JSON.stringify(user, null, 2)}
              />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
