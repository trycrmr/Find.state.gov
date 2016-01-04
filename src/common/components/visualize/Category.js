import React, { PropTypes, Component } from 'react';

class Indicator extends Component {

  selectOne(ind) {
    this.props.selectIndicator(ind);
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
                this.props.selectedIndicators.indexOf(ind) != -1 ? 'menu-selected' : ''
            }> <p>
            <span className="glyphicon glyphicon-chevron-right">&nbsp;</span>{ind}</p>
          </dd>
        )} 
      </div>   
    );
  }
}

class Subcategory extends Component {

  render () {
    const {subcategories} = this.props

    return (
      <dl className="category-list">
        {subcategories.map((sub, i) =>
          <div key={i}>
            <dt>{sub.name}</dt>
            <Indicator {...this.props} indicators={sub.indicators} />
          </div>       
        )}
      </dl>
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
          {categories.map((cat, i) =>
            <div key={i}>
              <span className="cat-icons">{cat.name}</span> 
              <Subcategory {...this.props} subcategories={cat.subcategories} /> 
            </div>
          )}
       
      </div>
    );
  }
}

Indicator.PropTypes = {
    indicators: PropTypes.array.isRequired
}

Subcategory.PropTypes = {
    subcategories: PropTypes.array.isRequired
}

Category.propTypes = {
    categories: PropTypes.array.isRequired
};