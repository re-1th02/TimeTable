import React from "react";
import {Modal, Stack, Container, Row, Image, Button, Dropdown, DropdownButton} from 'react-bootstrap';
import { CSVLink } from "react-csv";
import { exportComponentAsJPEG, exportComponentAsPNG } from "react-component-export-image";

// do, undo(), heading, key, children
export default class Download extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Modal size='lg' show={this.props.do} onHide={() => {this.props.undo()}}>
                <Modal.Header>
                    <Modal.Title style={{textAlign : 'center'}}>Download {this.props.heading}</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Container ref={this.downloadRef} style={{textAlign : 'center', margin: 'auto', width : '100%', height : '100%'}}>
                        <Stack>
                            <Row style={{position : 'relative', height : 60}}>
                                <h6 style={{textAlign : 'center', 
                                            fontSize : 20, 
                                            fontWeight : 1000, 
                                            position : 'absolute', 
                                            top : '50%', 
                                            left : '2%',
                                            transform : 'translateY(-50%)'
                                }}>
                                    {new Date().toLocaleDateString()}
                                </h6>
                                <Image style={{width : 'auto', 
                                            height : 60, 
                                            position : 'absolute', 
                                            top : '50%', 
                                            transform : 'translateY(-50%)',
                                            right : '2%'
                                    }} src = '/icons/logo.png' alt=''/>
                            </Row>
                            <div>
                                {this.props.children}
                            </div>
                        </Stack>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => {this.props.undo()}}>
                    Close
                </Button>
                <CSVLink data={this.props.data} target='_blank' filename={`${Math.floor(((new Date()).getDate())/10)}${((new Date()).getDate())%10}${Math.floor(((new Date()).getMonth()+1)/10)}${((new Date()).getMonth()+1)%10}${(new Date()).getFullYear()}_ripik_${this.props.name}.csv`} onClick={() => {this.props.undo()}}>
                    <Button variant="primary" onClick={() => {this.props.undo()}}>
                        Download CSV
                    </Button>
                </CSVLink>
                <DropdownButton title='Export as Image'>
                    <Dropdown.Item onClick={() => {exportComponentAsPNG(this.downloadRef, {fileName :  `${Math.floor(((new Date()).getDate())/10)}${((new Date()).getDate())%10}${Math.floor(((new Date()).getMonth()+1)/10)}${((new Date()).getMonth()+1)%10}${(new Date()).getFullYear()}_ripik_${this.props.name}`});this.props.undo()}}>PNG</Dropdown.Item>
                    <Dropdown.Item onClick={() => {exportComponentAsJPEG(this.downloadRef, {fileName : `${Math.floor(((new Date()).getDate())/10)}${((new Date()).getDate())%10}${Math.floor(((new Date()).getMonth()+1)/10)}${((new Date()).getMonth()+1)%10}${(new Date()).getFullYear()}_ripik_${this.props.name}`});this.props.undo()}}>JPEG</Dropdown.Item>
                </DropdownButton>
                </Modal.Footer>
            </Modal>
        );
    }
}