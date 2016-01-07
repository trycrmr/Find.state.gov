import { bindActionCreators } from 'redux'
import React, { Component} from 'react'
import { connect } from 'react-redux'
import Dash from '../components/Dashboard'

import * as DashActions from '../actions/dashboard'

//Data that needs to be called before rendering the component
//This is used for server side rending via the fetchComponentDataBeforeRending() method
Dash.need = [
  DashActions.fetchIndicatorsIfNeeded
  // add more actions here
]

function mapStateToProps(state) {
    
    let { dashboard } = state;

    dashboard = dashboard.present;

    const {
        indicators,
        indicatorsLoaded
    } = dashboard || {
        indicators: [],
        indicatorsLoaded: false
    };
    return {
        indicators,
        indicatorsLoaded
    };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(DashActions, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Dash);