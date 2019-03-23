import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faSignInAlt,
  faUserPlus,
  faUserCircle,
  faListUl
} from "@fortawesome/free-solid-svg-icons";

// Actions
import * as actionCreators from "../../store/actions";

class AuthButton extends Component {
  render() {
    // const { user } = this.props;
    // let username;
    // if (this.props.user) {
    //   username = { username: this.props.user.username };
    // }
    let buttons;
    if (!this.props.user) {
      buttons = [
        <li key="loginButton" className="nav-item  ">
          <Link to="/login" className="nav-link text-primary">
            <FontAwesomeIcon icon={faSignInAlt} /> Login
          </Link>
        </li>,
        <li key="signupButton" className="nav-item  ">
          <Link to="/signup" className="nav-link text-primary">
            <FontAwesomeIcon icon={faUserPlus} /> Signup
          </Link>
        </li>
      ];
    } else {
      buttons = (
        <div>
          <li />
          <li className="nav-item float-left">
            <span className="float-left">
              <Link to="/private" className="text-primary">
                <FontAwesomeIcon icon={faListUl} /> Channels
              </Link>
            </span>
            <span
              className="nav-item text-danger float-left "
              onClick={this.props.logout}
            >
              <FontAwesomeIcon icon={faUserCircle} />{" "}
              <span className=" text-primary mr-3">
                {this.props.user.username}
              </span>
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </span>
          </li>
        </div>
      );
    }

    return (
      <ul className="navbar-nav ml-auto text-light">
        {/* <span className="navbar-text">{this.props.user.username}</span> */}
        {buttons}
      </ul>
    );
  }
}
const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actionCreators.logout())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthButton);
