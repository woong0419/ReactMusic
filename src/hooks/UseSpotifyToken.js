import { useState, useEffect } from "react";

export const UseSpotifyToken = () => {
  const [token, setToken] = useState(null);
  let auth = btoa(
    process.env.REACT_APP_CLIENTID + ":" + process.env.REACT_APP_CLIENTSECRET
  );

  const time = new Date();
  useEffect(() => {
    if (
      !sessionStorage.getItem("spotify_token") ||
      time.setSeconds(time.getSeconds()) >=
        Number(sessionStorage.getItem("token_expires"))
    ) {
      sessionStorage.removeItem("token_expires");
      sessionStorage.removeItem("spotify_token");
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
          const tokenExpires = new Date();

          console.log(Number(data.expires_in));
          sessionStorage.setItem("spotify_token", data.access_token);
          sessionStorage.setItem(
            "token_expires",
            tokenExpires.setSeconds(
              tokenExpires.getSeconds() + Number(data.expires_in)
            )
          );
        });
    } else {
      console.log(time.setSeconds(time.getSeconds()));
      setToken(sessionStorage.getItem("spotify_token"));
    }
  }, []);

  return token;
};
