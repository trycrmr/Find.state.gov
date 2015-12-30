import React, { PropTypes, Component } from 'react';



export default class MapChart extends Component {

    // this gets called initially 
    componentWillMount() {
        $.get('http://localhost:3000/setup/geoJson', function(result) {
            var geoJsonObj = result
            this.setState({
                geoObj: JSON.parse(geoJsonObj)
            });
        }.bind(this));
    
    }
    

    render() {
        
        if(this.state.geoObj === null || !this.state.geoObj) {
           return <h1>Loading ...</h1>
        }
        else 
            // this.state.geoObj is now accessable
            // temporarily just uses sovereignt

            // TODO ALL FUNCTIONALITY HERE
            
            return(

                <h1>Map HTML Here</h1>
            ) 
    }
}

// Map.propTypes = {
//     data: PropTypes.object.isRequired 
// }
