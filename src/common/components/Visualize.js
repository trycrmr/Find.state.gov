import React, { Component } from 'react';


class Visualize extends Component {
  constructor(props) {
    super(props);
  }

  // this.props will be the extracted datastory object
  componentWillMount() {
    this.props.fetchSetupIfNeeded();
  }

  render() {
    return (
      <div>
        
      
        <div className="head-container">
          <h1>VIZUALIZE</h1>
        </div>
  			
      </div>
			
    );
  }
}

export default Visualize;