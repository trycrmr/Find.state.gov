import React, { PropTypes, Component } from 'react';


export default class ChartMenu extends Component {

    selectOne(type) {
        this.props.selectChart(type);
    }

    render () {      
        
        return (
            <div>
                <header className="viz-col-head"><h4>Choose Graph</h4><hr/></header>
                <table className="chart-list">
                    <tbody>
                      <tr>
                        <td className={
                        this.props.selectedChart.indexOf("bar") != -1 ? 'menu-selected' : ''
                        }><span onClick={this.selectOne.bind(this, "bar")} className="barcon chartcon"></span><br/>Bar</td>
                        <td className={
                        this.props.selectedChart.indexOf("line") != -1 ? 'menu-selected' : ''
                        }><span onClick={this.selectOne.bind(this, "line")} className="linecon chartcon"></span><br/>Line</td>
                      </tr>
                      <tr>
                        <td className={
                        this.props.selectedChart.indexOf("scatter") != -1 ? 'menu-selected' : ''
                        }><span onClick={this.selectOne.bind(this, "scatter")} className="scattercon chartcon"></span><br/>Scatter</td>
                        <td className={
                        this.props.selectedChart.indexOf("map") != -1 ? 'menu-selected' : ''
                        }><span onClick={this.selectOne.bind(this, "map")} className="mapcon chartcon"></span><br/>Map</td>
                      </tr>
                      <tr>
                        <td className={
                        this.props.selectedChart.indexOf("bubble") != -1 ? 'menu-selected' : ''
                        }><span onClick={this.selectOne.bind(this, "bubble")} className="bubblecon chartcon"></span><br/>Bubble</td>
                        
                        <td className="soon"><span className="radarcon chartcon"></span><br/>(Coming Soon)</td>
                      </tr>
                      <tr>
                        <td className="soon"><span className="treecon chartcon"></span><br/>(Coming Soon)</td>
                      </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
