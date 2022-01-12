import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { StoreContext } from "storeon/react";
import { store } from "./store";

ReactDOM.render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
