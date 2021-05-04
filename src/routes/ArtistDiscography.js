import React, { useState, useEffect } from "react";
import { UseSpotifyToken } from "../hooks/UseSpotifyToken";
import Release from "../components/Release";

import "./ArtistDiscography.css";

function ArtistDiscography({ match }) {
  const token = UseSpotifyToken();
  const [items, setItems] = useState(null);
  const [artist, setArtist] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isLoadingA, setLoadingA] = useState(true);

  useEffect(() => {
    if (token && match.params.id) {
      fetch(
        `https://api.spotify.com/v1/artists/${match.params.id}/albums?include_groups=album,single&limit=50`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setItems(
            data.items
              .map((e) => e["name"])
              .map((e, i, org) => org.indexOf(e) === i && i)
              .filter((obj) => data.items[obj])
              .map((e) => data.items[e])
          );
          setLoading(false);
        });
    }
  }, [token, match.params.id]);

  useEffect(() => {
    if (token && match.params.id && items) {
      fetch(`https://api.spotify.com/v1/artists/${match.params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setArtist(data);
          setLoadingA(false);
        });
    }
  }, [token, match.params.id, items]);

  return (
    <div className="discography">
      {isLoadingA ? (
        <div className="discography__loader"></div>
      ) : (
        <div className="discography__main">
          <div className="discography__main__header">
            <h2 className="discography__main__header__title">{artist.name}</h2>
            <p className="discography__main__header__p">
              Full discography for {artist.name}.<br></br>
              Click the <strong>album cover </strong>
              for more information.
            </p>
            <br></br>
            <div
              className="discography__main__header__cover"
              style={{
                background: `url(${artist.images[0].url}) no-repeat center center`,
                backgroundSize: "cover",
              }}
            ></div>
            <br></br>
            <h2 className="discography__main__header__title">
              Full Discography
            </h2>
          </div>
          <div className="discography__main__albums">
            {items.map((items) => (
              <Release
                key={items.id}
                name={items.name}
                id={items.id}
                releaseDate={items.release_date}
                totalTrack={items.total_tracks}
                imageUrl={items.images[0].url}
              ></Release>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ArtistDiscography;
