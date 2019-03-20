import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actionCreators from "../store/actions";
import ChannelsList from "./ChannelsList";
import AddChannelCard from "./AddChannelCard";

class SuperSecretPage extends Component {
  componentDidMount() {
    if (this.props.user) {
      this.props.onFetchChannels();
    }
  }
  // componentDidUpdate(prevState) {
  //   if (prevState.user !== this.props.user) {
  //     if (this.props.user) {
  //       this.props.onFetchChannels();
  //     }
  //   }
  // }

  render() {
    const channelLinks = this.props.channels.map(channel => (
      <ChannelsList key={channel.name} channel={channel} />
    ));

    //   return (
    //     // <Link className="nav-link" to={`/channels/${channel.id}`}>
    //     <div className="card">
    //       {/* <img src="..." class="card-img-top" alt="..." /> */}
    //       <div className="card-body">
    //         <h5 className="card-title">{channel.name}</h5>
    //         <a
    //           href="#"
    //           className="btn btn-primary"
    //           onClick={() => this.props.onjoinChannel(channel.id)}
    //         >
    //           Join
    //         </a>
    //       </div>
    //     </div>
    //     // </Link>
    //   );
    // });

    return (
      // <NavLink className="nav-link" to={`/channels/${channel.id}`}>

      <div>
        <AddChannelCard />
        {channelLinks}
      </div>
      // </NavLink>
    );
  }
}
const mapStateToProps = state => ({
  user: state.auth.user,
  channels: state.channels.channels
});

const mapDispatchToProps = dispatch => {
  return {
    onFetchChannels: () => dispatch(actionCreators.fetchChannels()),
    onjoinChannel: channelID => dispatch(actionCreators.joinChannel(channelID))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuperSecretPage);
