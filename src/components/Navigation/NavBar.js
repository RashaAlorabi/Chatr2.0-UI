import React, { Component } from "react";
import { Link } from "react-router-dom";

// Components
import SideNav from "./SideNav";
import AuthButton from "./AuthButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";

class NavBar extends Component {
  render() {
    return (
      <nav
        className="navbar navbar-expand-lg bg-light fixed-top text-light"
        id="mainNav"
      >
        <i className="fas fa-comments" />
        <Link
          className="navbar-brand 
        "
          to="/welcome"
        >
          <FontAwesomeIcon icon={faComments} /> CODERSCHAT
        </Link>
        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* <SideNav /> */}
        <AuthButton />
      </nav>
    );
  }
}

export default NavBar;
