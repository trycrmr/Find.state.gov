import { bindActionCreators } from 'redux';
import React, { Component} from 'react';
import { connect } from 'react-redux';
import DataStory from '../components/DataStory';
import Home from '../components/Home';
import * as StoryActions from '../actions/datastory';

//Data that needs to be called before rendering the component
//This is used for server side rending via the fetchComponentDataBeforeRending() method
Home.need = [
  StoryActions.fetchStories
]

function mapStateToProps(state) {
    
    let { datastories } = state;

    datastories = datastories.present;

    // deconstruct from datastories
    const {
        loaded,
        stories
    } = datastories || {
        loaded: false,
        stories: []
    };
        return {
        loaded,
        stories
    };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(StoryActions, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);