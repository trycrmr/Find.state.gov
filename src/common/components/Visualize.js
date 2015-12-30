import React, { Component } from 'react'

import BuildMenu from './visualize/BuildMenu'

import LineChart from './charts/Line'
import BarChart from './charts/Bar'

import MapChart from './charts/Map'



class Visualize extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.fetchSetupIfNeeded();
    }

    render() {
        return (

            <div>
                <div id="content" className="viz-content">
                {!this.props.dataLoaded &&  
                    <div>
                    <div className="loading"></div>
                    <span className="msg">
                        <h3>no build chosen</h3>
                        <button onClick={this.props.displayModal} type="button" className="btn btn-lg" >Build a Visualization</button>
                    </span>
                    </div>
                }
                {this.props.dataLoaded === true && this.props.selectedChart === 'line' &&
                    <LineChart data={this.props.data} />
                }
                {this.props.dataLoaded === true && this.props.selectedChart === 'bar' &&
                    <BarChart data={this.props.data} />
                }
                {this.props.dataLoaded === true && this.props.selectedChart === 'map' &&
                    <MapChart data={this.props.data} />
                }
                
                </div>
                <BuildMenu showModal={this.props.showModal} {...this.props} />
            </div>      	
        );
    }
}

export default Visualize;