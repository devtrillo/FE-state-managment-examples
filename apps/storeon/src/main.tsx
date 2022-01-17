import "./index.css";

import React from "react";
import ReactDOM from "react-dom";
import { StoreContext } from "storeon/react";

import App from "./App";
import { store } from "./store";

ReactDOM.render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
