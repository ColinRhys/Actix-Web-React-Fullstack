import { Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";

export const DetailedUser = ({ props }) => {
  const userCreatedAt = props.created_at;
  const userEmail = props.email;
  const userFirstName = props.first_name;
  const userLastName = props.last_name;
  const userID = props.id;
  const userProfileStatus = props.published_profile;
  const userAuth0Sub = props.user_auth0_sub;
  const userUserName = props.user_name;
  const userUserUUID = props.user_uuid;
  return (
    <div>
      <Grid>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h1" component="h2" align="center" gutterBottom>
              {userUserName}
            </Typography>
            <Grid container spacing={4}>
              <Grid xs={12} sm={6} item>
                <Typography align="center" variant="h5">
                  User First Name: {userFirstName}
                </Typography>
              </Grid>
              <Grid xs={12} sm={6} item>
                <Typography align="center" variant="h5">
                  User Last Name: {userLastName}
                </Typography>
              </Grid>
              <Grid xs={12} sm={6} item>
                <Typography align="center" variant="h5">
                  Email: {userEmail}
                </Typography>
              </Grid>
              <Grid xs={12} sm={6} item>
                <Typography align="center" variant="h5">
                  Created At: {userCreatedAt}
                </Typography>
              </Grid>
              <Grid xs={12} sm={6} item>
                <Typography align="center" variant="h5">
                  User ID: {userID}
                </Typography>
              </Grid>
              <Grid xs={12} sm={6} item>
                <Typography align="center" variant="h5">
                  Published Profile: {userProfileStatus}
                </Typography>
              </Grid>
              <Grid xs={12} sm={6} item>
                <Typography align="center" variant="h5">
                  User Auth0 Sub: {userAuth0Sub}
                </Typography>
              </Grid>
              <Grid xs={12} sm={6} item>
                <Typography align="center" variant="h5">
                  User UUID: {userUserUUID}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default DetailedUser;
