import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faPlusCircle
} from "@fortawesome/free-solid-svg-icons";

// Components
// import ChannelNavLink from "./ChannelNavLink";
// import SuperSecretPage from "../SuperSecretPage";

class SideNav extends React.Component {
  state = { collapsed: false };

  // componentDidMount() {
  //   if (this.props.user) {
  //     this.props.onFetchChannels();
  //   }
  // }
  // componentDidUpdate(prevState) {
  //   if (prevState.user !== this.props.user) {
  //     if (this.props.user) {
  //       this.props.onFetchChannels();
  //     }
  //   }
  // }

  render() {
    // const channelLinks = this.props.channels.map(channel => (
    //   <ChannelNavLink key={channel.name} channel={channel} />
    //   /* <SuperSecretPage key={channel.name} channel={channel} /> */
    // ));
    return (
      <div className="smooth-scroll">
        {this.props.user && (
          <ul className="navbar-nav navbar-sidenav " id="exampleAccordion">
            <li
              className="nav-item"
              data-toggle="tooltip"
              data-placement="right"
            >
              <Link className="nav-link heading" to="/createChannel">
                <span className="nav-link-text mr-2">Channels</span>
                <FontAwesomeIcon icon={faPlusCircle} />
              </Link>
            </li>
            {/* {channelLinks} */}
          </ul>
        )}

        <ul className="navbar-nav sidenav-toggler">
          <li className="nav-item">
            <span
              className="nav-link text-center"
              id="sidenavToggler"
              onClick={() =>
                this.setState(prevState => ({
                  collapsed: !prevState.collapsed
                }))
              }
            >
              <FontAwesomeIcon
                icon={this.state.collapsed ? faAngleRight : faAngleLeft}
              />
            </span>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  channels: state.channels.channels
});

const mapDispatchToProps = dispatch => {
  // return {
  //   onFetchChannels: () => dispatch(actionCreators.fetchChannels())
  // };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideNav);
