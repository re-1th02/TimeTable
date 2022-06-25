import React from 'react';
import {Collapse, Button, Container, Row, ButtonGroup, Stack, OverlayTrigger, Tooltip, Modal, Dropdown, DropdownButton, Navbar, CloseButton, Image} from 'react-bootstrap';
import {Scrollbar} from 'react-scrollbars-custom'
import Texture from '../../Texture';
import Draggable from 'react-draggable';


export default class ChatBot extends React.Component{
	constructor(props){
		super(props);
		this.state = {width : '27vw', height : '65vh', widthperc : 75, enLarged : false, show : false, data : []}
		// this.state.data = [
		// 	// {date : '..date..', user : '..user..', val : 'Hi Welcome, This is welcome message. Have a nice Day.', type : 1},
		// 	// {date : '..date..', user : '..user..', val : 'Hi', type : 0},
		// 	// {date : '..date..', user : '..user..', val : 'Hi', type : 1},
		// 	// {date : '..date..', user : '..user..', val : 'Hi', type : 0},
		// 	// {date : '..date..', user : '..user..', val : 'Hi', type : 0},
		// ]
		fetch('http://127.0.0.1:8000/chat/get').then(
            (res) => res.json()).then(
                (json) => {this.setState({data : json})}
        ).catch(e => console.log(e))
	}
	render(){
		return(
				// <Resizable width={this.state.width} height={this.state.height} onResizeStop={(event, dir, ref, d) => {this.setState((state) => {return{width : state.width + d.width, height : state.height+d.height}})}}>
			<Draggable>
				<div style={{background : 'white', 
							display : 'flex', 
							flexDirection : 'column'
				}}>
					{/* <div style ={{position : 'relative', right : 0}}>
						<Button onClick={this.props.close}>X</Button>
					</div> */}
					<div style={{position : 'relative',
								width : `calc(${this.state.width}+0.2vw)`, 
								background : Texture.lightgrad, 
					}}>
						<div style={{position : 'absolute', right : '0.2vw', top : '50%', transform : 'translateY(-50%)', display : 'flex', fontSize : '1.5vw', color : 'white'}}>
							<div 	onClick={() => {this.setState((state) => {return state.enLarged ? {width : '27vw', height : '65vh', enLarged : false, widthperc : 75} : {width : '99.6vw', height : '78vh', enLarged : true, widthperc : 85} })}} 
									onMouseEnter={(e) => {e.target.innerHTML='&#9635;'}} 
									onMouseLeave={(e) => {e.target.innerHTML='&#9634;'}} 
									style={{cursor : 'pointer', width : 'auto', margin : '0 0.2vw'}}
							>&#9634;
							</div>
							<div onClick={this.props.hide}
								onMouseEnter={(e) => {e.target.style.color = 'red'}}
								onMouseLeave={(e) => {e.target.style.color = 'white'}}
								style={{cursor : 'pointer', transform : 'translateY(5%)', margin : '0 0.2vw'}}>
								&#10006;
							</div>
						</div>
						{/* <Button style={{position : 'absolute', right : 0, background : 'transparent', border : 'solid transparent', top : '50%', transform : 'translateY(-50%)'}} 
								onClick={this.props.hide}
								onMouseEnter={(e) => {e.target.style.color = 'red'}}
								onMouseLeave={(e) => {e.target.style.color = 'white'}}
						>X</Button> */}
						<h4 style={{color : 'white', margin : '0.5vw', paddingLeft : '1vw'}}>Messages</h4>
					</div>
					<Scrollbar style={{	width : this.state.width, 
										height : this.state.height, 
										background : Texture.darkgrad,
										margin : 3
								}}
					>
						{this.state.data.map((e) => {
							return(
								<fieldset style={{	
													width : `${this.state.widthperc}%`, 
													marginLeft : `${2+(96-this.state.widthperc)*e.type}%`,
													border : 'solid white',
													position : 'relative',
													right : 0
											}}
								>
									<legend style={{background : 'transparent',
													width : 'auto',
													color : 'white',
													margin : '0 5%',
													fontSize : '0.9vw',
													borderRadius : '20%'
												}}
									>
										{e.user}
									</legend>

									<h5 style={{color : 'white', margin : '0 1vw', marginBottom : '1vh', wordBreak : 'break-word'}}>{e.val}</h5>

									<small style={{background : 'transparent',
													width : 'auto',
													color : 'white',
													marginRight : '1vw',
													marginTop : '-1.2vh',
													fontSize : '0.9vw',
													float : 'right',
													borderRadius : '20%',
													opacity : 0.75
												}}
									>
										{e.date.replace('T', ' ')}
									</small>

								</fieldset>
							);
						})}
					</Scrollbar>
				</div>
			</Draggable>
				// </Resizable>
		);
	}
}