import React, { useState, useEffect } from "react";
import { UseSpotifyToken } from "../hooks/UseSpotifyToken";
import Album from "../components/Album";
import "./SearchResult.css";

function SearchResult() {
  const token = UseSpotifyToken();
  const searchString = new URLSearchParams(window.location.search).get("q");
  const [items, setItems] = useState("");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (token && searchString.length > 0) {
      fetch(
        `https://api.spotify.com/v1/search?q=${searchString}&type=artist&limit=50`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => res.json())
        .then((result) => {
          setItems(result.artists.items.filter((e) => e.images.length > 0));
          setLoading(false);
        });
    }
  }, [token, searchString]);

  return (
    <div className="search">
      {isLoading ? (
        <div className="search__loader"></div>
      ) : (
        <div className="search__main">
          <div className="search__main__header">
            <h2 className="search__main__header__title">
              Results For: "{`${searchString}`}"
            </h2>
            <p className="search__main__header__p">
              The following is a list of artists matching the query.
              <br></br>
              Click the <strong>artist image</strong> for more information.
            </p>
            <br></br>
          </div>
          <div className="search__main__albums">
            {items.map((artist) => (
              <Album
                key={artist.id}
                name={artist.name}
                id={artist.id}
                imageUrl={artist.images[0].url}
                followers={artist.followers.total}
                popularity={artist.popularity}
              ></Album>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchResult;
