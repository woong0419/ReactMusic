import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import "./Login.css";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [_id, set_Id] = useState(null);
  const [success, setSuccess] = useState(false);

  const loginApi = (user) => {
    return fetch("https://gentle-fortress-01681.herokuapp.com/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    }).then((res) => res.json());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userToken = await loginApi({
      userName: userName,
      password: password,
      _id: _id,
    });

    if (userToken.message === "login successful") {
      localStorage.setItem("access_token", userToken.token);
      setSuccess(true);
    } else {
      setUserName("");
      setPassword("");
      set_Id(null);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h2>Log In</h2>
        <input
          placeholder="User Name"
          id="userName"
          name="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>

        <button type="submit">Login</button>
        {success ? <Redirect to="/newreleases" /> : <div></div>}
        <Link to="/register">
          <button>Register</button>
        </Link>
      </form>
    </div>
  );
}

export default Login;
