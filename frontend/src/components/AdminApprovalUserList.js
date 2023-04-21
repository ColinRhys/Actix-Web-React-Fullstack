import React from "react";
import AdminApprovalUser from "./admin-approval-user";
import { useSelector } from "react-redux";

const AdminApprovalUserList = () => {
  const adminApprovalUsers = useSelector((state) => state.user.users);
  return (
    <div className="admin-approval-users-list">
      <h2>Users Not Approved</h2>
      <ul>
        {adminApprovalUsers.map((item) => (
          <li key={item.id}>
            <AdminApprovalUser props={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminApprovalUserList;
