import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { UseLogin } from "../hooks/UseLogin";

import "./Login.css";

function Login() {
  const [user, setUser] = useState({
    userName: "woo",
    password: "123",
  });
  const userToken = UseLogin(user);

  if (userToken) {
    localStorage.setItem("access_token", userToken.token);
  }

  return (
    <h1>
      {console.log("GET LOGIN")}
      {userToken ? (
        <div>
          <Redirect to="/newreleases" />
          {console.log(userToken.token)}
        </div>
      ) : (
        <div></div>
      )}
    </h1>
  );
}

export default Login;
