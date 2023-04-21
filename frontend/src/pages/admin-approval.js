import React from "react";
import { useDispatch } from "react-redux";
import { PageLayout } from "../components/page-layout";
import { findUnpublishedUserAccounts } from "../features/users/userSlice";
import AdminApprovalUserList from "../components/AdminApprovalUserList";

export const AdminApproval = () => {
  const dispatch = useDispatch();
  var url = "http://localhost:8081/notPublicUsers";
  const handleSearch = async () => {
    const response = await fetch(url);
    const jsonData = await response.json();
    dispatch(findUnpublishedUserAccounts(jsonData));
  };

  return (
    <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Approve Accounts
        </h1>
        <div className="content__body">
          <div>
            <p id="page-description">
              <span>This is the Admin Approval Page</span>
            </p>
          </div>
          <div>
            <button onClick={handleSearch}>Find Users</button>
          </div>
          <div>
            <AdminApprovalUserList />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
