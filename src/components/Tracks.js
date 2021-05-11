import React from "react";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import { faPlayCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Tracks.css";

function Tracks({
  id,
  trackNumber,
  name,
  duration,
  prevUrl,
  artist,
  album,
  icon,
}) {
  const userToken = localStorage.getItem("access_token");

  const handleRemove = () => {
    fetch(
      `https://gentle-fortress-01681.herokuapp.com/api/user/favourites/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `JWT ${userToken}`,
        },
      }
    );
  };
  const handleAdd = () => {
    fetch(
      `https://gentle-fortress-01681.herokuapp.com/api/user/favourites/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `JWT ${userToken}`,
        },
      }
    );
  };

  return (
    <div className="tracks">
      {icon === "remove" && (
        <div onClick={handleRemove} className="tracks__icon">
          <FontAwesomeIcon icon={faPlayCircle} />
        </div>
      )}
      {icon === "add" && (
        <div onClick={handleAdd} className="tracks__icon">
          <FontAwesomeIcon icon={faPlayCircle} />
        </div>
      )}

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
  icon: PropTypes.string.isRequired,
};

export default Tracks;
