import React, { useState, useEffect } from 'react'

const ProtectedRoute = ({ component: Component }) => {
    const { loggedIn } = useContext(UserContext);

    return loggedIn ? (
        <Component />
    ) : (
        <Redirect from="" to="welcome/login" noThrow />
    );
};

export { ProtectedRoute };