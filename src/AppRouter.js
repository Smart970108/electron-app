import React, { Component, useState, useEffect } from "react";
import { Router, Switch, Route } from "react-router-dom";
import firebase from "./config/firebase";
import AuthedRoute from "./AuthedRoute";
import LoginView from "./Screens/login";
import Home from "./Screens/home";
import New from "./Screens/new";
import Snip from "./Screens/snip";
// import NotFound from './views/404View';
// import { Create, ForgotPassword, Login, ResetPassword } from './views/auth-views';
// import { _getAllData } from "./api/localstorage";

export default function AppRouter(props) {
  const [firebaseinitialized, setFirebaseinitialized] = useState(false);
  useEffect(() => {
    firebase.isInitialized().then(val => {
      setFirebaseinitialized(val);
    });
  });
  return firebaseinitialized !== false ? (
    <Router history={props.history}>
      <Switch>
        <AuthedRoute component={Home} exact path="/" />
        <AuthedRoute component={New} path="/new" />
        <AuthedRoute component={Snip} path="/new" />
        <Route component={LoginView} path="/login" />
      </Switch>
    </Router>
  ) : (
    <div>loading...</div>
  );
}
