import { bindActionCreators } from 'redux';
import React, { Component} from 'react';
import { connect } from 'react-redux';
import Visualize from '../components/Visualize';
import * as VisualizeActions from '../actions/visualize';

//Data that needs to be called before rendering the component
//This is used for server side rending via the fetchComponentDataBeforeRending() method
Visualize.need = [
  VisualizeActions.fetchData, //data to hydrate the charts
  VisualizeActions.fetchSetup // data to hydrate the build menu (indicators, countries)
]

function mapStateToProps(state) {
  // deconstruct from state
  let { visualizeReducer } = state;

  visualizeReducer = visualizeReducer.present;

  // deconstruct from visualize
  const {
    setupLoaded,
    dataLoaded,
    setup,
    setupSelected,
    data,
    showModal
  } = visualizeReducer || {
    setupLoaded: false,
    dataLoaded: false,
    setup: {},
    setupSelected: {},
    data: {},
    showModal: false
  };
  return {
    setupLoaded,
    dataLoaded,
    setup,
    setupSelected,
    data,
    showModal
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(VisualizeActions, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Visualize);