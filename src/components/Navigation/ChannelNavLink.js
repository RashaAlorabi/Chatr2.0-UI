import React, { Component } from "react";
import { NavLink } from "react-router-dom";
//import { connect } from "react-redux";
// FontAwesome
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import * as actionCreators from "../../store/actions";
import { connect } from "react-redux";

class ChannelNavLink extends Component {
  render() {
    import React, { Component } from "react";
    import { connect } from "react-redux";
    import { Link } from "react-router-dom";
    import * as actionCreators from "../store/actions";
    return (
      <NavLink className="nav-link" to={`/channels/${channel.id}`}>
        <div className="card" style="width: 18rem;">
          {/* <img src="..." class="card-img-top" alt="..." /> */}
          <div className="card-body">
            <h5 className="card-title">{channel.name}</h5>
            <a
              href="#"
              className="btn btn-primary"
              onClick={() => this.props.onjoinChannel(channel.id)}
            >
              Join
            </a>
          </div>
        </div>
      </NavLink>
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
