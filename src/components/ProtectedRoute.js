import React, { useState, useEffect } from 'react'
import AuthService from "../services/auth.service"
import { Navigate } from "react-router-dom"

/*
const ProtectedRoute = ({ component: Component, props: props }) => {
    const { loggedIn } = AuthService.getCurrentUser();

    return loggedIn ? (
        <Component props={ props }/>
    ) : (
        <Navigate to="/login" replace={true} />
            
          
    );
};
*/

const ProtectedRoute = ({ children }) => {
    const auth = AuthService.getCurrentUser();
    return auth ? children : <Navigate to="/login" />;
  }

export { ProtectedRoute };