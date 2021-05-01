import React, { useState, useEffect } from "react";
import axios from "axios";
import { UseSpotifyToken } from "../hooks/UseSpotifyToken";
import "./NewReleases.css";

//const token = SpotifyToken();

function NewReleases() {
  const token = UseSpotifyToken();
  const [items, setItems] = useState(null);

  useEffect(() => {
    if (token) {
      fetch("https://api.spotify.com/v1/browse/new-releases", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setItems(result.albums.items);
          //console.log(token);
        });
    }
  }, [token]);
  return (
    <h1>
      {(console.log("token:", `${token}`), console.log("ittems:", items))}
    </h1>
  );
}

// class NewReleases extends React.Component {
//   state = {
//     items: [],
//     isLoading: true,
//   };

//   getNewReleases = async () => {
//     const {
//       data: {
//         albums: { items },
//       },
//     } = await axios.get("https://api.spotify.com/v1/browse/new-releases", {
//       headers: {
//         Authorization: `Bearer BQCd51FVSOlGIi0XtqqLVzUU88WpbEPUvmd3eQiDSJB3FaHDT8z_3usLLrJbC8xmXXaD4b-vF3-tuxmJ92k`,
//       },
//     });

//     this.setState({ items, isLoading: false });
//   };

//   componentDidMount() {
//     this.getNewReleases();
//   }

//   render() {
//     const { isLoading, items } = this.state;
//     console.log("here", items);
//     //console.log("token", token);
//     return <></>;
//   }
// }

export default NewReleases;
