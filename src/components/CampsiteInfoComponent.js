import React, { Component } from 'react'

class CampsiteInfoComponent extends Component {
    render() {

        if (this.props.campsite){
            return(
                <div className="row">{this.props.campsite}</div>              
            );
        } else{
                return(
                    <div></div>
                );
            }

        }
    }


export default CampsiteInfoComponent;