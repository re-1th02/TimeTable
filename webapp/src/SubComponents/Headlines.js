import React from 'react';
import {Button, Container, Row, Col, Carousel} from 'react-bootstrap';
import Texture from '../Texture';

export default class Headline extends React.Component{
	constructor(props){
		super(props);
        this.data = [
                    {description : 'First',  show : 1, borderHigh : 10},
                    {description : 'Second', show : 1, borderHigh : 10},
                    {description : 'Third',  show : 0, borderHigh : 10},
                    {description : 'Fourth', show : 1, borderHigh : 10},
                    ];        
	}
	render(){
		return(
		<Container fluid>
			<Row>
			<Col xs = {11} style={{padding : 0}}>
                <Carousel fade interval={5000} prevLabel='' nextLabel='' prevIcon={''} nextIcon={''} indicators={false}  style = {{background : Texture.darkgrad, margin : 0}}>
                {this.data.map((e) => {
                    return (
                        (e.show) ? (
                        <Carousel.Item key={e.description}>
                            <h3 style ={{color : 'white', textAlign : 'center'}}>{e.description}</h3>
                        </Carousel.Item>
                        ) : (null)
                    )
                })}
				</Carousel>
			</Col>
			<Col xs = {1} style={{padding : 0}}>
				<Button style={{width : '80%', background : Texture.light2, height : '100%'}}>O</Button>
			</Col>
			</Row>
		</Container>
		);
	}
}