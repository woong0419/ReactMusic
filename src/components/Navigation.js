import React, { useRef, useState, useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { Link, useHistory } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UseOutsideClick } from "../hooks/UseOutsideClick";
import jwt_decode from "jwt-decode";
import NewReleases from "../routes/NewReleases";
import SearchResult from "../routes/SearchResult";
import ArtistDiscography from "../routes/ArtistDiscography";
import MusicAlbum from "../routes/MusicAlbum";
import Login from "../routes/Login";
import Register from "../routes/Register";
import Favorites from "../routes/favorites";
import "./Navigation.css";

function Navigation() {
  const dropdownRef = useRef(null);
  const [isActive, setActive] = UseOutsideClick(dropdownRef, false);
  const [menuActive, setMenuActive] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [isLoading, setLoading] = useState(true);

  const [hasToken, setHasToken] = useState(false);
  const userToken = localStorage.getItem("access_token");
  const [decoded, setDecoded] = useState(null);
  // const decoded = jwt_decode(userToken);
  useEffect(() => {
    if (hasToken) {
      setDecoded(jwt_decode(userToken));
    }
  }, [hasToken]);

  useEffect(() => {
    if (userToken) {
      setHasToken(true);
    } else {
      setHasToken(false);
    }
    setLoading(false);
  }, [userToken]);

  let history = useHistory();

  const onClick = () => setActive(!isActive);
  const onClickMenu = () => setMenuActive(!menuActive);
  const onClickLogout = () => {
    localStorage.removeItem("access_token");
    sessionStorage.removeItem("token_expires");
    sessionStorage.removeItem("spotify_token");
    history.push("/login");
    window.location.reload();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search?q=${searchString}`);
    setSearchString("");
  };

  return (
    <>
      {!isLoading && (
        <div
          className={`container__main ${menuActive ? "active" : "inactive"}`}
        >
          <nav
            className={`nav__menu__drop ${menuActive ? "active" : "inactive"}`}
          >
            <ul>
              <li>
                <form
                  onSubmit={handleSubmit}
                  className="nav__menu__drop__search"
                >
                  <input
                    type="text"
                    id="header-search"
                    placeholder="Artist"
                    value={searchString}
                    onChange={(e) => setSearchString(e.target.value)}
                  />
                  <button type="submit" disabled={!searchString.trim().length}>
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </form>
              </li>
              <li>
                <Link to="/newreleases">
                  <FontAwesomeIcon icon={faMusic} />
                  <span>New Releases</span>
                </Link>
              </li>
              <li>
                <Link to="/favorites">
                  <FontAwesomeIcon icon={faHeart} />
                  <span>Favorites</span>
                </Link>
              </li>
              <li>
                <Link to="/about">
                  <FontAwesomeIcon icon={faInfoCircle} />
                  <span>About</span>
                </Link>
              </li>
            </ul>
          </nav>
          {hasToken ? (
            <Route
              path="/"
              exact={true}
              render={() => <Redirect to="/newreleases" />}
            />
          ) : (
            <Route path="/" render={() => <Redirect to="/login" />} />
          )}

          <Route path="/newreleases" component={NewReleases} />
          <Route path="/search" component={SearchResult} />
          <Route path="/favorites" component={Favorites} />
          <Route path="/album/:id" component={MusicAlbum} />
          <Route path="/artist/:id" component={ArtistDiscography} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />

          <div className="container__main__bottomspacer"></div>
        </div>
      )}

      <div className="nav">
        {hasToken && (
          <button onClick={onClickMenu} className="nav__menu">
            <FontAwesomeIcon icon={faBars} />
          </button>
        )}
        <div className="nav__page">React Music</div>
        <div className="nav__spacer"></div>
        {hasToken && (
          <button onClick={onClick} className="nav__user">
            <FontAwesomeIcon icon={faUser} />
            <span>{decoded && decoded.userName}</span>
          </button>
        )}

        <nav
          ref={dropdownRef}
          className={`nav__user__drop ${isActive ? "active" : "inactive"}`}
        >
          <ul>
            <li>
              <button onClick={onClickLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} />
                <span>Log Out</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Navigation;
