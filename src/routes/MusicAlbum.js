import React, { useState, useEffect } from "react";
import { UseSpotifyToken } from "../hooks/UseSpotifyToken";
import { faPlayCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AlbumDescription from "../components/AlbumDescription";
import Tracks from "../components/Tracks";

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
              Click the <FontAwesomeIcon icon={faPlayCircle} /> icon to{" "}
              <strong>add </strong>a song to your favorites list.
            </p>
            <br></br>
          </div>
          <div className="music__main__album">
            <AlbumDescription
              key={items.id}
              imageUrl={items.images[0].url}
              label={items.label}
              releaseDate={items.release_date}
              totalTrack={items.total_tracks}
              popularity={items.popularity}
              artist={items.artists}
              copyrights={items.copyrights}
            ></AlbumDescription>
          </div>
          <br></br>
          <br></br>
          <h2 className="music__main__header__title">Track Listing</h2>
          <br></br>
          <div className="music__main__tracks">
            {items.tracks.items.map((track) => (
              <Tracks
                key={track.id}
                id={track.id}
                trackNumber={track.track_number}
                name={track.name}
                duration={track.duration_ms}
                prevUrl={track.preview_url}
                icon="add"
              ></Tracks>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MusicAlbum;
