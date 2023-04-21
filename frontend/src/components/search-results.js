import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";

function SearchResults({ props }) {
  const userFirstName = props.first_name;
  const userLastName = props.last_name;
  const userEmail = props.email;
  const userUserName = props.user_name;
  const userCreatedDateTime = props.created_at;
  const detailedUserUrl = "/detailedUser?userUserName=" + userUserName;
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
                  Created At: {userCreatedDateTime}
                </Typography>
              </Grid>
              <Grid xs={4} item></Grid>
              <Grid xs={4} item justifyContent="center">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  href={detailedUserUrl}
                  target="_blank"
                  fullWidth
                >
                  View Profile
                </Button>
              </Grid>
              <Grid xs={4} item></Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}

export default SearchResults;
