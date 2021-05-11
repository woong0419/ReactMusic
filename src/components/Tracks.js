import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { faPlayCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Tracks.css";

function Tracks({ id, trackNumber, name, duration, prevUrl, artist, album }) {
  return (
    <div className="tracks">
      <div className="tracks__contents">
        <div className="tracks__contents__name">
          {trackNumber}: {name} - {Math.floor((duration / (1000 * 60)) % 60)}:
          {Math.floor((duration / 1000) % 60)}
        </div>
        {artist && (
          <div className="tracks__content__artist">
            Artist: <Link to={`/artist/${artist.id}`}>{artist.name}</Link>
          </div>
        )}
        {album && (
          <div className="tracks__content__album">
            Album: <Link to={`/album/${album.id}`}>{album.name}</Link>
          </div>
        )}
        <br></br>
        <div className="tracks__contents__prev">
          {prevUrl ? <audio controls src={`${prevUrl}`}></audio> : <div></div>}
        </div>
      </div>
    </div>
  );
}

Tracks.prototype = {
  id: PropTypes.string.isRequired,
  trackNumber: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  prevUrl: PropTypes.string.isRequired,
  artist: PropTypes.object.isRequired,
  album: PropTypes.object.isRequired,
};

export default Tracks;
