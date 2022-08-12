import { Redirect, Route, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";
// import firebase from "./config/firebase";
import { ThemeProvider } from "styled-components";

class AuthedRoute extends React.Component {
  constructor() {
    super();
    this.state = {
      uid: {},
      theme: {}
    };
  }
  componentDidMount() {
    var uid = localStorage.getItem("uid");
    // var theme = localStorage.getItem("theme");
    if (uid) {
      this.setState({ uid: uid });
    }
  }
  render() {
    const { component, ...rest } = this.props;
    const Component = component;
    return (
      <Route
        {...rest}
        render={props => {
          if (!this.state.uid) {
            return <Redirect to="/login" />;
          } else {
            return (
              <ThemeProvider theme={this.state.theme}>
                <Component {...props} />
              </ThemeProvider>
            );
          }
        }}
      />
    );
  }
}

AuthedRoute.defaultProps = {
  redirect: true,
  showLoader: true
};

AuthedRoute.propTypes = {
  component: PropTypes.elementType,
  redirect: PropTypes.bool,
  showLoader: PropTypes.bool,
  user: PropTypes.shape({})
};

export default withRouter(AuthedRoute);
