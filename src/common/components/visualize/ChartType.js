import React, { PropTypes, Component } from 'react';

class ChartType extends Component {

    render () {
        return (
            <div>
                {this.props.indicators.map((ind, i) =>   
                   <dd key={i}> <span className="glyphicon glyphicon-chevron-right">&nbsp;</span>{ind.name}</dd>
                )} 
            </div>           
        );
    }
}
