import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class Header extends Component {

  render() {

	let jwt = localStorage.getItem('token');
	var loggedIn;
	if (!jwt || jwt === "undefined") {
		loggedIn = false
	}else {
		loggedIn = true
	}

    return (
		<div className="navbar navbar-default">
		  <div className="container">
		    <div className="navbar-header">
		      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
		        <span className="sr-only">Toggle navigation</span><span className="icon-bar"></span><span className="icon-bar"></span><span className="icon-bar"></span>
		      </button>
		       <Link to="home" className="navbar-brand">Find</Link>
		    </div>
		    <div className="collapse navbar-collapse">
		      <ul className="nav navbar-nav">
		        <li>
		          <Link to="visualize">Build a Visualization</Link>
		        </li>
		        <li>
		          <Link to="explore">Explore</Link>
		        </li>
		      </ul>
		      <ul className="nav navbar-nav pull-right">
		        <li>
		        {!loggedIn ?
		          <Link to="auth">Login/Register(USG Only)</Link>
		          :
		          <Link to="dashboard">Dashboard</Link>
		        }
		        </li>
		   </ul>
		    </div>
		  </div>
		</div>
    );
  }
}

export default Header;