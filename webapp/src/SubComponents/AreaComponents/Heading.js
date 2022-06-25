import React from 'react';
import {Container, Row, Navbar, Stack, Dropdown, Image, Modal, Button, Col, Collapse, InputGroup, FormControl} from 'react-bootstrap';
import Texture from '../../Texture';
import { FaInfoCircle, FaComment, FaPaperPlane, FaWindowClose, FaRegWindowClose } from "react-icons/fa";
import Scrollbar from 'react-scrollbars-custom';


export default class Heading extends React.Component{
	constructor(props){
		super(props);
		this.state = {	date : new Date().toLocaleDateString(), 
						time : new Date().toLocaleTimeString(), 
						height : '5vh', 
						ContainerHeight : '9vh',
						show : false,
						commentShow : false,
						commsExp : false
					};
		this.data = {
			// Strengths : ['20% Double Row Charging', '5 times 4 batch rolling possibility in your shift'],
			Strengths : ['20% Double Row Charging',
						 '5 times 4 batch rolling possibility in your shift', 
						 '6 times 3 batch rolling possibility in your shift', 
						 '10 times dual batch rolling possibility in your shift', 
						 '10% plates of High FRT will minimize the rolling time.',
						 '80% of rolling is of Low Carbon grade',
						 '10% are of ACC mode plates',
						],
			Weaknesses : ['Frequent width jump', 
							'30:70 slab thickness jump',
							'5 nos of plates are having delta cooling temp > 300℃ ',
							'High FCT to Low FCT jump'
						],
			Opportunities : ['Chances of same weight slabs charged & discharged weight will be 59% in your shift', 
							'80% of batch rolling oppurtunity in your shift'
						],
			Threats : ['There will be a work roll change in your shift.', 
						'10 nos of plate having weight less than theoritical weight.There is highly chance of short length.',
						'14% of plates having  thickness > 50 mm TMCR TYPE may impact SRPH'
					] 
		};
		this.commentRef = React.createRef();
		this.user = React.createRef();
		this.scrollRef = React.createRef();
		this.sendMsg = this.sendMsg.bind(this);
		this.comments = ['Check this', 'Checked' ,'Some Alarm' ,'Do that ....', 'Done!', 'Do this....']
		this.cols = [['Strengths', 'linear-gradient(#228B22, #32CD32)', '#228B22'], ['Weaknesses', 'linear-gradient(#8B0000, #FF0000)', '#B22222'], ['Opportunities', 'linear-gradient(#00008B, #0000FF)', '#0000CD'], ['Threats', 'linear-gradient(#A3A300, #FFC40C)', '#AD9300']];
	}
	componentDidMount(){
		this.timerid = setInterval(() => this.setState({date : new Date().toLocaleDateString(), time : new Date().toLocaleTimeString()}), 1000);
	}
	componentWillUnmount(){
		clearInterval(this.timerid);
	}
	componentDidUpdate(prevProps, prevState){
		if(!prevState.commsExp && this.state.commsExp){
			this.scrollRef.current.scrollToBottom();
		}
	}
	sendMsg(e){
		var dt = new Date();
		var off = dt.getTimezoneOffset() * 60000
		e['date'] = new Date(dt - off).toISOString().slice(0, -1)
		fetch('http://127.0.0.1:8000/chat/', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(e)
		})
	}
	render(){
		return(
			<Navbar style={{background : Texture.darkgrad, height : '9vh', minHeight : 40}} >
			<Container fluid style={{height : this.state.ContainerHeight, padding : '0', display : 'block'}}>
				<Row>
					{/* Menu top = , left = , height = , width = */}
					<Modal size = 'xl' 
							show={this.state.show} 
							onHide={() => {this.setState({show : false})}}
							style={{width : '100%'}}
					>
						<Modal.Header>
						<Modal.Title style={{textAlign : 'center'}}>
							<Row style={{margin : 'auto'}}>
								<div style={{fontWeight : 700, color: 'white', backgroundColor : this.cols[0][2], borderRadius : 17, width : 34, height : 34, margin : 1}}>S</div>
								<div style={{fontWeight : 700, color: 'white', backgroundColor : this.cols[1][2], borderRadius : 17, width : 34, height : 34, margin : 1}}>W</div>
								<div style={{fontWeight : 700, color: 'white', backgroundColor : this.cols[2][2], borderRadius : 17, width : 34, height : 34, margin : 1}}>O</div>
								<div style={{fontWeight : 700, color: 'white', backgroundColor : this.cols[3][2], borderRadius : 17, width : 34, height : 34, margin : 1}}>T</div>
							</Row>
						</Modal.Title>
						</Modal.Header>
						<Modal.Body style={{maxHeight : '60vh', overflowY : 'scroll'}}>
							<Row >
								{this.cols.map((e)=> {
									return(
										<Col key={e[0]} style={{position : 'relative'}}>
											<div style={{fontSize: 20, fontWeight : 800, background : e[1], height : 50, color : 'white', textAlign : 'center', position : 'sticky', top : 0}}>{e[0]}({this.data[e[0]].length})</div>
											{this.data[e[0]].map((x, i) => {
												return (<div key={i}>
													<div style = {{fontWeight : 600, background : 'white', color : e[2], marginTop : 12}}>
														{'\u2022 '}{x}
														</div>
														
												</div>);
											})}
										</Col>
									)
								})}
							</Row>	
						</Modal.Body>
						<Modal.Footer>
						<Button variant="secondary" onClick={() => {this.setState({show : false})}}>
							Close
						</Button>
						</Modal.Footer>
					</Modal>

					<Modal size = 'lg' show={this.state.commentShow} onHide={() => {this.setState({commentShow : false, commsExp : false})}}>
						<Modal.Header>
						<Modal.Title style={{textAlign : 'center'}}>
							Send Message
						</Modal.Title>
						<div 	onClick={() => {this.setState({commentShow : false, commsExp : false})}}
								style={{cursor : 'pointer', width : 'auto', margin : 'auto 0'}}
						>&#10006;
						</div>
						</Modal.Header>
						<Modal.Body>
							<div>
								{/* <div>
									{
										(this.state.commsExp) ? 
										<Scrollbar ref={this.scrollRef} style={{height : '10vh', width : '100%'}}>
											{this.comments.map((e) => {
												return <h5 style={{marginLeft : '2%'}}>{e}</h5>
											})}
										</Scrollbar>
										:
										<h5 style={{marginLeft : '2%', width : '97%'}}>{this.comments[this.comments.length-1]}</h5>
									}
								</div> */}
								
								<textarea onInput={(e) => {if(e.target.scrollHeight > e.target.clientHeight){e.target.style.height = `calc(${e.target.style.height}*2)`}}} ref={this.commentRef} style={{width : '100%', height : '10vh', maxHeight : '70vh'}}/>
							</div>
						</Modal.Body>
						<Modal.Footer>
						{/* <Button variant="secondary" onClick={() => {this.setState({commentShow : false, commsExp : false})}}>
							Close
						</Button> */}
						<div style={{background : 'transparent', cursor : 'pointer', marginRight : '1vw'}} 
							onClick={() => {this.sendMsg({username : this.props.username, date : new Date().toISOString().slice(0, -1), message : this.commentRef.current.value, type : 1});this.comments.push(this.commentRef.current.value); this.setState({commentShow : false, commsExp : false})}}>
							<FaPaperPlane size='1.5vw' color='blue'/>
						</div>
						{/* <Button variant="primary" onClick={() => {this.setState((state) => {return {commsExp : !state.commsExp}})}}>
							{(this.state.commsExp) ? 'Shrink' : 'Expand'}
						</Button> */}
						</Modal.Footer>
					</Modal>

					{/* User top = , left = , height = , width = */}
					<div style={{position : 'absolute', left : '5%', top : '50%', transform : 'translateY(-50%)', zIndex : 2}}>
						<Row>
							<Image src = '/icons/icon 2.png' style={{width : 'auto', height : this.state.height, margin : 'auto'}} alt=''/>
							<div style={{margin : 'auto'}}>
								<Dropdown>
									<Dropdown.Toggle style={{background : 'transparent', border : 'transparent'}}>{''}
									</Dropdown.Toggle>
									<Dropdown.Menu>
										{this.props.username ? <Dropdown.Item href="#">{this.props.username}</Dropdown.Item> :
											<InputGroup style={{padding : '0.2vw'}}>
												<FormControl placeholder='Username' ref={this.user}/>
												<Button onClick={() => {this.props.set(this.user.current.value)}}>{'\u2022'}</Button>
											</InputGroup>
										}
									</Dropdown.Menu>
								</Dropdown>
							</div>
							<div style={{margin : 'auto', marginLeft : '1vw'}}>
								{this.props.children}
							</div>

						</Row>
					</div>

					<div style={{cursor : 'pointer',position : 'absolute', left : '30%', top: '50%', transform : 'translateY(-50%)'}} onClick = {() => {this.setState({show : true})}}>
						<FaInfoCircle size='2vw' color='#1E90FF' style={{background : 'transparent'}}/>
					</div>
					<div style={{cursor : 'pointer',position : 'absolute', left : '33%', top: '50%', transform : 'translateY(-50%)'}} onClick = {() => {this.setState({commentShow : true})}}>
						<FaComment size='2vw' color='white' />
					</div>
					{/* Heading top = , left = , height = , width = */}
					<h1 style={{textAlign : 'center',
								position : 'absolute',
								left : '50%', 
								top : '50%', 
								transform: 'translate(-50%, -50%)', 
								color : 'white',
								fontSize : '2vw'
							}}
					>SMART INSIGHTS</h1>

					{/* Refresh top = , left = , height = , width = */}
					<div style={{position : 'absolute', right : '30%', top: '50%', transform : 'translateY(-50%)'}}> 
						<Image style={{width : '3vw', height : '3vw'}} src = '/icons/icon 1.png' alt=''/>
					</div>

					{/* Time top = , left = , height = , width = */}
					<div style={{textAlign : 'center',
								position : 'absolute',
								right : '10%', 
								top : this.state.height, 
								transform: 'translate(-50%, -50%)', 
								color : 'white',
								transition: 'transform 0.2s ease-in-out',
							}}
					>
						<Stack>
							<h3 style={{textAlign : 'center', color : Texture.light1, marginBottom : '-2%', fontSize : '3vh'}}>{this.state.time}</h3>
							<h6 style={{textAlign : 'center', fontSize : '2vh'}}>{this.state.date}</h6>
						</Stack>
					</div>

					{/* Ripik.ai top = , left = , height = , width = */}
					<div style={{position : 'absolute', right : '1%', top: '50%', transform : 'translateY(-50%)'}}> 
						<Image style={{width : 'auto', height : this.state.height}} src = '/icons/logo.png' alt=''/>
					</div>

				</Row>
			</Container>
			</Navbar>
		);
	}
}