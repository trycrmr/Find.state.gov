import React, { PropTypes, Component } from 'react';

export default class Country extends Component {

    selectOne(cty) {
        this.props.selectCountry(cty.name);
    }

    render () {   
        if(!this.props.countries) return <span>Loading</span>;
        const {countries} = this.props
        return (
            <div>
                <header className="viz-col-head"><h4>Choose Countries</h4><hr/></header>
                <input className="filter-country" placeholder="Quick Search"/>
                <ul className="country-list">
                    {countries.map((cty, i) =>                  
                        <li 
                        className={
                            this.props.selectedCountries.indexOf(cty.name) != -1 ? 'menu-selected' : ''
                        }
                        onClick={this.selectOne.bind(this, cty)} 
                        key={i}><span 
                        className="glyphicon glyphicon-th-list">&nbsp;</span>{cty.name}</li>
                    )} 
                </ul>  
            </div>            
        );
    }
}

Country.propTypes = {
    countries: PropTypes.array
};