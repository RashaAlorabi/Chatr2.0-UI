import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
//import { connect } from "react-redux";
//import * as actionCreators from "./store/actions";
// Scripts
import main from "./assets/js/main";

// Components
import NavBar from "./components/Navigation/NavBar";
// import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import Welcome from "./components/Welcome";
import RegistrationForm from "./components/RegistrationForm";
import SuperSecretPage from "./components/SuperSecretPage";
import ChannelForm from "./components/ChannelForm";
import MessagesForm from "./components/MessagesForm.js";
// import { connect } from "react-redux";

import * as actionCreators from "./store/actions";

class App extends Component {
  componentDidMount() {
    main();
    // this.props.onFetchChannels();
  }

  render() {
    return (
      <div className="">
        <NavBar />
        <Switch>
          <Route path="/welcome" component={Welcome} />
          <Route path="/(login|signup)" component={RegistrationForm} />
          <Route path="/createChannel" component={ChannelForm} />
          <Route path="/channels/:channelID/" component={MessagesForm} />

          <PrivateRoute path="/private" component={SuperSecretPage} />
          <Redirect to="/welcome" />
        </Switch>
        {/* <Footer /> */}
      </div>
    );
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     onFetchChannels: () => dispatch(actionCreators.fetchChannels())
//     // onjoinChannel: channelID => dispatch(actionCreators.joinChannel(channelID))
//   };
// };
export default App;
