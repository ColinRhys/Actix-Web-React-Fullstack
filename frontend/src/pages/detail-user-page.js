import { PageLayout } from "../components/page-layout";
import DetailedUser from "../components/detailed-user";
import React, { useEffect, useState } from "react";
import { getUserByUserName } from "../services/backend-api.service";

export const DetailUser = () => {
  const url = new URLSearchParams(window.location.search);
  console.log("The url is - " + url);
  const userName = url.get("userUserName");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      try {
        const result = await getUserByUserName(userName);
        setUser(result.data);
        console.log(result.data);
        setError(null);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  if (loading) {
    return (
      <PageLayout>
        <div className="content-layout">
          <div className="content__body">
            <h1>Loading</h1>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout>
        <div className="content-layout">
          <div className="content__body">
            <h1>There was an error</h1>
            <p>We are working on finding a puppy picture to display here</p>
          </div>
        </div>
      </PageLayout>
    );
  }
  return (
    <PageLayout>
      <div className="content-layout">
        <div className="content__body">
          <h1>Detail User</h1>
          <DetailedUser props={user} />
        </div>
      </div>
    </PageLayout>
  );
};
