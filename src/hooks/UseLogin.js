import { useState, useEffect } from "react";

export const UseLogin = (data) => {
  const [user, setUser] = useState(data);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    fetch("https://gentle-fortress-01681.herokuapp.com/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUserToken(data);
      });
  }, []);

  return userToken;
};
