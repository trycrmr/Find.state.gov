import React, { PropTypes, Component } from 'react';
import { Modal } from 'react-bootstrap';

import Category from './Category';
import Country from './Country';

export default class BuildMenu extends Component {

    render () {
        const { setup, showModal } = this.props;
        if(showModal) {
          return <span />;
        }
        return (
            
            <Modal show={true} onHide={this.props.displayModal} >  
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" >Visualization Options</h4>
              </div>
              <div className="modal-body">
                <div className="row viz-column-set">
                    
                    <div className="col-md-4 viz-column-box">
                        <div className="viz-column">
                            <Category  {...this.props}  />
                        </div>
                    </div>

                    <div className="col-md-4 viz-column-box">
                        <div className="viz-column">
                            <Country {...this.props}  />
                        </div>
                    </div>

                    <div className="col-md-4 viz-column-box">
                      <div className="viz-column">
                        <header className="viz-col-head"><h4>Choose Graph</h4><hr/></header>
                        <table className="chart-list">
                        <tbody>
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
                        </tbody>
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
  showModal: PropTypes.bool.isRequired
};