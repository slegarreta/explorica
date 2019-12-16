import React from "react";
import "./App.css";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <Link to="/">
        <h3>EXPLORICA</h3>
      </Link>
      <ul className="nav-links">
        <Link to="/Search">
          <li>Search</li>
        </Link>
        <Link to="/Favorites">
          <li>Favorites</li>
        </Link>
      </ul>
    </nav>
  );
}

export default Nav;
