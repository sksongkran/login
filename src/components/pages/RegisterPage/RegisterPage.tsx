import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, FormikProps } from "formik";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
  SxProps,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { User } from "../../../types/user.type";
import { httpClient } from "./../../../utils/httpclient";
import { server } from "../../../Constants";
import * as registerActions from "../../../actions/register.action";
import { useDispatch, useSelector } from "react-redux";
import { RootReducers } from "../../../reducers";
import { useAppDispatch } from "../../..";
type RegisterPageProps = {
  //
};

const RegisterPage: React.FC<any> = () => {
  const registerReducer = useSelector((state: RootReducers) => state.registerReducer);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const classes: SxProps<Theme> | any = {
    root: { display: "flex", justifyContent: "center" },
    buttons: { marginTop: 2 },
  };

  const showFormV1 = ({ handleSubmit, handleChange, isSubmitting, values }: FormikProps<any>) => {
    return (
      <form onSubmit={handleSubmit}>
        <label>Username: </label>
        <input type="text" name="username" id="username" onChange={handleChange} value={values.username} />
        <br />
        <label>Password: </label>
        <input type="text" name="password" id="password" onChange={handleChange} value={values.password} />
        <br />

        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
        <button onClick={() => navigate(-1)}>Back</button>
      </form>
    );
  };

  const showFormV2 = ({ handleSubmit, handleChange, isSubmitting, values }: FormikProps<User>) => {
    return (
      <form onSubmit={handleSubmit}>
        <TextField
          variant="standard"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          onChange={handleChange}
          value={values.username}
          autoComplete="email"
          autoFocus
        />

        <TextField
          variant="standard"
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password"
          onChange={handleChange}
          value={values.password}
          type="password"
        />
       
        <br />

        {registerReducer.isError && <Alert severity="error">Register failed</Alert>}

        <Stack direction="row" spacing={2} sx={classes.buttons}>
          <Button onClick={() => navigate("/login")} type="button" fullWidth variant="outlined">
            Cancel
          </Button>
          <Button type="submit" fullWidth variant="contained" color="primary" disabled={registerReducer.isFetching}>
            Create
          </Button>
        </Stack>
      </form>
    );
  };

  const initialValues: User = { username: "", password: "" };

  return (
    <>
      <Box sx={classes.root}>
        <Card sx={{ maxWidth: 400,borderRadius: 5 }}>
          <CardMedia component="img" height="140" src={`${process.env.PUBLIC_URL}/images/background.jpg`} />

          <CardContent>
            <Stack alignItems="center">
              <Typography gutterBottom variant="h4" sx={{ marginTop: -14 }} style={{ color: "white" }}>
                Register
              </Typography>
            </Stack>
            <Formik
              onSubmit={async (values, {}) => {
                dispatch(registerActions.register(values, navigate));
              }}
              initialValues={initialValues}
            >
              {(props) => showFormV2(props)}
            </Formik>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};
export default RegisterPage;
