import React from "react";
import PropTypes from "prop-types";
import { faPlayCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Tracks.css";

function Tracks({ id, trackNumber, name, duration, prevUrl }) {
  return (
    <div className="tracks">
      <div className="tracks__icon">
        <FontAwesomeIcon icon={faPlayCircle} />
      </div>
      <div className="tracks__contents">
        <div className="tracks__contents__name">
          {trackNumber}: {name} - {Math.floor((duration / (1000 * 60)) % 60)}:
          {Math.floor((duration / 1000) % 60)}
          {console.log(id)}
        </div>
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
};

export default Tracks;
