import React, { Component } from "react";
import * as actionCreators from "../store/actions";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
// import "react-notifications/lib/notifications.css";
import SideNav from "../../src/components/Navigation/SideNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusSquare,
  faUser,
  faUsers
} from "@fortawesome/free-solid-svg-icons";

class MessagesForm extends Component {
  timer = 0;
  state = {
    message: ""
  };

  messagesEnd = React.createRef();

  componentDidMount() {
    this.scrollToBottom();

    if (this.props.user) {
      this.props.onFetchChannels();
      this.props.onfetchUserList();
      this.props.onFetchChannelMessage(this.props.match.params.channelID);
      this.FetchMessagesByTimeStamp();
    }

    // call once
  }
  componentDidUpdate(prevState) {
    this.scrollToBottom();
    if (prevState.messages !== this.props.messages) {
      this.props.onFetchChannelMessage(this.props.match.params.channelID);
    }
    if (
      prevState.match.params.channelID !== this.props.match.params.channelID
    ) {
      // this.props.onFetchChannelMessage(this.props.match.params.channelID);
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
  scrollToBottom = () => {
    this.messagesEnd.current.scrollIntoView({ behavior: "smooth" });
  };
  render() {
    const channel = this.props.channels.find(
      channel => channel.id === +this.props.match.params.channelID
    );

    const UserList = this.props.userList.filter(user =>
      channel.members.includes(user.id)
    );
    console.log(channel);

    const errors = this.props.errors;
    if (!this.props.user) return <Redirect to="/" />;
    const messages = this.props.messages.map(message => {
      return (
        <div className="ml-3 mr-3">
          {this.props.user.username === message.username ? (
            <div className="float-right  ">
              <div
                key={message.id}
                className="  ml-5  mt-3  pl-1 text-right float-right   msg_b"
                style={{ width: 400, height: 50 }}
              >
                <p>
                  <span>{message.message}</span>{" "}
                </p>{" "}
              </div>
            </div>
          ) : (
            <div
              className="collection-item  bg-secondary  text-light ml-5 mt-4 float-left  msg_a"
              style={{ width: 400, height: 80 }}
            >
              <span className="title">{message.username}</span>
              <p>
                <br />
                <span>{message.message}</span>
              </p>
            </div>
          )}
        </div>
      );
    });

    return (
      <div>
        <div id="mySidenav mt-5" className="sidenav">
          <br />
          <ul
            className=" pb-3 text-light"
            style={{ borderBottom: "10px solid white" }}
          >
            <li>
              <FontAwesomeIcon
                className="fa-2x mt-5 ml-3 mr-2 "
                icon={faUsers}
              />
              <span style={{ fontSize: 20 }}>Members:</span>
            </li>
          </ul>

          <br />

          {UserList.map(user => (
            <ul className=" ml-2 ">
              <li
                className="text-light p-1"
                style={{
                  borderTopLeftRadius: 70,
                  borderBottomLeftRadius: 70,
                  fontFamily: "monospace",
                  fontSize: 18,

                  borderBottom: "10px solid white"
                }}
              >
                {" "}
                <FontAwesomeIcon
                  icon={faUser}
                  className="fa-2x mt-1 ml-1 text-success "
                />{" "}
                {user.username}
              </li>
            </ul>
          ))}
        </div>

        <span onclick="openNav()">open</span>

        <div id="main bg-light " style={{ height: 300 }}>
          <div className="bg-light text-dark" style={{ height: 70 }}>
            <h3
              className="text-dark m-5 pt-3"
              style={{ paddingLeft: 600, fontFamily: "OCR A Std, monospace" }}
            >
              Welcome {this.props.user.username} to the
              {channel.name}
            </h3>
          </div>
          <div
            className="collection bg-light container mr-5"
            style={{
              marginLeft: 400,
              width: 950,
              backgroundColor: "lightgrey",
              WebkitBorderBottomLeftRadius: 50,
              WebkitBorderBottomRightRadius: 50
            }}
          >
            {messages}
          </div>
          <div ref={this.messagesEnd} />
          <footer className="teal bg-secondary" style={{ marginLeft: 190 }}>
            {channel && channel.members.includes(this.props.user.user_id) ? (
              <form className="container" onSubmit={this.submitHandler}>
                {!!errors.length && (
                  <div className="alert alert-danger" role="alert">
                    {errors.map(error => (
                      <p key={error}>{error}</p>
                    ))}
                  </div>
                )}
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
                      <img
                        src="//robohash.org/503483?set=set2&bgset=bg2&size=70x70"
                        alt="ChannelForm"
                      />
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
            ) : (
              <div className="p-4" style={{ marginLeft: 400 }}>
                <button
                  className="btn-danger p-1 m-5"
                  onClick={() => this.props.onjoinChannel(channel.id)}
                >
                  <FontAwesomeIcon
                    className="fa-1x ml-1 "
                    icon={faPlusSquare}
                  />
                  Join
                </button>
              </div>
            )}
          </footer>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    errors: state.errors.errors,
    user: state.auth.user,
    messages: state.messages.channel_Messages,
    userList: state.messages.User_List,
    channels: state.channels.channels
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

    onFetchChannels: () => dispatch(actionCreators.fetchChannels()),

    onjoinChannel: channelID => dispatch(actionCreators.joinChannel(channelID)),

    onfetchUserList: channelID =>
      dispatch(actionCreators.fetchUserList(channelID)),

    resetErrors: () => dispatch(actionCreators.resetErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagesForm);
