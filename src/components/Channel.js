import React, { Component } from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import * as actionCreators from "../store/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faUsers,
  faPlusSquare,
  faCheckCircle
} from "@fortawesome/free-solid-svg-icons";

class Channel extends Component {
  state = {
    // members: this.props.channel.members,
    messages: "",
    members: 0
  };
  // componentDidUpdate(prevProps) {
  //   if (
  //     prevProps.channel.member_count !== this.props.channelMember.member_count
  //   ) {
  //     this.setState({ members: this.props.channelMember.member_count });
  //   }
  // }
  // componentDidMount = () => {
  //   console.log(this.props.channelMember);
  //   if(this.props.channelMember) this.setState({ members: })
  // };
  render() {
    let channel = this.props.channel;
    //if (this.props.channelMember) channel = this.props.channelMember;

    // const onJoinChannel = channel => {
    //   this.props.onjoinChannel(channel);
    //   this.setState({ messages: "Successfuly joind  channel" });
    // };

    return (
      <div className="mt-5">
        {/* <div className="col-md-4  float-left ">
          <div className="card card-chart ">
            <div className="card-header card-header-success">
              <div className="ct-chart" id="dailySalesChart" />
              
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
     */}

        <div className="card w-50 h-2 col-md-5 mt-5 ml-5 mr-5 rounded-pill rounded-0  float-left">
          {/* <div class="alert alert-success" role="alert">
            {this.state.messages}
          </div> */}
          <div className="row no-gutters">
            <div className="col-md-2 ">
              <img
                src="https://cdn1.iconfinder.com/data/icons/designer-skills/128/slack-512.png"
                className="card-img-top pt-3"
                alt="..."
              />
            </div>
            <div className="col-md-6">
              <div className="card-body">
                <h5 className="card-title pt-4">{channel.name}</h5>
                <div className="progress">
                  <div
                    className="progress-bar progress-bar-striped bg-warning"
                    role="progressbar"
                    style={{ width: 750 }}
                    aria-valuenow="75"
                    aria-valuemin="0"
                    aria-valuemax="75"
                  />
                </div>
                <p className="card-text">
                  <small className="text-muted"> {channel.channel_date}</small>
                </p>
              </div>
            </div>
            <div
              className=" text-white bg-danger rounded-bottom "
              style={{ maxWidth: 120, height: 100 }}
            >
              <FontAwesomeIcon className="fa-2x mt-2 " icon={faUsers} />
              <h3
                className="text-center mt-2"
                style={{ fontFamily: "monospace" }}
              >
                {" "}
                {channel.member_count}
              </h3>
              <p
                className="text-center text-light "
                style={{ fontSize: 8, fontFamily: "monospace" }}
              >
                Members
              </p>
            </div>
            {channel.members.includes(this.props.user.user_id) ? (
              <div
                className=" text-white  ml-2 bg-success rounded-bottom  "
                style={{ maxWidth: 130, height: 80 }}
              >
                <FontAwesomeIcon
                  className="fa-2x mt-1 ml-1 "
                  icon={faCheckCircle}
                />
                <h6
                  className="text-center mt-4"
                  style={{ fontFamily: "monospace" }}
                >
                  Joind
                </h6>
              </div>
            ) : (
              <div
                className=" text-white  ml-2 bg-success rounded-bottom  "
                onClick={() => this.props.onjoinChannel(channel.id)}
                style={{ maxWidth: 130, height: 80 }}
              >
                <FontAwesomeIcon
                  className="fa-2x mt-1 ml-1 "
                  icon={faPlusSquare}
                />

                <h6
                  className="text-center mt-4"
                  style={{ fontFamily: "monospace" }}
                >
                  Join
                </h6>
              </div>
            )}

            <Link className="" to={`/channels/${channel.id}`}>
              <div
                className=" text-white ml-2 bg-warning rounded-bottom "
                style={{ maxWidth: 130, height: 40 }}
              >
                <FontAwesomeIcon className="fa-2x mt-2 " icon={faEye} />
              </div>
            </Link>
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
    onjoinChannel: channelID => dispatch(actionCreators.joinChannel(channelID)),
    onFetchChannels: () => dispatch(actionCreators.fetchChannels())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channel);
