import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classNames from 'classnames';
import * as LayoutActions from '../actions/layout';
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

function mapStateToProps(state) {
  return {
    layout : state.layout.present
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(LayoutActions,dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
