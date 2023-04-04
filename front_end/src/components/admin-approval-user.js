import React from "react";
import { useDispatch } from "react-redux";
import { publishUserProfile } from "../features/users/userSlice";

function AdminApprovalUser({ props }) {
  const dispatch = useDispatch();
  var baseUrl = "http://localhost:8081/users/";
  const handleApproveUser = async () => {
    const url = baseUrl + props.id + "/setPublic";
    const requestOptions = {
      method: "PUT",
    };
    const response = await fetch(url, requestOptions);
    const jsonData = await response.json();
    console.log(jsonData);
    dispatch(publishUserProfile(jsonData.id));
  };
  return (
    <div>
      <div>
        {props.id ? (
          <div className="userInfoData">Id: {props.id}</div>
        ) : (
          <div></div>
        )}
        {props.first_name ? (
          <div className="userInfoData">First Name: {props.first_name}</div>
        ) : (
          <div></div>
        )}
        {props.last_name ? (
          <div className="userInfoData">Last Name: {props.last_name}</div>
        ) : (
          <div></div>
        )}
        {props.email ? (
          <div className="userInfoData">Email: {props.email}</div>
        ) : (
          <div></div>
        )}
        {props.user_name ? (
          <div className="userInfoData">User Name: {props.user_name}</div>
        ) : (
          <div></div>
        )}
        {props.created_at ? (
          <div className="userInfoData">
            User Created At: {props.created_at}
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <button onClick={handleApproveUser}>Approve User</button>
    </div>
  );
}

export default AdminApprovalUser;
