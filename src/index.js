import React from "react";
import ReactDOM from "react-dom";
import Raven from "raven-js";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import App from "./App";
import { Raven_conf, Version } from "./config/constants";
// Raven.config(Raven_conf, {
//   release: Version
// }).install();
const GlobalStyle = createGlobalStyle`
html,body{
  margin:0;
  padding:0;  
  position:relative;
  height:100%;
  width:100%;
}
#root{
  padding:0;
  margin:0;
  display:flex;
  height:100%;
  width:100%;
  font-family:monospace;
}
input[type="submit"] {
      padding: 5px 15px;
      background: #ccc;
      border: 0 none;
      cursor: pointer;
      -webkit-border-radius: 5px;
      border-radius: 5px;
    }
    a{
      text-decoration:none;
      color:inherit;
      outline:none;
    }
`;
Raven.context(() => {
  ReactDOM.render(
    <>
      <GlobalStyle />
      <App />
    </>,
    document.getElementById("root")
  );
});
