import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import {
  addSiteUser,
  removeSiteUser,
} from "../../features/siteUser/siteUserslice";
import { updateUser } from "../../services/backend-api.service";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export const UpdateUserForm = () => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  const siteUserFirstName = useSelector((state) => state.siteUser.firstName);
  const siteUserLastName = useSelector((state) => state.siteUser.lastName);
  const siteUserEmail = useSelector((state) => state.siteUser.email);
  const siteUserUserName = useSelector((state) => state.siteUser.userName);
  const siteUserUserAuth0Sub = useSelector(
    (state) => state.siteUser.user_auth0_sub
  );
  const userFirstNameRef = useRef(siteUserFirstName);
  const userLastNameRef = useRef(siteUserLastName);

  const handleUpdateUser = async (event) => {
    event.preventDefault();
    const userFirstName = userFirstNameRef.current.value;
    const userLastName = userLastNameRef.current.value;
    const accessToken = await getAccessTokenSilently();
    const { data } = await updateUser(
      userFirstName,
      userLastName,
      siteUserEmail,
      siteUserUserName,
      accessToken,
      siteUserUserAuth0Sub
    );
    const updatedUserJsonData = await data;
    dispatch(removeSiteUser());
    dispatch(addSiteUser(updatedUserJsonData));
  };

  return (
    <div className="App">
      <Typography gutterBottom variant="h3" align="center">
        Update Your Profile
      </Typography>
      <Grid>
        <Card>
          <CardContent>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              gutterBottom
            >
              Fill the form to update your profile
            </Typography>
            <form onSubmit={handleUpdateUser}>
              <Grid container spacing={4}>
                <Grid xs={12} sm={6} item>
                  <TextField
                    placeholder="Enter first name"
                    label="First Name"
                    variant="outlined"
                    inputRef={userFirstNameRef}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    placeholder="Enter last name"
                    label="Last Name"
                    variant="outlined"
                    inputRef={userLastNameRef}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default UpdateUserForm;
