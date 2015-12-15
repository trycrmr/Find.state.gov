import React, { Component } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

class Sidebar extends Component {

  constructor(props){
	super(props);
  }

  render() {


    return (

    	<div className="sidebar">

		  <div className="sidebar-item">
		    <p>Easy Example Nav</p>
		  </div>

		  <nav className="sidebar-nav">
		    <Link to="/home" className="sidebar-nav-item" activeClassName="active">Home <span className="nav-note">[static]</span></Link>
		    <Link to="/datastory" className="sidebar-nav-item" activeClassName="active">datastory <span className="nav-note">[api-data]</span></Link>
		    <Link to="/fake-page" className="sidebar-nav-item" activeClassName="active">Non-existent page <span className="nav-note">[fake]</span></Link>
		  </nav>

		</div>
    );
  }
}

export default Sidebar;