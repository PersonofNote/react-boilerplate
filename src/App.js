
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import AuthService from "./services/auth.service";

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
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import { Container } from '@material-ui/core';
import "./App.css";

const printUser = AuthService.getCurrentUser();
console.log("USER IS")
console.log(printUser);

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    console.log(user)
    if (user) {
      setCurrentUser(user);
      //setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      //setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
  <>
  <Container>
    <BrowserRouter>
    <nav className="menu">
      <MenuList>
        <MenuItem>
          <Link to={"/"} className="navbar-brand">
            Logo
          </Link>
        </MenuItem>
        <div className="navbar-nav mr-auto">
        <MenuItem>
          <Link to={"/"} className="nav-link">
              Home
          </Link>
        </MenuItem>
        {!currentUser && (
          <>
          <li className="nav-item">
            <Link to={"/login"} className="nav-link">
              Log In
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/register"} className="nav-link">
              Sign Up
            </Link>
          </li>
          </>
        )} 
          {showModeratorBoard && (
            <li className="nav-item">
              <Link to={"/mod"} className="nav-link">
                Moderator Board
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Board
              </Link>
            </li>
          )}

          {currentUser && (
            <>
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
              <li> <button onClick={logOut}> Logout </button> </li>
            </>
          )}
        </div>
      </MenuList>
    </nav>
      <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="users/:userId" element={<Profile />} />
      </Routes>
    </BrowserRouter>
    <Footer />
  </Container>
  </>
   
  );
};

export default App;