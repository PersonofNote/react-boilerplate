import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import FormControl from '@mui/material/FormControl';
//import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { InputLabel, Input } from '@mui/material';
import { Navigate } from "react-router-dom";

// TEST
import { Avatar, TextField, CssBaseline, Link, Grid, Box, Typography, Container } from "@material-ui/core";

import AuthService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = ({setCurrentUser}) => {

  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");


  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);
    // TODO: implement form validation with different library (current library uses deprecated api)
    //form.current.validateAll();
    AuthService.login(username, password).then((response) => { 
     if(response.status === 200) {
      return response.user
     }else {
      setLoading(false);
    }
    }).catch(err => {console.log("There was an error! " + err)})
  };

  if (AuthService.getCurrentUser() != null) {
    // This throws a warning... but it works.
    setCurrentUser(AuthService.getCurrentUser());
    return  <Navigate to="/" replace={true} />;
  }

 return (
  <Container component="main" maxWidth="xs">
  <CssBaseline />
  <Box
    sx={{
      marginTop: 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
    </Avatar>
    <Typography component="h1" variant="h5">
      Sign in
    </Typography>
    <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        onChange = {onChangeUsername}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        onChange = {onChangePassword}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Sign In
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link href="#" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </Box>
  </Box>
</Container>  
 );
};

export default Login