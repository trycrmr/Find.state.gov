import React, { PropTypes, Component } from 'react';

class Indicator extends Component {

    selectOne(ind) {
        this.props.selectIndicator(ind.name);
    }

    render () {
        const {indicators} = this.props
        
        return (
            <div>
                {indicators.map((ind, i) =>   
                   <dd 
                        onClick={this.selectOne.bind(this, ind)} 
                        key={i}
                        className={
                            this.props.selectedIndicators.indexOf(ind.name) != -1 ? 'menu-selected' : ''
                        }> <p>
                        <span className="glyphicon glyphicon-chevron-right">&nbsp;</span>{ind.name}</p>
                    </dd>
                )} 
            </div>
              
        );
    }
}

export default class Category extends Component {
    
    render () {      
        if(!this.props.categories) return <span>Loading</span>;
        const {categories} = this.props   
        return (
            <div >
                <header className="viz-col-head"><h4>Choose Indicators</h4><hr/></header>
                <dl className="category-list">
                    {categories.map((cat, i) =>
                        <div key={i}>
                            <dt>{cat.title}</dt>
                            <Indicator {...this.props} indicators={cat.indicators} />
                        </div>
                             
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
    categories: PropTypes.array
};