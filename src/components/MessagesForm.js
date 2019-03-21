import React, { Component } from "react";
import * as actionCreators from "../store/actions";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
// import "react-notifications/lib/notifications.css";
import SideNav from "../../src/components/Navigation/SideNav";

class MessagesForm extends Component {
  timer = 0;
  state = {
    message: ""
  };
  // openNav = () => {
  //   document.getElementById("mySidenav").style.width = "250px";
  //   document.getElementById("main").style.marginLeft = "250px";
  //   document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  // };

  // /* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
  // closeNav = () => {
  //   document.getElementById("mySidenav").style.width = "0";
  //   document.getElementById("main").style.marginLeft = "0";
  //   document.body.style.backgroundColor = "white";
  // };
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
      // this.props.onFetchChannels();
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
    const channel = this.props.channels.find(
      channel => channel.id === +this.props.match.params.channelID
    );

    const errors = this.props.errors;
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

    return (
      <div>
        <div id="mySidenav mt-5" className="sidenav">
          <br />
          <br />

          <a className="closebtn">&times;</a>
          {channel.members.map(member => (
            <h1 href="#">{member}</h1>
          ))}

          <a href="#">Clients</a>
          <a href="#">Contact</a>

          {/* <h1>
            <p>{}</p>
            ))}
          </h1> */}
        </div>

        <span onclick="openNav()">open</span>

        <div id="main">
          <ul
            className="collection mr-5"
            style={{ marginLeft: 160, marginTop: 50 }}
          >
            {messages}
          </ul>
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
              <div>
                <button
                  className="btn btn-danger"
                  onClick={() => this.props.onjoinChannel(channel.id)}
                >
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

    resetErrors: () => dispatch(actionCreators.resetErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagesForm);
