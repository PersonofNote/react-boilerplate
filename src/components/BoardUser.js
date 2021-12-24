import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import UserService from "../services/user.service";

const BoardUser = ( {userId} ) => {

  console.log("User id is: " + userId)
  console.log(userId)
  const [content, setContent] = useState("");

  console.log("🍓🍓")
  console.log(useSearchParams("userId"))

  useEffect(() => {
    UserService.getUserBoard( {userId} ).then(
      (response) => {
        const data = response.data.result[0]
        const userData = Object.keys(data).map((item, i) => (
          <li key={i}>
              <span className="input-label">{ item } : { data[item] } </span>
          </li>
      ))
        setContent(userData);
        console.log(response.data.result)

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