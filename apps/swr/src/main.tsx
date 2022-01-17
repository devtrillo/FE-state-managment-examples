import "./index.css";

import React from "react";
import ReactDOM from "react-dom";
import { SWRConfig, SWRConfiguration } from "swr";

import App from "./App";

const options: SWRConfiguration = {
  fetcher: (url) => fetch(url).then((res) => res.json()),
};

ReactDOM.render(
  <React.StrictMode>
    <SWRConfig value={options}>
      <App />
    </SWRConfig>
  </React.StrictMode>,
  document.getElementById("root")
);
