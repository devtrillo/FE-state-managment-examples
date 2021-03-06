import "./index.css";

import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { GlobalContextProvider } from "./store";

ReactDOM.render(
  <React.StrictMode>
    <GlobalContextProvider>
      <App />
    </GlobalContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
