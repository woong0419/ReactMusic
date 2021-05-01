import React, { useState, useEffect } from "react";
import { UseSpotifyToken } from "../hooks/UseSpotifyToken";
import Album from "../components/Album";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./NewReleases.css";

//const token = SpotifyToken();

function NewReleases() {
  const token = UseSpotifyToken();
  const [items, setItems] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetch("https://api.spotify.com/v1/browse/new-releases", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setItems(result.albums.items);
          setLoading(false);
        });
    }
  }, [token]);

  return (
    <div className="newreleases">
      {isLoading ? (
        <div className="main__loader"></div>
      ) : (
        <div className="main">
          <div className="main__header">
            <h2 className="main__header__title">New Releases</h2>
            <p className="main__header__p">
              The following is a list of new releases.<br></br>
              Clisk the <strong>album cover</strong> or{" "}
              <strong>artist name</strong> for more information.
            </p>
            <br></br>
          </div>
          {console.log(items)}
          <div className="main__albums">
            {items.map((album) => (
              <Album
                key={album.id}
                name={album.name}
                id={album.id}
                releaseDate={album.release_date}
                totalTrack={album.total_tracks}
                artist={album.artists}
                imageUrl={album.images[0].url}
              ></Album>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default NewReleases;
