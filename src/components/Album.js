import React from "react";
import { Link, Route } from "react-router-dom";
import PropTypes from "prop-types";
import "./Album.css";
import ArtistDiscography from "../routes/ArtistDiscography";

function Album({ name, id, imageUrl, followers, popularity }) {
  return (
    <div className="album">
      <div className="album__content">
        <div className="album__header">
          <div className="album__content__header__title">{name}</div>
          <div className="album__content__header__status">Artist</div>
        </div>
        <Link to={`/artist/${id}`}>
          <img className="album__content__cover" src={imageUrl}></img>
        </Link>
        <div className="album__content__followers">
          <strong>Followers: </strong>
          {followers}
        </div>
        <div className="album__content__Popularity">
          <strong>Popularity: </strong>
          {popularity}
        </div>
      </div>
    </div>
  );
}

Album.prototype = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  followers: PropTypes.number.isRequired,
  popularity: PropTypes.number.isRequired,
};

export default Album;
