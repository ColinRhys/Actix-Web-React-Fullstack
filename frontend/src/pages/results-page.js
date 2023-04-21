import React from "react";
import { PageLayout } from "../components/page-layout";
import SearchResults from "../components/search-results";
import store from "../store";

export const ResultsPage = () => {
  const state = store.getState();
  const user = state.user.users[0];
  return (
    <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Results Page
        </h1>
        <div className="content__body">
          <p id="page-description">
            <span>This is a the results page</span>
          </p>
        </div>
        <div>
          <SearchResults props={user} />
        </div>
      </div>
    </PageLayout>
  );
};
