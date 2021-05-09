import React, { useState, useEffect } from "react";
import { UseSpotifyToken } from "../hooks/UseSpotifyToken";

import { faPlayCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AlbumDescription from "../components/AlbumDescription";
import Tracks from "../components/Tracks";

import "./Favorites.css";

function Favorites() {
  const token = UseSpotifyToken();
  const [items, setItems] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const userToken = localStorage.getItem("access_token");

  useEffect(() => {
    fetch("https://gentle-fortress-01681.herokuapp.com/api/user/favourites", {
      headers: {
        Authorization: `JWT ${userToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  }, []);

  return <h1>FAVORITES!{console.log(items)}</h1>;
}

export default Favorites;
