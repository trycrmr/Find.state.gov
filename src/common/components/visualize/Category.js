import React, { PropTypes, Component } from 'react';

class Indicator extends Component {

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

export default class Category extends Component {
    
    render () {      
        if(!this.props.setup.setup) return <span>Loading</span>;
        const {categories} = this.props.setup.setup     
        return (
            <div >
                <header className="viz-col-head"><h4>Choose Indicator(s)</h4><hr/></header>
                <dl className="category-list">
                    {categories.map((cat, i) =>
                        <span>
                            <dt key={i}>{cat.title}</dt>
                            <Indicator indicators={cat.indicators} />
                        </span>
                             
                    )}
                </dl>
            </div>
        );
    }
}

Indicator.PropTypes = {
    indicators: PropTypes.array
}

Category.propTypes = {
    setup: PropTypes.object
};