import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classNames from 'classnames';
import Home from '../components/Home'
import Header from '../components/layout/Header'

class App extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
          <Header  />
            {!this.props.children && <Home />}
            {this.props.children}
      </div>
        
    );
  }
}


export default App;
