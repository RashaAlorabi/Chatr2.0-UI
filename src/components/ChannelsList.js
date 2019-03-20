import React, { Component } from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import * as actionCreators from "../store/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

class ChannelList extends Component {
  render() {
    const channel = this.props.channel;
    return (
      <div>
        <div className="col-md-4  float-left">
          <div className="card card-chart ">
            <div className="card-header card-header-success">
              <div className="ct-chart" id="dailySalesChart" />
              <img
                src="data:image/png;base64,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"
                class="card-img-top"
                alt="..."
              />
            </div>
            <div className="card-body">
              <h4 className="card-title">{channel.name}</h4>
              {channel.members.includes(this.props.user.user_id) ? (
                <div>
                  <Link className="nav-link" to={`/channels/${channel.id}`}>
                    <button className="btn btn-danger pr-4 btn-block ">
                      <FontAwesomeIcon icon={faEye} />
                      View
                    </button>
                  </Link>
                  <div className="alert-success">
                    You Already Joind un this channel
                  </div>
                </div>
              ) : (
                <div>
                  <Link className="nav-link" to={`/channels/${channel.id}`}>
                    <button className="btn btn-danger pr-4 btn-block ">
                      <FontAwesomeIcon icon={faEye} />
                      View
                    </button>
                  </Link>

                  <button
                    className="btn btn-danger pr-4 btn-block "
                    onClick={() => this.props.onjoinChannel(channel.id)}
                  >
                    <FontAwesomeIcon icon={faEye} />
                    Join
                  </button>
                </div>
              )}

              <p className="card-category">
                <span className="text-success">
                  <i className="fa fa-long-arrow-up" /> {channel.members.length}
                </span>{" "}
                Members
              </p>
            </div>

            <div className="card-footer">
              <div className="stats">
                <i className="material-icons">Date created:</i>{" "}
                {channel.channel_date}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onjoinChannel: channelID => dispatch(actionCreators.joinChannel(channelID))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelList);
