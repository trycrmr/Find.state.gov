import { Route, IndexRoute } from "react-router"
import React from "react"

// Main Entry
import App from "./containers/App"

//Redux DUMB views
import error404 from "./components/404"

// Redux SMART views
// requiers containers (data fetching, dynamic data)
import HomeView from "./containers/Home"
import VisualizeView from "./containers/Visualize"
import AuthView from "./containers/Auth"
import DashView from "./containers/Dashboard"


export default (
  <Route name="app" path="/" component={App}>
  		<IndexRoute component={HomeView}/>
		<Route path="home" component={HomeView} />
		<Route path="visualize" component={VisualizeView} />
		<Route path="auth" component={AuthView} />
		<Route path="dashboard" component={DashView} />
<Route path="*" component={error404}/>
  </Route>
);
