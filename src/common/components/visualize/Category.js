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
        <div key={i} className="ind-list"> 
         <dd 
            onClick={this.selectOne.bind(this, ind)} 
            className={
                this.props.selectedIndicators.indexOf(ind) != -1 ? 'menu-selected' : ''
            }> <p>
            <span className="glyphicon glyphicon-chevron-right">&nbsp;</span>{ind}</p>
          </dd>
        </div>
        )} 
      </div>   
    );
  }
}

class Subcategory extends Component {

  // React initial method
  componentDidMount() {
    // Create a local state for forms
    this.setState({
      openSubs: []
    });
  }

  collapseSub(id) {
    this.state.openSubs.push(id)
    console.log(this.state.openSubs)
  }

  render () {
    const {subcategories} = this.props
    return (
      <dl>
        {subcategories.map((sub, i) =>
          <div
            className="sub-list"
            key={i}
            //onClick={this.collapseSub.bind(this, i)}
            >
            <dt>{sub.name}</dt>
            <Indicator {...this.props} indicators={sub.indicators} />
          </div>       
        )}
      </dl>
    );
  }
}

export default class Category extends Component {

  // React initial method
  componentDidMount() {
    // Create a local state for forms
    this.setState({
      openCat: ""
    });
  }

  collapseCat(cat) {
    //this.state.openCat = cat
    //console.log(cat);
    this.setState({
      openCat: cat
    });
  }
    
  render () {      
    if(!this.props.categories) return <span>Loading</span>;
    const {categories} = this.props   
    return (
      <div >
        <header className="viz-col-head"><h4>Choose Indicators</h4><hr/></header>
        <div className="icon-container">
          {categories.map((cat, i) =>
              <div onClick={this.collapseCat.bind(this, cat.name)} className="cat-icons"><p>{cat.name}</p></div> 
          )}
        </div>
          {categories.map((cat, i) =>
            this.state.openCat != cat.name ? null : 
            <div className='category-list'key={i}>
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