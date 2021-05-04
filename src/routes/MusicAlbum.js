import React, { useState, useEffect } from "react";
import AlbumDescription from "../components/AlbumDescription";
import { UseSpotifyToken } from "../hooks/UseSpotifyToken";

import "./MusicAlbum.css";

function MusicAlbum({ match }) {
  const token = UseSpotifyToken();
  const [items, setItems] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (token && match.params.id) {
      fetch(`https://api.spotify.com/v1/albums/${match.params.id}`, {
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
  }, [token, match.params.id]);

  return (
    <div className="music">
      {isLoading ? (
        <div className="music__loader"></div>
      ) : (
        <div className="music__main">
          <div className="music__main__header">
            <h2 className="music__main__header__title">{items.name}</h2>
            <p className="music__main__header__p">
              Full track listing for {items.name}.<br></br>
              Click the I icon to <strong>add </strong>a song to your favorites
              list.
            </p>
            <br></br>
            <div className="music__main__album">{console.log(items)}</div>
            <h2 className="music__main__header__title">Track Listing</h2>
            <br></br>
          </div>
        </div>
      )}
    </div>
  );
}

export default MusicAlbum;
