import React, { ProptTypes, Component } from 'react';

class Indicator extends Component {
  

  render() {

    return (
      <div className="col-md-12 col-xs-12"> 
        <table className="table table-bordered table-hover table-striped table-foldersystem">
          <thead>
            <tr>
              <th></th>
              <th>Indicator ID</th>
              <th>Indicator Name</th>
              <th>Units</th>
              <th>URL</th>
              <th>Data URL</th>
              <th>Last Update</th>
              <th>Indicator Definition</th>
            </tr>
          </thead>
          <tbody>
          {this.props.indicators.map((row, i) => 
            <tr key={i}>
              <td><i className="glyphicon glyphicon-folder-open"></i></td>
              <td>{row.Indicator_ID}</td>
              <td>{row.Indicator_Name}</td>
              <td>{row.Units}</td>
              <td>{row.Indicator_URL}</td>
              <td>{row.Indicator_Data_URL}</td>
              <td>{row.updatedAt}</td>
              <td>{row.Indicator_Definition}</td>
            </tr>
          )}
          </tbody>
          </table>
      </div>
    );
  }
}

Indicator.PropTypes = {
  indicators: React.PropTypes.object.isRequired
}

export default Indicator;