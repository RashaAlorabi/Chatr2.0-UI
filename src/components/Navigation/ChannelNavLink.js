import React, { Component } from "react";
import { NavLink } from "react-router-dom";
//import { connect } from "react-redux";
// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import * as actionCreators from "../../store/actions";
import { connect } from "react-redux";

class ChannelNavLink extends Component {
  render() {
    const { channel } = this.props;
    return (
      <li
        className="nav-item"
        data-toggle="tooltip"
        data-placement="right"
        title={channel.name}
      >
        <NavLink className="nav-link" to={`/channels/${channel.id}`}>
          <FontAwesomeIcon icon={faHashtag} />
          <span className="nav-link-text"> {channel.name}</span>
          <button
            className="btn btn-dark pl-5"
            onClick={() => this.props.onjoinChannel(channel.id)}
          >
            Join
          </button>
        </NavLink>
      </li>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onjoinChannel: channelID => dispatch(actionCreators.joinChannel(channelID))
  };
};
export default connect(
  null,
  mapDispatchToProps
)(ChannelNavLink);
