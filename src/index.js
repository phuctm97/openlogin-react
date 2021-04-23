import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// To start measuring performance in your app, pass a function to log results, e.g. reportWebVitals(console.log),
// or send to an analytics endpoint. See: https://bit.ly/CRA-vitals.
reportWebVitals();
