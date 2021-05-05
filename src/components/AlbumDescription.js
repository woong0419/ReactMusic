import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./AlbumDescription.css";
import moment, { relativeTimeRounding } from "moment";

function AlbumDescription({
  imageUrl,
  label,
  releaseDate,
  totalTrack,
  popularity,
  artist,
  copyrights,
}) {
  return (
    <div className="albumdesc">
      <div className="albumdesc__content">
        <img className="albumdesc__content__cover" src={imageUrl}></img>
        <div className="albumdesc__content__content">
          <div className="albumdesc__content__content__label">
            <strong>Record Label: </strong>
            {label}
          </div>
          <div className="albumdesc__content__content__releasedate">
            <strong>Release Date: </strong>
            {moment(releaseDate).format("M/DD/YYYY")}
          </div>
          <br></br>
          <div className="albumdesc__content__content__tracks">
            <strong>Tracks: </strong>
            {totalTrack}
          </div>
          <div className="albumdesc__content__content__popularity">
            <strong>Popularity: </strong>
            {popularity}
          </div>
          <br></br>
          <ul className="albumdesc__content__content__artists">
            {artist.map((artists) => (
              <Link to={`/artist/${artists.id}`}>
                <li
                  key={artists.id}
                  className="albumdesc__content__content__artists__artist"
                >
                  <span>{artists.name}</span>
                </li>
              </Link>
            ))}
          </ul>
          <br></br>
          <ul className="albumdesc__content__content__copyrights">
            {copyrights.map((copyrights) => (
              <li className="albumdesc__content__content__copyrights__copyright">
                <span>{copyrights.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

AlbumDescription.prototype = {
  imageUrl: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  totalTrack: PropTypes.number.isRequired,
  popularity: PropTypes.number.isRequired,
  artist: PropTypes.arrayOf(PropTypes.object),
  copyrights: PropTypes.arrayOf(PropTypes.object),
};

export default AlbumDescription;
