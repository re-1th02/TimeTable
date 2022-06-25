import React from "react";
import { Stack } from "react-bootstrap";
import Texture from "../../Texture";

export default class High extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div style={{background : 'white', color : Texture.dark1, width : '10vw', height : '4vw', borderRadius : '2%', margin : '1%', boxShadow : '0 0 6px white'}}>
                <Stack style={{position : 'relative', top : '2%', left : '2%', textAlign : 'left'}}>
                    <div style={{fontSize : '1.1vw', fontWeight : 600}}>{this.props.head}</div>
                    <div style={{fontSize : '1.4vw', fontWeight : 800}}>{this.props.body}</div>
                </Stack>
            </div>
        );
    }
}