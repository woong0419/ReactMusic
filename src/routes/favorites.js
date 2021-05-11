import React, { useState, useEffect } from "react";
import { UseSpotifyToken } from "../hooks/UseSpotifyToken";

import { faPlayCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tracks from "../components/Tracks";

import "./Favorites.css";

function Favorites() {
  const token = UseSpotifyToken();
  const [items, setItems] = useState(null);
  const [ids, setIds] = useState(null);
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
        setIds(data);
      });
  }, []);

  useEffect(() => {
    if (token && ids) {
      fetch(`https://api.spotify.com/v1/tracks?ids=${ids.join()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setItems(data);
          setLoading(false);
        });
    }
  }, [token, ids]);

  return (
    <div className="favorites">
      {isLoading ? (
        <div className="favorites__loader"></div>
      ) : (
        <div className="favorites__main">
          <div className="favorites__main__header">
            <h2>Favorites</h2>
            <p>
              The following is a list of your favorite songs from various
              artists.
              <br></br>
              Click the <FontAwesomeIcon icon={faPlayCircle} /> icon to{" "}
              <strong>remove</strong> a song from your list.
            </p>
          </div>
          <br></br>
          <br></br>
          {items.tracks && (
            <div className="favorites__main__tracks">
              {items.tracks.map((track) => (
                <Tracks
                  key={track.id}
                  id={track.id}
                  artist={track.artists[0]}
                  album={track.album}
                  name={track.name}
                  duration={track.duration_ms}
                  prevUrl={track.preview_url}
                  icon="remove"
                ></Tracks>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Favorites;
