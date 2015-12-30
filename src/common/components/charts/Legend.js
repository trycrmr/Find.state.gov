import React, { PropTypes, Component } from 'react';

export default class Legend extends Component {

    render() {

    	var startX = 100
    	var startY = 60
        return (
        	<g>
        		{this.props.setup.map((item, i) =>
        			<text key={i} x={startX} y={startY + i*20} fontSize="18" fill={item.color}>{item.name}</text>
        		)}
        	</g>
        )
    }
}

Legend.propTypes = {
    setup: PropTypes.array.isRequired
}
