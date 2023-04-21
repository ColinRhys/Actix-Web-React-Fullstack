import { callExternalApi } from "./external-api.service";

const backendApiServerUrl = process.env.REACT_APP_BACKEND_URL;

export const createUser = async (
  accessToken,
  userFirstName,
  userLastName,
  userEmail,
  userUserName,
  userAuth0Sub
) => {
  const config = {
    url: `${backendApiServerUrl}/createuser`,
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      first_name: userFirstName,
      last_name: userLastName,
      email: userEmail,
      user_name: userUserName,
      user_auth0_sub: userAuth0Sub,
    },
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
};

export const updateUser = async (
  userFirstName,
  userLastName,
  siteUserEmail,
  siteUserUserName,
  accessToken,
  userAuth0Sub
) => {
  const config = {
    url: `${backendApiServerUrl}/user/${userAuth0Sub}`,
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      first_name: userFirstName,
      last_name: userLastName,
      email: siteUserEmail,
      user_name: siteUserUserName,
    },
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
};

export const checkUserName = async (userUserName, accessToken) => {
  const config = {
    url: `${backendApiServerUrl}/findUserByUserName/${userUserName}`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
};

export const getUserByUserName = async (userName) => {
  const config = {
    url: `${backendApiServerUrl}/findDetailedUser/${userName}`,
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
};
