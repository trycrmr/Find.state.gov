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
            if(!this.state.geoObj) {
               return <h1>Loading ...</h1>
            }
            else {
                // this.state.geoObj is now accessable
                // temporarily just uses sovereignt

                // TODO ALL FUNCTIONALITY HERE
                
                const position = [51.505, -0.09];
                console.log(this.state.geoObj)

                var geojsonFeature = {
                    "type": "Feature",
                    "properties": {
                        "name": "Coors Field",
                        "amenity": "Baseball Stadium",
                        "popupContent": "This is where the Rockies play!"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [-104.99404, 39.75621]
                    }
                };

                return(

                    // <Map center={position} zoom={13}>
                    //     <TileLayer
                    //       url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    //       attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    //     />
                    //     <Marker position={position}>
                    //       <Popup>
                    //         <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
                    //       </Popup>
                    //     </Marker>
                    //   </Map>
                    <Map>
                        <GeoJson data={geojsonFeature} />
                    </Map>
                ) 
            }
        }
    }
}

// Map.propTypes = {
//     data: PropTypes.object.isRequired 
// }
