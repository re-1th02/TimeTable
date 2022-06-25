import React from "react";
import escObj from './Escape';
import listenObj from "./Exp_class";

export default class Expand extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selected : false
        }
        this.double = this.double.bind(this);
        this.side = (this.props.left ? 'left' : 'right')
    }
    double(){
        if(this.props.expandable){

            if(this.state.selected){
                this.setState({selected : false});
                this.props.clicked();
                listenObj[this.side].end();
            }
            else{
                this.setState({selected : true});
                this.props.clicked();
                listenObj[this.side].start(this.double);
            }
        }
    }
    render(){
        return(
            (this.state.selected || !this.props.hide) ? 
            <div onDoubleClick={() => this.double()} style={this.props.style}>
                {this.props.children}
            </div>
            :
            null
        )
    }
}