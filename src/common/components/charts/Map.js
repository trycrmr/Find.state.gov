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

        
        if(process.env.BROWSER) {
            var { GeoJson, Map, Marker, Popup, TileLayer } = require('react-leaflet');
            if(this.state.geoObj === null) {
               return <h1>Loading ...</h1>
            }
            else {
                // this.state.geoObj is now accessable
                // temporarily just uses sovereignt

                // TODO ALL FUNCTIONALITY HERE
                
                const position = [51.505, -0.09];
                console.log(this.state.geoObj)

                var countries = ['United States', 'China']
               
                var getColor = function(f) {
                    if(countries.indexOf(f.properties.sovereignt) != -1)
                        return "blue"
                    else
                        return "grey"
                }

                function style(feature) {
                    return {
                        fillColor: getColor(feature),
                        weight: 2,
                        opacity: 1,
                        color: 'white',
                        dashArray: '3',
                        fillOpacity: 0.7
                    };
                }

                return(

                    //<Map > 
                        // <GeoJson data={statesData} />
                    // </Map>

                      <Map center={position} zoom={5}>
                        
                        
                        <GeoJson 
                            data={this.state.geoObj} 
                            style={style}
                        />
                      </Map>
                    
                ) 
            }
        }
    }
}

// Map.propTypes = {
//     data: PropTypes.object.isRequired 
// }
