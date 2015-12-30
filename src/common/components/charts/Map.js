import React, { PropTypes, Component } from 'react';



export default class MapChart extends Component {

    render() {
        
        const position = [51.505, -0.09];
        
        if (process.env.BROWSER) {
            var { Map, Marker, Popup, TileLayer } = require('react-leaflet');
            return (
                  <Map center={position} zoom={13}>
                    <TileLayer
                      url='../../../assets/geo/sovereignt_None.geojson'
                    />
                    <Marker position={position}>
                      <Popup>
                        <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
                      </Popup>
                    </Marker>
                  </Map>

            );
        }
        else {
            return <h1>hello</h1>;
        }
    }
}

// Map.propTypes = {
//     data: PropTypes.object.isRequired 
// }
