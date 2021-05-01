import React from "react";
import Moment from "moment";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./Album.css";
import moment from "moment";

function Album({ name, id, releaseDate, totalTrack, artist, imageUrl }) {
  return (
    <div className="album">
      <div className="album__content">
        <div className="album__content__header">
          <div className="album__content__header__title">{name}</div>
          <div className="album__content__header__status">New Release</div>
        </div>
        <Link to={`/album/${id}`}>
          <img className="album__content__cover" src={imageUrl}></img>
        </Link>
        <div className="album__content__releaseDate">
          <strong>Release Date: </strong>
          {moment(releaseDate).format("M/DD/YYYY")}
        </div>
        <div className="album__content__tracks">
          <strong>Tracks: </strong>
          {totalTrack}
        </div>
        <br></br>
        <ul className="album__content__artists">
          {artist.map((artists) => (
            <Link to={`/artist/${artists.id}`}>
              <li key={artists.id} className="album__content__artists__artist">
                <span>{artists.name}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

Album.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  totalTrack: PropTypes.number.isRequired,
  artist: PropTypes.arrayOf(PropTypes.object),
  imageUrl: PropTypes.string.isRequired,
};

export default Album;
