import React, { Component } from 'react';
import DataStory from '../components/DataStory';

class Home extends Component {

  render() {
    return (
      <div>
        <div className="home-main"></div>
      
        <div className="head-container">
          <div className="container">
            <h1 className="data-story-head"> Find It. Visualize It. Share It.</h1>
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Search for..." />
                <span className="input-group-btn"><button className="btn btn-default" type="button">Find!</button></span>
              </div>
          </div>
        </div>
  			
        <DataStory {...this.props}/>
      </div>
			
    );
  }
}

export default Home;