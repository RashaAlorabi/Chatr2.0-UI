import React, { Component } from "react";
import { connect } from "react-redux";

// Actions
import * as actionCreators from "../store/actions";

class ChannelForm extends Component {
  state = {
    name: "",
    owner: "",
    image_url: ""
  };

  componentWillUnmount() {
    if (this.props.errors.length) this.props.resetErrors();
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    e.preventDefault();
    this.props.createChannels(this.state, this.props.history);
  };

  render() {
    const { name, owner, image_url } = this.state;
    const errors = this.props.errors;
    return (
      <div className="mt-5 p-2 ml-5">
        {this.props.user && (
          <form onSubmit={this.submitHandler}>
            {!!errors.length && (
              <div className="alert alert-danger" role="alert">
                {errors.map(error => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            )}
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="name"
                name="name"
                value={name}
                onChange={this.changeHandler}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="owner"
                name="owner"
                // value={owner}
                value={this.props.user.username}
                onChange={this.changeHandler}
                disabled
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="image_url"
                name="image_url"
                value={image_url}
                onChange={this.changeHandler}
              />
            </div>
            <input className="btn btn-primary" type="submit" />
          </form>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.errors.errors,
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => ({
  createChannels: (userData, history) =>
    dispatch(actionCreators.createChannels(userData, history)), //pass state
  resetErrors: () => dispatch(actionCreators.resetErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelForm);
