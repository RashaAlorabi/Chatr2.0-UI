import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faSignInAlt,
  faUserPlus,
  faUserCircle
} from "@fortawesome/free-solid-svg-icons";

// Actions
import * as actionCreators from "../store/actions";

class RegistationForm extends Component {
  state = {
    username: "",
    password: ""
  };
  componentWillUnmount() {
    if (this.props.errors.length) this.props.resetErrors();
  }
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    e.preventDefault();
    console.log("[RegistrationForm.js]", this.props.match.url.substring(1));
    this.props.loginAndSignup(
      this.state,
      this.props.history,
      this.props.match.url.substring(1)
    );
  };

  render() {
    const type = this.props.match.url.substring(1);
    const { username, password } = this.state;
    const errors = this.props.errors;
    return (
      // <div className="card col-6 mx-auto p-0" style={{ marginTop: 150 }}>
      //   <div className="card-body">
      //     <h5 className="card-title mb-4">
      //       {type === "login"
      //         ? "Login to send messages"
      //         : "Register an account"}
      //     </h5>
      //     <form onSubmit={this.submitHandler}>
      //       {!!errors.length && (
      //         <div className="alert alert-danger" role="alert">
      //           {errors.map(error => (
      //             <p key={error}>{error}</p>
      //           ))}
      //         </div>
      //       )}
      //       <div className="form-group">
      //         <input
      //           className="form-control"
      //           type="text"
      //           placeholder="Username"
      //           name="username"
      //           value={username}
      //           onChange={this.changeHandler}
      //         />
      //       </div>
      //       <div className="form-group">
      //         <input
      //           className="form-control"
      //           type="password"
      //           placeholder="Password"
      //           name="password"
      //           value={password}
      //           onChange={this.changeHandler}
      //         />
      //       </div>
      //       <input
      //         className="btn btn-primary"
      //         type="submit"
      //         value={type.replace(/^\w/, c => c.toUpperCase())}
      //       />
      //     </form>
      //   </div>
      //   <div className="card-footer">
      //     <Link
      //       to={type === "login" ? "/signup" : "/login"}
      //       className="btn btn-small btn-link"
      //     >
      //       {type === "login"
      //         ? "register an account"
      //         : "login with an existing account"}
      //     </Link>
      //   </div>
      // </div>
      <div className="gridcard col-6 mx-auto p-0" style={{ marginTop: 280 }}>
        <div id="login">
          <h2>
            <span className="fontawesome-lock" />

            {type === "login"
              ? "Login to send messages"
              : "Register an account"}
          </h2>

          <form onSubmit={this.submitHandler}>
            {!!errors.length && (
              <div className="alert alert-danger" role="alert">
                {errors.map(error => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            )}
            <fieldset>
              <p>
                <label for="email">Username:</label>
              </p>
              <p>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={username}
                  onChange={this.changeHandler}
                />
              </p>

              <p>
                <label for="password">Password</label>
              </p>
              <p>
                <input
                  className="form-control"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={this.changeHandler}
                />
              </p>

              <p>
                <input
                  className="btn"
                  type="submit"
                  value={type.replace(/^\w/, c => c.toUpperCase())}
                />
              </p>
              <Link
                to={type === "login" ? "/signup" : "/login"}
                className="text-danger"
              >
                {type === "login" ? (
                  <div className="">
                    <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                    Register An Account
                  </div>
                ) : (
                  <div>
                    <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                    Login with an existing account
                  </div>
                )}
              </Link>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    errors: state.errors.errors
  };
};

const mapDispatchToProps = dispatch => ({
  loginAndSignup: (userData, history, type) =>
    dispatch(actionCreators.loginAndSignup(userData, history, type)), //pass state
  resetErrors: () => dispatch(actionCreators.resetErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistationForm);
