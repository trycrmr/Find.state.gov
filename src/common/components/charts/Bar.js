import React, { PropTypes, Component } from 'react';
import { VictoryChart, VictoryBar, VictoryAxis} from "victory";
import d3Scale from 'd3-scale';
import d3 from 'd3'

import Legend from './Legend'

export default class BarChart extends Component {

    render() {
        
        // STATIC TESTS
        const test_data = {
            countries: ['Iraq','China', 'Brazil'],
            numbers: [
                [
                  {x: new Date(1980, 1, 1), y: 125},
                  {x: new Date(1987, 1, 1), y: 257},
                  {x: new Date(1993, 1, 1), y: 345},
                  {x: new Date(1997, 1, 1), y: 515},
                  {x: new Date(2001, 1, 1), y: 132},
                  {x: new Date(2005, 1, 1), y: 305},
                  {x: new Date(2011, 1, 1), y: 270},
                  {x: new Date(2015, 1, 1), y: 470}
                ],
                [
                  {x: new Date(1982, 1, 1), y: 200},
                  {x: new Date(1987, 1, 1), y: 100},
                  {x: new Date(1993, 1, 1), y: 145},
                  {x: new Date(1997, 1, 1), y: 333},
                  {x: new Date(2001, 1, 1), y: 222},
                  {x: new Date(2005, 1, 1), y: 105},
                  {x: new Date(2011, 1, 1), y: 200},
                  {x: new Date(2015, 1, 1), y: 460}
                ],
                [ 
                  {x: new Date(1982, 1, 1), y: 300},
                  {x: new Date(1987, 1, 1), y: 421},
                  {x: new Date(1993, 1, 1), y: 345},
                  {x: new Date(1997, 1, 1), y: 300},
                  {x: new Date(2001, 1, 1), y: 109},
                  {x: new Date(2005, 1, 1), y: 532},
                  {x: new Date(2011, 1, 1), y: 401},
                  {x: new Date(2015, 1, 1), y: 389}
                ]
            ],
            averages: [
                [
                    {x: "Iraq", y: 8000}
                ],
                [
                    {x: "China", y: 9000}
                ],
                [
                    {x: "Brazil", y: 6000}
                ]
            ],
        }

        const colors = [
            "red", "orange", "magenta",
            "gold", "blue", "purple"
        ];

        var legendSetup = []
        test_data.countries.map(function(c,i){
            legendSetup.push({name:c,color:colors[i]})
        });
        
        
        return (
        
            <VictoryChart 
                height={600} 
                domainPadding={{x: 100}} 
                domain={{y: [0,15000]}} >

                {test_data.averages.map((dset, i) =>
                    // creates a bar for each country data
                    <VictoryBar
                        key={i} 
                        data={dset}
                        style={{ data: {fill:colors[i]} }}
                    />
                )}
                
                <Legend setup={legendSetup} />
            </VictoryChart>
        )
    }
}

BarChart.propTypes = {
    data: PropTypes.object.isRequired 
}
