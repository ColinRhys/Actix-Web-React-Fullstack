import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { PageLoader } from "./components/page-loader";
import { ProtectedRoute } from "./components/protected-route";
import { CallbackPage } from "./pages/callback-page";
import { HomePage } from "./pages/home-page";
import { NotFoundPage } from "./pages/not-found-page";
import { ResultsPage } from "./pages/results-page";
import { AdminApproval } from "./pages/admin-approval";
import { UserDashboard } from "./pages/user-dashboard";
import { DetailUser } from "./pages/detail-user-page";

export const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }

  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/callback" component={CallbackPage} />
      <Route path="/results" component={ResultsPage} />
      <ProtectedRoute path="/adminApproval" component={AdminApproval} />
      <ProtectedRoute path="/userDashboard" component={UserDashboard} />
      <Route path="/detailedUser" component={DetailUser} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  );
};
