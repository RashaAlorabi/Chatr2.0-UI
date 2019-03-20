import React, { Component } from "react";
import { Link } from "react-router-dom";

class Welcome extends Component {
  render() {
    return (
      <header className=" content-wrapper">
        <div className=" text-center my-auto z-1">
          {/* <em>You're gonna need to login to see the messages</em> */}
          {/* 
          <Link to="/login" className="btn btn-primary btn-lg">
            Login
          </Link> */}

          <div className="overlay z-0" />
        </div>
      </header>
    );
  }
}

export default Welcome;
