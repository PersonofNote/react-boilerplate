
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

import AuthService from "./services/auth.service";

import { ProtectedRoute } from "./components/ProtectedRoute";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";

import HomePage from "./components/HomePage";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import Footer from "./components/Footer";

// Styles
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import { Container } from '@material-ui/core';
import Toolbar from '@mui/material/Toolbar';


import "./App.css";



const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);


  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      //setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      //setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    window.location.reload(false);
    return  <Navigate to="/" replace={true} />;
  };


  return (
  <>
    <BrowserRouter >
      <AppBar className="menu" position="static">
        <Container>
          <>
          <MenuList sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <MenuItem>
              <Link to={"/"} className="navbar-brand">
                Logo
              </Link>
            </MenuItem>
            {!currentUser && (
              <MenuItem>
                <li className="nav-item">
                  <Button>
                    <Link to={"/login"} >
                      Log In
                    </Link>
                  </Button>
                </li>
                <li className="nav-item">
                  <Button>
                    <Link to={"/register"} >
                      Sign Up
                    </Link>
                  </Button>
                </li>
              </MenuItem>
            )} 
              {showModeratorBoard && (
                <MenuItem>
                  <li className="nav-item">
                    <Link to={"/mod"} >
                      Moderator Board
                    </Link>
                  </li>
                </MenuItem>
              )}

              {showAdminBoard && (
                <MenuItem>
                  <li className="nav-item">
                    <Link to={"/admin"} >
                      Admin Board
                    </Link>
                  </li>
                </MenuItem>
              )}

              {currentUser && (
                <>
                <MenuItem>
                  <li className="nav-item">
                    <Link to={`/users/${currentUser.id}`} replace={true} >
                      Profile
                    </Link>
                  </li>
                </MenuItem>
                <MenuItem>
                  <li> <Button variant="contained" onClick={logOut}> Logout </Button> </li>
                </MenuItem>
                </>
              )}
          </MenuList>
          </>
        </Container>
      </AppBar>
      <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />}  />
          <Route path="/register" element={<Register />} />
          {/* Set the userid to an empty string if not defined; this allows the page to load but should never actually be loaded,
          since the route is protected and will redirect if !currentUser. 
          Is there a better way to handle this? */}
          <Route path="users/:userId" element={<ProtectedRoute><BoardUser userId={currentUser ? currentUser.id : ""} /> </ProtectedRoute>} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
      </Routes>
    </BrowserRouter>
    <Footer />
  </>
   
  );
};

export default App;