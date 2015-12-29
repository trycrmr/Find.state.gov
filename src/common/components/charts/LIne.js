import React, { PropTypes, Component } from 'react';
import { VictoryChart, VictoryLine, VictoryAxis} from "victory";
import d3Scale from 'd3-scale';
import d3 from 'd3'

import Legend from './Legend'

export default class LineChart extends Component {

    render() {
        
        // // STATIC TESTS
        // const test_data = {
        //     countries: ['China','Brazil', 'Mexico'],
        //     numbers: [
        //         [
        //           {x: new Date(1980, 1, 1), y: 125},
        //           {x: new Date(1987, 1, 1), y: 257},
        //           {x: new Date(1993, 1, 1), y: 345},
        //           {x: new Date(1997, 1, 1), y: 515},
        //           {x: new Date(2001, 1, 1), y: 132},
        //           {x: new Date(2005, 1, 1), y: 305},
        //           {x: new Date(2011, 1, 1), y: 270},
        //           {x: new Date(2015, 1, 1), y: 470}
        //         ],
        //         [
        //           {x: new Date(1982, 1, 1), y: 200},
        //           {x: new Date(1987, 1, 1), y: 100},
        //           {x: new Date(1993, 1, 1), y: 145},
        //           {x: new Date(1997, 1, 1), y: 333},
        //           {x: new Date(2001, 1, 1), y: 222},
        //           {x: new Date(2005, 1, 1), y: 105},
        //           {x: new Date(2011, 1, 1), y: 200},
        //           {x: new Date(2015, 1, 1), y: 460}
        //         ],
        //         [ 
        //           {x: new Date(1982, 1, 1), y: 300},
        //           {x: new Date(1987, 1, 1), y: 421},
        //           {x: new Date(1993, 1, 1), y: 345},
        //           {x: new Date(1997, 1, 1), y: 300},
        //           {x: new Date(2001, 1, 1), y: 109},
        //           {x: new Date(2005, 1, 1), y: 532},
        //           {x: new Date(2011, 1, 1), y: 401},
        //           {x: new Date(2015, 1, 1), y: 389}
        //         ]
        //     ]
        // }
        
        const colors = [
            "red", "orange", "magenta",
            "gold", "blue", "purple"
        ];

        const { countries, numbers } = this.props.data

        // this scale is used for chart axis
        var dateScale = {}
        numbers.map(function(set){
            if ( !dateScale.min || dateScale.min > set[0].x)
                dateScale.min = set[0].x
            if ( !dateScale.max || dateScale.max < set[set.length - 1].x)
                dateScale.max = set[set.length - 1].x
        })
        dateScale.mid = new Date(dateScale.max - (dateScale.max-dateScale.min)/2)
        
        // legend setup
        var legendSetup = []
        countries.map(function(c,i){
            legendSetup.push({name:c,color:colors[i]})
        });

        console.log(legendSetup)


        return (
        
            <VictoryChart
              height={600}
              width={800}
              scale={{
                x: d3.time.scale()
              }}
              domainPadding={{x:20}}>
              
              <VictoryAxis
                tickFormat={(x) => x.getFullYear()}
                />

                {numbers.map((dset, i) =>
                  // creates a line for each country data
                    <VictoryLine 
                        key={i} 
                        data={dset}
                        style={{ data: {stroke:colors[i]} }}
                    />
                )}
                <Legend setup={legendSetup} />
            </VictoryChart>
        )
    }
}

LineChart.propTypes = {
    data: PropTypes.object.isRequiered
}
