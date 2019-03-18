import React, { Component } from "react";
import * as actionCreators from "../store/actions";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";

class MessagesForm extends Component {
  timer = 0;
  state = {
    message: ""
  };

  componentDidMount() {
    this.props.onFetchChannelMessage(this.props.match.params.channelID);
    this.FetchMessagesByTimeStamp();
    // call once
  }
  componentDidUpdate(prevState) {
    if (
      prevState.match.params.channelID !== this.props.match.params.channelID
    ) {
      this.props.onFetchChannelMessage(this.props.match.params.channelID);
      this.FetchMessagesByTimeStamp();
    }
  }
  ChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.onPostChannelMessage(
      this.state,
      this.props.match.params.channelID,
      this.resetForm
    );
  };

  FetchMessagesByTimeStamp = () => {
    console.log("in function");
    if (this.props.messages.length !== 0) {
      clearInterval(this.timer);
      let FetchedMessages = this.props.messages[this.props.messages.length - 1];
      this.timer = setInterval(
        () =>
          this.props.onrFetchMessagesByTimeStamp(
            this.props.match.params.channelID,
            FetchedMessages.timestamp
          ),
        3000
      );
    }
  };
  resetForm = () => this.setState({ message: "" });

  render() {
    if (!this.props.user) return <Redirect to="/" />;
    const messages = this.props.messages.map(message => {
      return (
        <li
          key={message.id}
          className="collection-item avatar ml-5 tabel-hover"
        >
          <img
            src="//robohash.org/107378?set=set2&bgset=bg2&size=70x70"
            alt="107378"
            className="circle"
          />
          <span className="title">{message.username}</span>
          <p>
            <i className="prefix mdi-action-alarm" />

            <span className="message-date">{message.timestamp}</span>

            <br />
            <span>{message.message}</span>
          </p>
        </li>
      );
    });
    const errors = this.props.errors;
    return (
      <div>
        <ul className="collection">{messages}</ul>
        <footer className="teal">
          <form className="container" onSubmit={this.submitHandler}>
            {/* {!!errors.length && (
              <div className="alert alert-danger" role="alert">
                {errors.map(error => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            )} */}
            <div className="row">
              <div className="input-field col s10">
                <i className="prefix mdi-communication-chat" />
                <input
                  type="text"
                  placeholder="Type your message"
                  name="message"
                  value={this.state.message}
                  onChange={this.ChangeHandler}
                />
                <span className="chip left">
                  <img src="//robohash.org/503483?set=set2&bgset=bg2&size=70x70" />
                  <span>{this.props.user.username}</span>
                </span>
              </div>
              <div className="input-field col s2">
                <button
                  type="submit"
                  className="waves-effect waves-light btn-floating btn-large"
                >
                  <i className="mdi-content-send" />
                </button>
              </div>
            </div>
          </form>
        </footer>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    errors: state.errors.errors,
    user: state.auth.user,
    messages: state.messages.channel_Messages
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onFetchChannelMessage: channelID =>
      dispatch(actionCreators.fetchChannelMessage(channelID)),

    onPostChannelMessage: (channelID, userData, reset) =>
      dispatch(actionCreators.postChannelMessage(channelID, userData, reset)),

    onrFetchMessagesByTimeStamp: (channelID, timestamp) =>
      dispatch(actionCreators.fetchMessagesByTimeStamp(channelID, timestamp)),

    resetErrors: () => dispatch(actionCreators.resetErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagesForm);
