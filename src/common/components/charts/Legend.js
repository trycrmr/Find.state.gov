import React, { PropTypes, Component } from 'react';

export default class Legend extends Component {

    render() {

    	var startX = 100
    	var startY = 60
        return (
        	<g>
        		{this.props.setup.map((item, i) =>
        			<text x={startX} y={startY + i*20} font-size="55" fill={item.color}>{item.name}</text>
        		)}
        	</g>
        )
    }
}

Legend.propTypes = {
    setup: PropTypes.array.isRequiered
}
