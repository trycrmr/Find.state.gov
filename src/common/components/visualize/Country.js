import React, { PropTypes, Component } from 'react';

export default class Country extends Component {

    render () {   
        if(!this.props.setup.setup) return <span>Loading</span>;
        const {countries} = this.props.setup.setup
        return (
            <div>
                <header className="viz-col-head"><h4>Choose Countries</h4><hr/></header>
                <input className="filter-country" placeholder="Quick Search"/>
                <ul className="country-list">
                    {countries.map((cty, i) =>                  
                       <li key={i}><span className="glyphicon glyphicon-th-list">&nbsp;</span>{cty.name}</li>
                    )} 
                </ul>  
            </div>            
        );
    }
}

Country.propTypes = {
    setup: PropTypes.object
};