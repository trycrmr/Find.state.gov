import { Route } from "react-router";
import React from "react";

import App from "./containers/App";

//Redux Dumb
import HomePage from "./components/Home";
import error404 from "./components/404";

// Redux Smart
// requiers containers
import DataStoryView from "./containers/DataStoryView";

export default (
  <Route name="app" path="/" component={App}>
      <Route path="home" component={HomePage} />
      <Route path="datastory" component={DataStoryView} />
      <Route path="*" component={error404}/>
  </Route>
);
