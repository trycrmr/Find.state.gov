import React, { PropTypes, Component } from 'react';

export default class Banner extends Component {

    render() {

        return (
        	<div className="banner">
        		<button onClick={this.props.displayModal} type="button" className="edit-btn" >Edit Visualization</button>
        			<h3 className="ind-title">{this.props.data.indicator}</h3>
                    <p>Sources: src1, src2, src3, src4</p>
        	</div>
        )
    }
}

Banner.propTypes = {
    data: PropTypes.object.isRequired
}
