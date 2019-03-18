import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// Scripts
import main from "./assets/js/main";

// Components
import NavBar from "./components/Navigation/NavBar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import Welcome from "./components/Welcome";
import RegistrationForm from "./components/RegistrationForm";
import SuperSecretPage from "./components/SuperSecretPage";
import ChannelForm from "./components/ChannelForm";
import MessagesForm from "./components/MessagesForm.js";
class App extends Component {
  componentDidMount() {
    main();
  }

  render() {
    return (
      <div className="content-wrapper">
        <NavBar />
        <Switch>
          <Route path="/welcome" component={Welcome} />
          <Route path="/(login|signup)" component={RegistrationForm} />
          <Route path="/createChannel" component={ChannelForm} />
          <Route
            path="/channels/:channelID/:timestamp?"
            component={MessagesForm}
          />
          <PrivateRoute path="/private" component={SuperSecretPage} />
          <Redirect to="/welcome" />
        </Switch>
        {/* <Footer /> */}
      </div>
    );
  }
}

export default App;
