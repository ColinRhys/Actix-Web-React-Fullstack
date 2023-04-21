import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { addSiteUser } from "../../features/siteUser/siteUserslice";
import { useAuth0 } from "@auth0/auth0-react";
import { checkUserName, createUser } from "../../services/backend-api.service";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export const CreateUserForm = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { user } = useAuth0();
  console.log("The user object sub value is in CREATEuserFORM - " + user.sub);
  const dispatch = useDispatch();

  const userFirstNameRef = useRef(undefined);
  const userLastNameRef = useRef(undefined);
  const userUserNameRef = useRef(undefined);
  console.log("This is the user obj - " + user);

  const handleCreateUser = async (event) => {
    event.preventDefault();
    const accessToken = await getAccessTokenSilently();
    const userFirstName = userFirstNameRef.current.value;
    const userLastName = userLastNameRef.current.value;
    const userEmail = user.email;
    const userUserName = userUserNameRef.current.value;
    const userAuth0Sub = user.sub.replace("auth0|", "");
    const { data } = await checkUserName(userUserName, accessToken);
    if (data === "UserName is free") {
      const { data } = await createUser(
        accessToken,
        userFirstName,
        userLastName,
        userEmail,
        userUserName,
        userAuth0Sub
      );
      const createUserJsonData = await data;
      dispatch(addSiteUser(createUserJsonData));
    } else {
      console.log(data);
      document.getElementById("user-name-input-error").hidden = false;
    }
  };

  return (
    <div>
      <Typography gutterBottom variant="h3" align="center">
        Create Profile
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
              Fill in the form to create a user profile
            </Typography>
            <form onSubmit={handleCreateUser}>
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
                  <TextField
                    placeholder="Enter User Name"
                    label="UserName"
                    variant="outlined"
                    inputRef={userUserNameRef}
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

export default CreateUserForm;
