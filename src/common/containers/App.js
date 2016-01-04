import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classNames from 'classnames';

// needed base components
import Home from '../components/Home'
import Header from '../components/layout/Header'

// needed auth action for all
import { fetchUserIfNeeded } from '../actions/auth'


class App extends Component {

  constructor(props){
    super(props);
  }


  componentDidMount() {
    // when the component mounts, we want to run a method and see
    // if there's any user token logged in
    //fetchUserIfNeeded()
  }

  render() {
    
    return (
      <div>
        {!this.props.children.auth &&
          <Header  />
        }
        {this.props.children.auth &&
          <Header user={true} />
        }
        
        {!this.props.children && <Home />}
          {this.props.children}
        
      </div>
        
    );
  }
}


export default App;
