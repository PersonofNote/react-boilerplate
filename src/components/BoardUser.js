import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import UserService from "../services/user.service";

// Don't show attributes like password, token, etc.
const userDisplayProperties = ["email", "username"]


const BoardUser = () => {

  const [content, setContent] = useState("");


  const {userId}  = useParams()

  useEffect(() => {
      UserService.getUserBoard( { userId } ).then(
        (response) => {
          const data = response.data.result[0]
          if (data) {
            // Filter by userDisplayProperties
          const userData = Object.keys(data).filter( (item) => userDisplayProperties.includes(item) ).map((item, i) => (
            <li id={`user-attributes-${i}`} key={`user-attributes-${i}`}>
                <span className="input-label">{ item } : { data[item] } </span>
            </li>
        ))
          setContent(userData);
        }
        else {
          setContent("No user data found - please try again");
        }
        },
        (error) => {
          const _content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setContent(_content);
        }
      );
  }, []);

  return (
    <div>
      <header>
        <h3>{content}</h3>
      </header>
    </div>
  );
};

export default BoardUser;