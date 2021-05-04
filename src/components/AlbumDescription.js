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
  artistId,
  artistName,
}) {
  return;
}

AlbumDescription.prototype = {
  imageUrl: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  totalTrack: PropTypes.number.isRequired,
  popularity: PropTypes.number.isRequired,
  artist: PropTypes.string.isRequired,
  copyrights: PropTypes.arrayOf(PropTypes.object),
  artistId: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
};

export default AlbumDescription;
