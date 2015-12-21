import React, { PropTypes, Component } from 'react';

export default class Selected extends Component {

    remove(sel, which) {
        this.props.removeSelected(sel, which)
    }

    render () {
        
        return (
            <div className="selected-list">
                 <table className="table">
                    <thead>
                        <tr>
                            <th>Indicators</th>
                            <th>Countries</th>
                            <th>Chart</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>John<br/>mary
                            </td>
                            <td>Doe<br/>Mike</td>
                            <td> Bar </td>
                        </tr>
                    </tbody>
                </table>
            </div>
              
        );
    }
}