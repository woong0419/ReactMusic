import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UseOutsideClick } from "../hooks/UseOutsideClick";

import "./Navigation.css";

function Navigation() {
  const dropdownRef = useRef(null);
  const [isActive, setActive] = UseOutsideClick(dropdownRef, false);
  const [menuActive, setMenuActive] = useState(false);
  const onClick = () => setActive(!isActive);
  const onClickMenu = () => setMenuActive(!menuActive);

  return (
    <>
      <nav className={`nav__menu__drop ${menuActive ? "active" : "inactive"}`}>
        <ul>
          <li>
            <a href="#">
              <span>Search</span>
            </a>
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
      <div className="nav">
        <button onClick={onClickMenu} className="nav__menu">
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div className="nav__page">React Music</div>
        <div className="nav__spacer"></div>
        <button onClick={onClick} className="nav__user">
          <FontAwesomeIcon icon={faUser} />
          <span>User</span>
        </button>
        <nav
          ref={dropdownRef}
          className={`nav__user__drop ${isActive ? "active" : "inactive"}`}
        >
          <ul>
            <li>
              <a href="#">
                <FontAwesomeIcon icon={faSignOutAlt} />
                <span>Log Out</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Navigation;
