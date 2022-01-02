import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

import UserService from "../services/user.service";



const BoardUser = ( ) => {

  const [content, setContent] = useState("");


  const {userId}  = useParams()

  useEffect(() => {
      UserService.getUserBoard( { userId } ).then(
        (response) => {
          console.log(response)
          const data = response.data.result
          if (data.length > 0) {
          const userData = Object.keys(data[0]).map((item, i) => (
            <li key={i}>
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