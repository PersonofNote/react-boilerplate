import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
          // TODO: Structure this home page to accomodate different data
        setContent(response.data.message);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container">
        <h1>{content}</h1>
        <p>Welcome to my Flask/React boilerplate! This is a simple app designed to get an app with secure user signup/authentication up and running as quickly as possible.</p>
        <p> It uses React and Material UI on the frontend, and Flask and Postgres on the backend. Deployment is handled via Docker, Gunicorn and NGINX.</p>
        <p> This project was partly so that I'd have a springboard for my backlog of personal projects and partly to practice using fun tools like SQLAlchemy, as well as processes like building my own deployment pipelines and implementing features such as JWT-based authentication.</p>
        <p> Since this app is a boilerplate starter, it is deliberately light on features; all you can do is sign up, log in, and see your username and email. </p>
        <strong> As of right now if you sign up you cannot delete your account </strong> 
        <h2>Planned/In-Progress Features</h2>
        <h3> Front End </h3>
        <ul>
          <li> Animation support </li>
          <li> Better form validation</li>
          <li> Personal theming (instead of Material's standard aesthetic) </li>
          <li> Add LESS for rapid customization </li>
          <li> Google signin </li>
          <li> Ability for user to delete own account </li>
        </ul>
        <h3> Back End </h3>
        <ul>
          <li>More protection for routes</li>
          <li>Clean up file structure</li>
          <li>Rewrite routes to be more intuitive</li>
          <li>Validation/password recovery email (without using a service like Mailgun)</li>
        </ul>

        <h3> Deployment </h3>
        <li> CI with Github Actions </li>
        <li> Testing </li>
    </div>
  );
};

export default Home;