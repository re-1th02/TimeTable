import React from "react";
import Texture from "../../Texture";


export default class Panel extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div style={this.props.style}>
                {this.props.big ?   <h1 style={{border : `solid ${Texture.light1} 3px`, margin : '0', color : 'white'}}>{this.props.head}</h1>  
                                :   <h3 style={{border : `solid ${Texture.light1} 3px`, margin : '0', color : 'white'}}>{this.props.head}</h3>}
                <div style={{margin : 'auto', border : `solid ${Texture.light1} 1px`, padding : `min(4%, 2vh) 3%`}}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}