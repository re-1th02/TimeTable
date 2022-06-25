import React from 'react';
import {Collapse, Button, Container, Row, ButtonGroup, Stack, OverlayTrigger, Tooltip, Modal, Dropdown, DropdownButton, Navbar, CloseButton, Image} from 'react-bootstrap';
import {Scrollbar} from 'react-scrollbars-custom'
import Texture from '../Texture';
import Imagee from '../img/button_4.png';
import Imagee_ from '../img/button_2.png';
import ChatBot from './AreaComponents/ChatBot';
import Space from './AreaComponents/Space';
import listenObj from './Exp_class';
import data from './AreaComponents/data';

const areaFontSize = 'max(0.95vw, 1.3vh)';

export default class Area extends React.Component{
	constructor(props){
		super(props);
		this.state= {left : 0, 
					right : 0, 
					prior : 0,
					height : this.props.height, 
					headHeight : this.props.headHeight, 
					enLargingLeft : false, 
					enLargingRight : false, 
					enLargingAlarm : false, 
					buttonsHeight : 0, 
					list : [],
					contentState : 0,
					chat : false
				};
		this.OneClick = this.OneClick.bind(this);
		this.lefty = React.createRef();
		this.righty = React.createRef();
		this.buttongroup = React.createRef();
		this.enLargeLeft = this.enLargeLeft.bind(this);
		this.enLargeRight = this.enLargeRight.bind(this);
		this.data = {
			Area1 : [{type : 'float', 	description : 'Production', 			value : 0.2, show : 'Production'},
					{type : 'float', 	description : 'Avg SRPH', 				value : 0.2, show : 'Avg SRPH'},
					{type : '%float',	description : '% of T1', 				value : 0.2, show : '% of T1'},
					{type : '%float',	description : '% of T2', 				value : 0.2, show : '% of T2'},
					{type : 'float', 	description : 'Avg T1', 				value : 0.2, show : 'Avg T1'},
					{type : 'float', 	description : 'Avg T2', 				value : 0.2, show : 'Avg T2'},
					{type : '%float',	description : '% of NR', 				value : 0.2, show : '% of NR'},
					{type : '%float',	description : '% of TMCP', 				value : 0.2, show : '% of TMCP'},
					{type : '%float',	description : '% of TMCR', 				value : 0.2, show : '% of TMCR'},
					{type : '%float',	description : '% of Mill loading time', value : 0.2, show : 'Mill loading'},
					{type : 'float', 	description : 'Avg slab to slab time', 	value : 0.2, show : 'Avg slab2slab'},
					{type : 'float', 	description : 'Avg Residence Time', 	value : 0.2, show : 'Avg Res. time'},
					{type : '%float',	description : 'RT Achieved %', value : 0.2, show : '% of RT'},
					{type : '%float',	description : 'FRT Achieved %', value : 0.2, show : '% of FRT'},
					{type : '%float',	description : 'FCT Achieved %', value : 0.2, show : '% of FCT'},
					{type : 'float',	description : 'RF High Count', value : 0.2, show : 'RF High Count'},
					{type : 'float',	description : 'Torque High Count', value : 0.2, show : 'Torque High Count'},
					{type : 'float',	description : 'Speed High Count', value : 0.2, show : 'Speed High Count'},
		],
			Area2 : [{type : 'float', 	description : 'Production', 			value : 0.2, show : 'Production'},{type : 'float', 	description : 'Avg SRPH', 				value : 0.2, show : 'Avg SRPH'},{type : '%float',	description : '% of T1', 				value : 0.2, show : '% of T1'},{type : '%float',	description : '% of T2', 				value : 0.2, show : '% of T2'},{type : 'float', 	description : 'Avg T1', 				value : 0.2, show : 'Avg T1'},{type : 'float', 	description : 'Avg T2', 				value : 0.2, show : 'Avg T2'},{type : '%float',	description : '% of NR', 				value : 0.2, show : '% of NR'},{type : '%float',	description : '% of TMCP', 				value : 0.2, show : '% of TMCP'},{type : '%float',	description : '% of TMCR', 				value : 0.2, show : '% of TMCR'},{type : '%float',	description : '% of Mill loading time', value : 0.2, show : 'Mill loading'},{type : 'float', 	description : 'Avg slab to slab time', 	value : 0.2, show : 'Avg slab2slab'},{type : 'float', 	description : 'Avg Residence Time', 	value : 0.2, show : 'Avg Res. time'}, {type : '%float',	description : 'RT Achieved %', value : 0.2, show : '% of RT'},{type : '%float',	description : 'FRT Achieved %', value : 0.2, show : '% of FRT'},{type : '%float',	description : 'FCT Achieved %', value : 0.2, show : '% of FCT'},{type : 'float',	description : 'RF High Count', value : 0.2, show : 'RF High Count'},{type : 'float',	description : 'Torque High Count', value : 0.2, show : 'Torque High Count'},{type : 'float',	description : 'Speed High Count', value : 0.2, show : 'Speed High Count'}],
			Area3 : [{type : 'float', 	description : 'Production', 			value : 0.2, show : 'Production'},{type : 'float', 	description : 'Avg SRPH', 				value : 0.2, show : 'Avg SRPH'},{type : '%float',	description : '% of T1', 				value : 0.2, show : '% of T1'},{type : '%float',	description : '% of T2', 				value : 0.2, show : '% of T2'},{type : 'float', 	description : 'Avg T1', 				value : 0.2, show : 'Avg T1'},{type : 'float', 	description : 'Avg T2', 				value : 0.2, show : 'Avg T2'},{type : '%float',	description : '% of NR', 				value : 0.2, show : '% of NR'},{type : '%float',	description : '% of TMCP', 				value : 0.2, show : '% of TMCP'},{type : '%float',	description : '% of TMCR', 				value : 0.2, show : '% of TMCR'},{type : '%float',	description : '% of Mill loading time', value : 0.2, show : 'Mill loading'},{type : 'float', 	description : 'Avg slab to slab time', 	value : 0.2, show : 'Avg slab2slab'},{type : 'float', 	description : 'Avg Residence Time', 	value : 0.2, show : 'Avg Res. time'}, {type : '%float',	description : 'RT Achieved %', value : 0.2, show : '% of RT'},{type : '%float',	description : 'FRT Achieved %', value : 0.2, show : '% of FRT'},{type : '%float',	description : 'FCT Achieved %', value : 0.2, show : '% of FCT'},{type : 'float',	description : 'RF High Count', value : 0.2, show : 'RF High Count'},{type : 'float',	description : 'Torque High Count', value : 0.2, show : 'Torque High Count'},{type : 'float',	description : 'Speed High Count', value : 0.2, show : 'Speed High Count'}],
			Area4 : [{type : 'float', 	description : 'Production', 			value : 0.2, show : 'Production'},{type : 'float', 	description : 'Avg SRPH', 				value : 0.2, show : 'Avg SRPH'},{type : '%float',	description : '% of T1', 				value : 0.2, show : '% of T1'},{type : '%float',	description : '% of T2', 				value : 0.2, show : '% of T2'},{type : 'float', 	description : 'Avg T1', 				value : 0.2, show : 'Avg T1'},{type : 'float', 	description : 'Avg T2', 				value : 0.2, show : 'Avg T2'},{type : '%float',	description : '% of NR', 				value : 0.2, show : '% of NR'},{type : '%float',	description : '% of TMCP', 				value : 0.2, show : '% of TMCP'},{type : '%float',	description : '% of TMCR', 				value : 0.2, show : '% of TMCR'},{type : '%float',	description : '% of Mill loading time', value : 0.2, show : 'Mill loading'},{type : 'float', 	description : 'Avg slab to slab time', 	value : 0.2, show : 'Avg slab2slab'},{type : 'float', 	description : 'Avg Residence Time', 	value : 0.2, show : 'Avg Res. time'}, {type : '%float',	description : 'RT Achieved %', value : 0.2, show : '% of RT'},{type : '%float',	description : 'FRT Achieved %', value : 0.2, show : '% of FRT'},{type : '%float',	description : 'FCT Achieved %', value : 0.2, show : '% of FCT'},{type : 'float',	description : 'RF High Count', value : 0.2, show : 'RF High Count'},{type : 'float',	description : 'Torque High Count', value : 0.2, show : 'Torque High Count'},{type : 'float',	description : 'Speed High Count', value : 0.2, show : 'Speed High Count'}],
			Area5 : [{type : 'float', 	description : 'Production', 			value : 0.2, show : 'Production'},{type : 'float', 	description : 'Avg SRPH', 				value : 0.2, show : 'Avg SRPH'},{type : '%float',	description : '% of T1', 				value : 0.2, show : '% of T1'},{type : '%float',	description : '% of T2', 				value : 0.2, show : '% of T2'},{type : 'float', 	description : 'Avg T1', 				value : 0.2, show : 'Avg T1'},{type : 'float', 	description : 'Avg T2', 				value : 0.2, show : 'Avg T2'},{type : '%float',	description : '% of NR', 				value : 0.2, show : '% of NR'},{type : '%float',	description : '% of TMCP', 				value : 0.2, show : '% of TMCP'},{type : '%float',	description : '% of TMCR', 				value : 0.2, show : '% of TMCR'},{type : '%float',	description : '% of Mill loading time', value : 0.2, show : 'Mill loading'},{type : 'float', 	description : 'Avg slab to slab time', 	value : 0.2, show : 'Avg slab2slab'},{type : 'float', 	description : 'Avg Residence Time', 	value : 0.2, show : 'Avg Res. time'}, {type : '%float',	description : 'RT Achieved %', value : 0.2, show : '% of RT'},{type : '%float',	description : 'FRT Achieved %', value : 0.2, show : '% of FRT'},{type : '%float',	description : 'FCT Achieved %', value : 0.2, show : '% of FCT'},{type : 'float',	description : 'RF High Count', value : 0.2, show : 'RF High Count'},{type : 'float',	description : 'Torque High Count', value : 0.2, show : 'Torque High Count'},{type : 'float',	description : 'Speed High Count', value : 0.2, show : 'Speed High Count'}],
			Area6 : [{type : 'float', 	description : 'Production', 			value : 0.2, show : 'Production'},{type : 'float', 	description : 'Avg SRPH', 				value : 0.2, show : 'Avg SRPH'},{type : '%float',	description : '% of T1', 				value : 0.2, show : '% of T1'},{type : '%float',	description : '% of T2', 				value : 0.2, show : '% of T2'},{type : 'float', 	description : 'Avg T1', 				value : 0.2, show : 'Avg T1'},{type : 'float', 	description : 'Avg T2', 				value : 0.2, show : 'Avg T2'},{type : '%float',	description : '% of NR', 				value : 0.2, show : '% of NR'},{type : '%float',	description : '% of TMCP', 				value : 0.2, show : '% of TMCP'},{type : '%float',	description : '% of TMCR', 				value : 0.2, show : '% of TMCR'},{type : '%float',	description : '% of Mill loading time', value : 0.2, show : 'Mill loading'},{type : 'float', 	description : 'Avg slab to slab time', 	value : 0.2, show : 'Avg slab2slab'},{type : 'float', 	description : 'Avg Residence Time', 	value : 0.2, show : 'Avg Res. time'}, {type : '%float',	description : 'RT Achieved %', value : 0.2, show : '% of RT'},{type : '%float',	description : 'FRT Achieved %', value : 0.2, show : '% of FRT'},{type : '%float',	description : 'FCT Achieved %', value : 0.2, show : '% of FCT'},{type : 'float',	description : 'RF High Count', value : 0.2, show : 'RF High Count'},{type : 'float',	description : 'Torque High Count', value : 0.2, show : 'Torque High Count'},{type : 'float',	description : 'Speed High Count', value : 0.2, show : 'Speed High Count'}],
			Area7 : [{type : 'float', 	description : 'Production', 			value : 0.2, show : 'Production'},{type : 'float', 	description : 'Avg SRPH', 				value : 0.2, show : 'Avg SRPH'},{type : '%float',	description : '% of T1', 				value : 0.2, show : '% of T1'},{type : '%float',	description : '% of T2', 				value : 0.2, show : '% of T2'},{type : 'float', 	description : 'Avg T1', 				value : 0.2, show : 'Avg T1'},{type : 'float', 	description : 'Avg T2', 				value : 0.2, show : 'Avg T2'},{type : '%float',	description : '% of NR', 				value : 0.2, show : '% of NR'},{type : '%float',	description : '% of TMCP', 				value : 0.2, show : '% of TMCP'},{type : '%float',	description : '% of TMCR', 				value : 0.2, show : '% of TMCR'},{type : '%float',	description : '% of Mill loading time', value : 0.2, show : 'Mill loading'},{type : 'float', 	description : 'Avg slab to slab time', 	value : 0.2, show : 'Avg slab2slab'},{type : 'float', 	description : 'Avg Residence Time', 	value : 0.2, show : 'Avg Res. time'}, {type : '%float',	description : 'RT Achieved %', value : 0.2, show : '% of RT'},{type : '%float',	description : 'FRT Achieved %', value : 0.2, show : '% of FRT'},{type : '%float',	description : 'FCT Achieved %', value : 0.2, show : '% of FCT'},{type : 'float',	description : 'RF High Count', value : 0.2, show : 'RF High Count'},{type : 'float',	description : 'Torque High Count', value : 0.2, show : 'Torque High Count'},{type : 'float',	description : 'Speed High Count', value : 0.2, show : 'Speed High Count'}],
			Area8 : [{type : 'float', 	description : 'Production', 			value : 0.2, show : 'Production'},{type : 'float', 	description : 'Avg SRPH', 				value : 0.2, show : 'Avg SRPH'},{type : '%float',	description : '% of T1', 				value : 0.2, show : '% of T1'},{type : '%float',	description : '% of T2', 				value : 0.2, show : '% of T2'},{type : 'float', 	description : 'Avg T1', 				value : 0.2, show : 'Avg T1'},{type : 'float', 	description : 'Avg T2', 				value : 0.2, show : 'Avg T2'},{type : '%float',	description : '% of NR', 				value : 0.2, show : '% of NR'},{type : '%float',	description : '% of TMCP', 				value : 0.2, show : '% of TMCP'},{type : '%float',	description : '% of TMCR', 				value : 0.2, show : '% of TMCR'},{type : '%float',	description : '% of Mill loading time', value : 0.2, show : 'Mill loading'},{type : 'float', 	description : 'Avg slab to slab time', 	value : 0.2, show : 'Avg slab2slab'},{type : 'float', 	description : 'Avg Residence Time', 	value : 0.2, show : 'Avg Res. time'}, {type : '%float',	description : 'RT Achieved %', value : 0.2, show : '% of RT'},{type : '%float',	description : 'FRT Achieved %', value : 0.2, show : '% of FRT'},{type : '%float',	description : 'FCT Achieved %', value : 0.2, show : '% of FCT'},{type : 'float',	description : 'RF High Count', value : 0.2, show : 'RF High Count'},{type : 'float',	description : 'Torque High Count', value : 0.2, show : 'Torque High Count'},{type : 'float',	description : 'Speed High Count', value : 0.2, show : 'Speed High Count'}],
			Area9 : [{type : 'float', 	description : 'Production', 			value : 0.2, show : 'Production'},{type : 'float', 	description : 'Avg SRPH', 				value : 0.2, show : 'Avg SRPH'},{type : '%float',	description : '% of T1', 				value : 0.2, show : '% of T1'},{type : '%float',	description : '% of T2', 				value : 0.2, show : '% of T2'},{type : 'float', 	description : 'Avg T1', 				value : 0.2, show : 'Avg T1'},{type : 'float', 	description : 'Avg T2', 				value : 0.2, show : 'Avg T2'},{type : '%float',	description : '% of NR', 				value : 0.2, show : '% of NR'},{type : '%float',	description : '% of TMCP', 				value : 0.2, show : '% of TMCP'},{type : '%float',	description : '% of TMCR', 				value : 0.2, show : '% of TMCR'},{type : '%float',	description : '% of Mill loading time', value : 0.2, show : 'Mill loading'},{type : 'float', 	description : 'Avg slab to slab time', 	value : 0.2, show : 'Avg slab2slab'},{type : 'float', 	description : 'Avg Residence Time', 	value : 0.2, show : 'Avg Res. time'}, {type : '%float',	description : 'RT Achieved %', value : 0.2, show : '% of RT'},{type : '%float',	description : 'FRT Achieved %', value : 0.2, show : '% of FRT'},{type : '%float',	description : 'FCT Achieved %', value : 0.2, show : '% of FCT'},{type : 'float',	description : 'RF High Count', value : 0.2, show : 'RF High Count'},{type : 'float',	description : 'Torque High Count', value : 0.2, show : 'Torque High Count'},{type : 'float',	description : 'Speed High Count', value : 0.2, show : 'Speed High Count'}],
			Area10 :[{type : 'float', 	description : 'Production', 			value : 0.2, show : 'Production'},{type : 'float', 	description : 'Avg SRPH', 				value : 0.2, show : 'Avg SRPH'},{type : '%float',	description : '% of T1', 				value : 0.2, show : '% of T1'},{type : '%float',	description : '% of T2', 				value : 0.2, show : '% of T2'},{type : 'float', 	description : 'Avg T1', 				value : 0.2, show : 'Avg T1'},{type : 'float', 	description : 'Avg T2', 				value : 0.2, show : 'Avg T2'},{type : '%float',	description : '% of NR', 				value : 0.2, show : '% of NR'},{type : '%float',	description : '% of TMCP', 				value : 0.2, show : '% of TMCP'},{type : '%float',	description : '% of TMCR', 				value : 0.2, show : '% of TMCR'},{type : '%float',	description : '% of Mill loading time', value : 0.2, show : 'Mill loading'},{type : 'float', 	description : 'Avg slab to slab time', 	value : 0.2, show : 'Avg slab2slab'},{type : 'float', 	description : 'Avg Residence Time', 	value : 0.2, show : 'Avg Res. time'}, {type : '%float',	description : 'RT Achieved %', value : 0.2, show : '% of RT'},{type : '%float',	description : 'FRT Achieved %', value : 0.2, show : '% of FRT'},{type : '%float',	description : 'FCT Achieved %', value : 0.2, show : '% of FCT'},{type : 'float',	description : 'RF High Count', value : 0.2, show : 'RF High Count'},{type : 'float',	description : 'Torque High Count', value : 0.2, show : 'Torque High Count'},{type : 'float',	description : 'Speed High Count', value : 0.2, show : 'Speed High Count'}],
		}
		this.leftScroll = React.createRef();
		this.rightScroll = React.createRef();
		this.leftScrollPos =  {top : 0, left : 0};
		this.rightScrollPos =  {top : 0, left : 0};
		this.callBackLeft = ((e) => {if(e.key === "Escape" && this.state.list.length && this.state.list[this.state.list.length-1]===0){this.enLargeLeft();}})
		this.callBackRight = ((e) => {if(e.key === "Escape" && this.state.list.length && this.state.list[this.state.list.length-1]===0){this.enLargeRight();}})
		this.app = this.app.bind(this);
		this.pop = this.pop.bind(this);
	}
	app(num){
		this.setState((state) => {return {list : [...state.list, num]}});
	}
	pop(){
		this.setState((state) => {return {list : state.list.slice(0, state.list.length-1)}});
	}
	componentDidMount(){
        const timer = setInterval(this.setState({buttonsHeight : this.buttongroup.current.clientHeight}), 1000);
        clearInterval(timer);
		this.cont = document.getElementById('cont');
	}
    componentDidUpdate(prevProps){
        if (prevProps.list !== this.props.list){
			this.lefty.current.style.opacity = 0;
			this.righty.current.style.opacity = 0;
            this.setState({left : 0, right : 0, contentState : 0});
			if(this.state.enLargingLeft){
				this.enLargeLeft();
			}
			else if(this.state.enLargingRight){
				this.enLargeRight();
			}
        }
		if (prevProps.height !== this.props.height || prevProps.hide !== this.props.hide){
			this.setState({height : this.props.height});
			this.setState({headHeight : this.props.headHeight});
		}
		if(this.buttongroup.current && this.state.buttonsHeight !==this.buttongroup.current.clientHeight){
			this.setState({buttonsHeight : this.buttongroup.current.clientHeight});
		}
    }
	OneClick(num){
		if(this.state.contentState===0){
			this.setState({left : num, contentState : 1});
			return;
		}
		else if(this.state.contentState===1){
			if(this.state.left===num){
				this.lefty.current.style.opacity = 0;
				if(listenObj.left.listening){listenObj.left.end();}
				this.setState({left : 0, contentState : 0});
			}
			else{
				this.setState({right : num, contentState : 2});
			}
			return;
		}
		else if(this.state.contentState===2){
			if(this.state.left===num){
				this.lefty.current.style.opacity = 0;
				if(listenObj.left.listening){listenObj.left.end();}
				this.setState({left : 0, prior : 1, contentState : 3});
			}
			else if(this.state.right===num){
				this.righty.current.style.opacity = 0;
				if(listenObj.right.listening){listenObj.right.end();}
				this.setState({right : 0, contentState : 1});
			}
			else{
				if(listenObj.right.listening){listenObj.right.end();}
				this.setState({right : num});
			}
			return;
		}
		else{
			if(this.state.right===num){
				this.righty.current.style.opacity = 0;
				if(listenObj.right.listening){listenObj.right.end();}
				this.setState({prior: 0, right : 0, contentState : 0});
			}
			else{
				this.setState({prior : 0, left : num, contentState : 2})
			}
			return;
		}
	}
	enLargeLeft(){
		if(!this.state.enLargingLeft){
			listenObj.leftFS.start(this.enLargeLeft);
		}
		else{
			listenObj.leftFS.end();
		}
		this.setState((state) => {return {enLargingLeft : !state.enLargingLeft}});
		this.props.hideContent();
	}
	enLargeRight(){
		if(!this.state.enLargingRight){
			listenObj.rightFS.start(this.enLargeRight);
		}
		else{
			listenObj.rightFS.end();
		}
		this.setState((state) => {return {enLargingRight : !state.enLargingRight}});
		this.props.hideContent();
	}
	render(){
		return(
			<div style={(this.props.hide) ? {height : 0, overflow : 'hidden'} : {height : '100%'}}>
			<Container fluid style={{background : Texture.dark2}}>
				<Row style={{height : '100%', position : 'relative'}}>
				<div style={{width : ((this.state.enLargingLeft || this.state.enLargingRight) ? 0 : 'auto'), 
							height : (this.state.enLargingLeft || this.state.enLargingRight) ? 0 : '100%', 
							background : Texture.darkgrad_, 
							minHeight : ((this.state.enLargingLeft || this.state.enLargingRight) ? 0 : `calc(97vh - ${this.state.height}px)`), 
							transition : 'width 0.5s',
							position : 'relative'}}>
				
				{(!this.state.enLargingLeft && !this.state.enLargingRight) &&  <div>
				<div ref={this.buttongroup}>
				{(!this.state.enLargingAlarm) && <ButtonGroup vertical style={{height : '100%', marginTop : '2vh'}}>
					{this.props.list.map((num) => 
						<Button variant = ''
								draggable = {(this.state.left!==num && this.state.right!==num)}
								onDragStart = {(event) => {event.dataTransfer.setData('id', num)}}
								key = {num} 
								// onDoubleClick={() => this.DoubleClick(num)} 
								onClick={() => this.OneClick(num)}
								style ={{
									backgroundImage : (this.state.left===num || this.state.right===num) ? `url(${Imagee_})` : `url(${Imagee})` ,
									backgroundSize : '100% 100%',
									color : 'white',
									width : '10vw',
									height : '4.8vh',
									margin : '0.2vw',
									minHeight : 25,
									fontSize : 'max(0.9vw, 1.3vh)'
								}}
						><div style={{position : 'relative', top : '50%', transform : 'translateY(-50%)', textAlign : 'center'}}>{(`Area${num}` in data) ? data[`Area${num}`].title : `Area${num}`}</div></Button>
					)}
				</ButtonGroup>}
				</div>
				</div>}
				</div>

				<fieldset
					ref={this.lefty} 
					onDragOver={(event) => {event.preventDefault()}}
					onDrop = {(event) => {this.setState((state) => {if(state.contentState===0){return {contentState : 1, left : parseInt(event.dataTransfer.getData('id'))}} else{ return {left : parseInt(event.dataTransfer.getData('id'))} } })}}
					style={{
						height : ((this.state.enLargingLeft) ? `calc(97vh - ${this.state.headHeight}px)` : (this.state.enLargingRight) ? 0 : 'auto') ,
						opacity : 0, 
						width : ((this.state.enLargingLeft) ? '100vw' : (this.state.enLargingRight) ? 0 : `${ (1-this.state.prior)*(86/(1 + (this.state.right>0)))+ this.state.prior*(43*(this.state.left>0)) }vw`), 
						margin : '0 0.3vw', 
						marginTop : (this.state.enLargingLeft) ? 0 : '-0.5%' ,
						textAlign : 'center', 
						background : Texture.darkgrad,
						border : 'solid white 1px',
						overflow : 'hidden',
						color : 'white', transition : 'opacity 0.2s, width 0.2s, height 0.5s'
					}}
				>
					{(!this.state.enLargingRight) && 
						<legend style={{marginRight : '5%', padding : '0 1%', width : 'max(5vw, 7%)', display : 'flex', textAlign : 'right'}}> 
							<div 	onClick={() => {this.enLargeLeft()}} 
									onMouseEnter={(e) => {e.target.innerHTML='&#9635;'}} 
									onMouseLeave={(e) => {e.target.innerHTML='&#9634;'}} 
									style={{cursor : 'pointer', width : 'auto', margin : 'auto'}}
							>&#9634;
							</div>
							<div 	onClick={() => {if(this.state.enLargingLeft){this.enLargeLeft()}this.OneClick(this.state.left)}} 
									onMouseEnter={(e) => {e.target.style.color = 'red'}} 
									onMouseLeave={(e) => {e.target.style.color = 'white'}} 
									style={{cursor : 'pointer', width : 'auto', margin : 'auto'}}
							>&#10006;
							</div> 
						</legend>
					}
				{(this.state.left > 0) && (this.lefty.current.style.opacity = 1) && 
					<Scrollbar ref={this.leftScroll} contentProps={{transition : 'all 2s'}}>
						<Space 	width={(this.state.enLargingLeft) ? '100vw' : (this.state.enLargingRight) ? 0 : `${ (1-this.state.prior)*(86/(1 + (this.state.right>0)))+ this.state.prior*(43*(this.state.left>0)) }vw`} 
								height={(this.state.enLargingLeft) ? `calc(97vh - ${this.state.headHeight+1}px)` : (this.state.enLargingRight) ? 0 : `calc(97vh - ${this.state.height+1}px)`} 
								num = {this.state.left}
								list={this.data[`Area${this.state.left}`]} 
								esc={this.state.list.length && this.state.list[this.state.list.length-1]===1} 
								app={() => this.app(1)} 
								pop={() => this.pop()}
								left={true}
								scrollGet = {() => {if(this.leftScroll.current){this.leftScrollPos = {top : this.leftScroll.current.scrollTop, left : this.leftScroll.current.scrollLeft}}}}
								scrollSet = {() => {this.leftScroll.current.scrollTo(this.leftScrollPos.left,this.leftScrollPos.top); this.leftScrollPos = {top : 0, left : 0};}}
								enLarged={this.state.enLargingLeft}
								/>
						
					</Scrollbar>}
				</fieldset>
				
				<fieldset 
					ref={this.righty}
					onDragOver={(event) => {event.preventDefault()}}
					onDrop = {(event) => {this.setState({right : parseInt(event.dataTransfer.getData('id'))})}} 
					style={{height : ((this.state.enLargingRight) ? `calc(97vh - ${this.state.headHeight}px)` : (this.state.enLargingLeft) ? 0 : 'auto'), 
							opacity : 0, 
							width : ((this.state.enLargingRight) ? '100vw' : (this.state.enLargingLeft) ? 0 : `${ (this.state.prior)*(86/(1 + (this.state.left>0)))+ (1-this.state.prior)*(43*(this.state.right>0)) }vw`), 
							margin: '0 0.1vw', 
							marginTop : (this.state.enLargingRight) ? 0 : '-0.5%' ,
							background : Texture.darkgrad,
							border : 'solid white 1px',
							color : 'white', 
							textAlign : 'center', 
							transition : 'opacity 0.2s, width 0.2s'
						}}
				>
				{(!this.state.enLargingLeft) && 
					<legend style={{marginRight : '5%', padding : '0 1%', width : 'max(5vw, 7%)', display : 'flex', textAlign : 'right'}}> 
						<div 	onClick={() => {this.enLargeRight()}} 
								onMouseEnter={(e) => {e.target.innerHTML='&#9635;'}} 
								onMouseLeave={(e) => {e.target.innerHTML='&#9634;'}} 
								style={{cursor : 'pointer', width : 'auto', margin : 'auto'}}
						>&#9634;
						</div>
						<div 	onClick={() => {if(this.state.enLargingRight){this.enLargeRight()}this.OneClick(this.state.right)}} 
								onMouseEnter={(e) => {e.target.style.color = 'red'}} 
								onMouseLeave={(e) => {e.target.style.color = 'white'}} 
								style={{cursor : 'pointer', width : 'auto', margin : 'auto'}}
						>&#10006;
						</div> 
					</legend>
				}
				{(this.state.right > 0) && (this.righty.current.style.opacity = 1) && 
					<Scrollbar ref={this.rightScroll}>
						<Space 	width={(this.state.enLargingRight) ? '100vw' : (this.state.enLargingLeft) ? 0 : `${ (this.state.prior)*(86/(1 + (this.state.left>0)))+ (1-this.state.prior)*(43*(this.state.right>0)) }vw`} 
								height={(this.state.enLargingRight) ? `calc(97vh - ${this.state.headHeight+1}px)` : (this.state.enLargingLeft) ? 0 : `calc(97vh - ${this.state.height+1}px)`} 
								num = {this.state.right} list={this.data[`Area${this.state.right}`]} 
								esc={this.state.list.length && this.state.list[this.state.list.length-1]===2} 
								app={() => this.app(2)} pop={() => this.pop()}
								left={false}
								scrollGet = {() => {if(this.rightScroll.current){this.rightScrollPos = {top : this.rightScroll.current.scrollTop, left : this.rightScroll.current.scrollLeft}}}}
								scrollSet = {() => {this.rightScroll.current.scrollTop = this.rightScrollPos.top; this.rightScroll.current.scrollLeft = this.rightScrollPos.left; this.rightScrollPos = {top : 0, left : 0}}}
								enLarged={this.state.enLargingRight}
						/>
					</Scrollbar>}
				</fieldset> 
				<div style={{position : 'absolute', bottom : 0}}>
						{this.state.chat && 
							<ChatBot hide={() => {this.setState((state) => {return {chat : !state.chat}})}}/>
						}
						<Button style={{width : '2.2vw', height : '2.2vw', fontSize : '0.8vw', fontWeight : '1000'}} onClick={() => {this.setState((state) => {return {chat : !state.chat}})}}>&raquo;</Button>
				</div>


				{/* </Collapse> */}
				</Row>
			</Container>
			<div style={{height : '3vh', width : '100vw'}} />
			</div>
		);
	}
}










				