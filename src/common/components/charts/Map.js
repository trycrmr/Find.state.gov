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
                
                const position = [51.505, -0.09];
                console.log(this.state.geoObj)

                var countries = ['Brazil', 'China', 'Iraq','Iran','Canada']
                var averages = [20,5,12,2,9]
                var maxAvg = [20]
                var chlorapleth = ['']

                function chloropleth(d, rangeTop) {
                    return d > rangeTop ? '#800026' :
                           d > rangeTop * .8  ? '#BD0026' :
                           d > rangeTop * .65  ? '#E31A1C' :
                           d > rangeTop * .5  ? '#FC4E2A' :
                           d > rangeTop * .35  ? '#FD8D3C' :
                           d > rangeTop * .2  ? '#FEB24C' :
                           '#FED976' 
                }
               
                var getColor = function(f) {
                    var index = countries.indexOf(f.properties.sovereignt)
                    console.log(averages[index])
                    if( index != -1) {
                        return chloropleth(averages[index],maxAvg)
                    }
                        
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
