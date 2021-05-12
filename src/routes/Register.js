import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

function Register() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setSuccess] = useState(false);

  const registerAPI = (user) => {
    return fetch(
      "https://gentle-fortress-01681.herokuapp.com/api/user/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      }
    ).then((res) => res.json());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const register = await registerAPI({
        userName: userName,
        password: password,
        password2: password2,
      });
      setMessage(register.message);
      if (register.message === `User ${userName} successfully registered`) {
        setSuccess(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="register">
      <div>
        <h2>Register</h2>
        {message ? (
          <div className="register__message">{message}</div>
        ) : (
          <div></div>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="User Name"
          ></input>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          ></input>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            placeholder="Confirm Password"
          ></input>
          <button type="submit">Submit</button>
          &nbsp;&nbsp;
          {isSuccess ? (
            <Link to="/login">
              <button>Login</button>
            </Link>
          ) : (
            <div></div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Register;
