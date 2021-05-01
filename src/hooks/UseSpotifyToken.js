import { useState, useEffect } from "react";

export const UseSpotifyToken = () => {
  const [token, setToken] = useState(null);
  let auth = btoa(
    process.env.REACT_APP_CLIENTID + ":" + process.env.REACT_APP_CLIENTSECRET
  );
  useEffect(() => {
    fetch(
      "https://accounts.spotify.com/api/token?grant_type=client_credentials",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "content-type": "application/x-www-form-urlencoded",
        },

        json: true,
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        //console.log(data.access_token);
        setToken(data.access_token);
      });
  }, []);

  return token;
};
