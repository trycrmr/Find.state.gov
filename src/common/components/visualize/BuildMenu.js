import React, { PropTypes, Component } from 'react';
import { Modal } from 'react-bootstrap';

export default class BuildMenu extends Component {
    
    constructor(props) {
        super(props);
    }

    close() {
        this.props.modalToggle();
    }

    render () {
        const { setup, showModal } = this.props;
        if(showModal) return <span />;
        return (
            

            <Modal show={true} onHide={this.props.modalToggle} >  
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" >Visualization Options</h4>
              </div>
              <div className="modal-body">
                <div className="row viz-column-set">
                    
                    <div className="col-md-4 viz-column-box">
                      <div className="viz-column">
                          <header className="viz-col-head"><h4>Choose Indicator(s)</h4><hr/></header>
                          <dl className="category-list">
                            <dt>Category</dt>
                            <dd><span className="glyphicon glyphicon-chevron-right">&nbsp;</span>Indicator 1</dd>
                            <dd><span className="glyphicon glyphicon-chevron-right">&nbsp;</span>Indicator 2</dd>
                            <dd><span className="glyphicon glyphicon-chevron-right">&nbsp;</span>Indicator 3</dd>
                            <dd><span className="glyphicon glyphicon-chevron-right">&nbsp;</span>Indicator 4</dd>
                            <dt>Category</dt>
                            <dt>Category</dt>
                          </dl>
                      </div>
                    </div>

                    <div className="col-md-4 viz-column-box">
                      <div className="viz-column">
                        <header className="viz-col-head"><h4>Choose Countries</h4><hr/></header>
                        <input className="filter-country" placeholder="Quick Search"/>
                        <ul className="country-list">
                          <li><span className="glyphicon glyphicon-th-list">&nbsp;</span>Afghanastan</li>
                          <li><span className="glyphicon glyphicon-th-list">&nbsp;</span>Iraq</li>
                          <li><span className="glyphicon glyphicon-th-list">&nbsp;</span>Qatar</li>
                          <li><span className="glyphicon glyphicon-th-list">&nbsp;</span>Turkey</li>
                          <li><span className="glyphicon glyphicon-th-list">&nbsp;</span>Syria</li>
                          <li><span className="glyphicon glyphicon-th-list">&nbsp;</span>Russia</li>
                          <li><span className="glyphicon glyphicon-th-list">&nbsp;</span>United States</li>
                        </ul>
                      </div>
                    </div>

                    <div className="col-md-4 viz-column-box">
                      <div className="viz-column">
                        <header className="viz-col-head"><h4>Choose Graph</h4><hr/></header>
                        <table className="chart-list">
                          <tr>
                            <td><span onclick="loadViz('bar')" className="barcon chartcon"></span><br/>Bar</td>
                            <td><span onclick="loadViz('line')" className="linecon chartcon"></span><br/>Line</td>
                          </tr>
                          <tr>
                            <td><span className="scattercon chartcon"></span><br/>Scatter</td>
                            <td><span className="bubblecon chartcon"></span><br/>Bubble</td>
                          </tr>
                          <tr>
                            <td><span className="mapcon chartcon"></span><br/>Map</td>
                            <td className="soon"><span className="radarcon chartcon"></span><br/>Radar (Coming Soon)</td>
                          </tr>
                          <tr>
                            <td className="soon"><span className="treecon chartcon"></span><br/>Tree (Coming Soon)</td>
                          </tr>
                        </table>
                      </div>
                    </div>

                </div>
                </div>
                </div>
            </Modal>
       
        );
  }
}

BuildMenu.propTypes = {
  setup: PropTypes.object.isRequired,
  showModal: PropTypes.bool.isRequired
};