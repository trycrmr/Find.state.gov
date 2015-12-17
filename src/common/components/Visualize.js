import React, { Component } from 'react';


import BuildMenu from './visualize/BuildMenu';


class Visualize extends Component {
    constructor(props) {
        super(props);
    }

    // this.props will be the extracted datastory object
    componentWillMount() {
        this.props.fetchSetupIfNeeded();
        //this.props.modalToggle();
    }

   
    render() {
        return (

            <div>
                <div id="content" className="viz-content">
                    <div className="loading"></div>
                    <span className="msg">
                        <h3>No data loaded</h3>
                        <button onClick={this.props.modalToggle} type="button" className="btn btn-lg" >Build a Visualization</button>
                    </span>
                </div>

            <BuildMenu {...this.props} />

            </div>
            	
        );
    }
}

export default Visualize;