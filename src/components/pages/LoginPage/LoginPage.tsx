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
  Checkbox,
  FormControlLabel,
  Grid,
  Stack,
  SxProps,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { User } from "../../../types/user.type";
import { useDispatch, useSelector } from "react-redux";
import { RootReducers } from "../../../reducers";
import * as loginActions from "../../../actions/login.action";
import { useAppDispatch } from "../../..";
import { border, borderColor } from "@mui/system";

type LoginPageProps = {
  //
};

const LoginPage: React.FC<any> = () => {
  const loginReducer = useSelector((state: RootReducers) => state.loginReducer);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const classes: SxProps<Theme> | any = {
    root: { display: "flex", justifyContent: "center" },
    buttons: { marginTop: 2 },
  };

  const showFormV1 = ({ handleSubmit, handleChange, isSubmitting, values }: FormikProps<User>) => {
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
        <button onClick={() => navigate("/register")}>Register</button>
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
          onChange={(event) => handleChange(event)}
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
          onChange={(event) => handleChange(event)}
          value={values.password}
          type="password"
        />
        <br />
       
        {loginReducer.isError && <Alert severity="error">Login failed</Alert>}

        <Stack direction="row" spacing={2} sx={classes.buttons}>
          <Button onClick={() => navigate("/register")} type="button" fullWidth variant="outlined">
            Register
          </Button>
          <Button type="submit" fullWidth variant="contained" color="primary" disabled={loginReducer.isFetching}>
            Login
          </Button>
        </Stack>
      </form>
    );
  };

  const initialValues: User = { username: "", password: "" };
  return (
    <>
      <Box sx={classes.root}>
        <Card sx={{ maxWidth: 500 ,borderRadius: 5}}>
          <CardMedia component="img" height="140" src={`${process.env.PUBLIC_URL}/images/background.jpg`} />

          <CardContent>
              <Stack alignItems="center">
                <Typography variant="h4" gutterBottom sx={{marginTop:-14}} style={{color:"white"}}>
                  Sing In
                </Typography>
              </Stack>

            <Formik
              onSubmit={(values, {}) => {
                dispatch(loginActions.login(values, navigate));
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
export default LoginPage;
function setInputs(arg0: (inputs: any) => any) {
  throw new Error("Function not implemented.");
}

function handleRememberMeChange(e: any) {
  setInputs((inputs) => ({ ...inputs, rememberPassword: !inputs.rememberPassword }));
}