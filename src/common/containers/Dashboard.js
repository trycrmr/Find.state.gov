import { bindActionCreators } from 'redux'
import React, { Component} from 'react'
import { connect } from 'react-redux'
import Dash from '../components/dashboard'
import * as DashActions from '../actions/dashboard'

//Data that needs to be called before rendering the component
//This is used for server side rending via the fetchComponentDataBeforeRending() method
Dash.need = [
  DashActions.fetchUserDataIfNeeded
]

function mapStateToProps(state) {
    
    let { dashboard } = state;

    dashboard = dashboard.present;

    const {
        loaded,
        loading,
        userData
    } = dashboard || {
        loaded: false,
        loading: false,
        userData: {}
    };
    return {
        loaded,
        loading,
        userData
    };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AuthActions, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Dash);