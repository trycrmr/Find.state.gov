import { Route } from "react-router";
import React from "react";

import App from "./containers/App";

//Redux DUMB views
import error404 from "./components/404";

// Redux SMART views
// requiers containers (data fetching, dynamic data)
import HomeView from "./containers/Home";
import VisualizeView from "./containers/Visualize";


export default (
  <Route name="app" path="/" component={App}>
      <Route path="home" component={HomeView} />
      <Route path="visualize" component={VisualizeView} />
      <Route path="*" component={error404}/>
  </Route>
);