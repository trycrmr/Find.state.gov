import React, { PropTypes, Component } from 'react';
import { VictoryChart, VictoryLine, VictoryAxis} from "victory";
import d3Scale from 'd3-scale';



export default class LineChart extends Component {

    render() {
        const dataSet = [
            [
              {x: new Date(1982, 1, 1), y: 125},
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
        ]
        const colors = [
            "red", "orange", "magenta",
            "gold", "blue", "purple"
        ];
        return (
        
            <VictoryChart
              height={600}
              width={800}
              scale={{
                x: d3Scale.time()
              }}>
              <VictoryAxis
                label="Decades"
                tickValues={[
                  new Date(1980, 1, 1),
                  new Date(2000, 1, 1),
                  new Date(2020, 1, 1),
                ]}
                tickFormat={(x) => x.getFullYear()}/>

                {dataSet.map((dset, i) =>
                    <VictoryLine 
                        key={i} 
                        data={dset}
                        style={{ data: {stroke:colors[i]} }}
                    />
                )}
            </VictoryChart>
        )
    }
}

LineChart.propTypes = {
    data: PropTypes.object
}
