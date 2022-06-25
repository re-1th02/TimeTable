import React from 'react';
import {Collapse, Button, Container, Row, ButtonGroup, Stack, OverlayTrigger, Tooltip, Modal, Dropdown, DropdownButton, Navbar, CloseButton, Image} from 'react-bootstrap';
import Texture from '../../Texture';

// height, margin, desc, head, body
export default class Block extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div style={{
                        color : 'white' ,
                        minWidth : '8vw', 
                        height : this.props.height, 
                        margin : this.props.margin,
                        marginLeft : '0.3vw',
                    }}
            >
                <fieldset style={{border : 'solid'}}>
					<OverlayTrigger placement='auto' delay={{ show: 50, hide: 50 }} overlay={<Tooltip>{this.props.desc}</Tooltip>}>
                    	<legend style={{margin : '5%', padding : '2%', textAlign : 'left' ,fontSize : 13, background : Texture.dark1, width : 'auto', borderRadius : 8}}>{this.props.head}</legend>
                    </OverlayTrigger>
                <h6 style={{position : 'relative', 
                            top : '50%', 
                            transform : 'translateY(-30%)',
                            textAlign : 'center'}}
                >{this.props.body}</h6>
                </fieldset>
            </div>
        );
    }
}