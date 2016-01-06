import React, { PropTypes, Component } from 'react';

import { Modal, Alert } from 'react-bootstrap';
import Selected from './Selected';
import CategoryMenu from './Category';
import CountryMenu from './Country';
import ChartMenu from './Chart';


export default class BuildMenu extends Component {

    render () {
        const { setup, showModal } = this.props;
        // modal is toggled not to show
        if(showModal) {
          return <span />;
        }
        return ( 
            <Modal show={true} onHide={this.props.displayModal} >  
                <div className="modal-content">
                    
                    <div className="modal-body">
                        <div className="row viz-column-set">
                            <div className="col-md-4 viz-column-box">
                                <div className="viz-column">
                                    <CategoryMenu  {...this.props}  />
                                </div>
                            </div>
                            <div className="col-md-4 viz-column-box">
                                <div className="viz-column">
                                    <CountryMenu {...this.props}  />
                                </div>
                            </div>
                            <div className="col-md-4 viz-column-box">
                                <div className="viz-column">
                                    <ChartMenu {...this.props}  />
                                </div>
                            </div>
                        </div>
                    </div>
                    <span 
                        className={
                            this.props.buildReady != true ? 'build-button nopulse' : 'build-button pulsing'
                        }
                        onClick={this.props.requestDataForBuild}> build
                    </span>
                </div>
            </Modal>
        );
    }
}

BuildMenu.propTypes = {
  showModal: PropTypes.bool.isRequired
};