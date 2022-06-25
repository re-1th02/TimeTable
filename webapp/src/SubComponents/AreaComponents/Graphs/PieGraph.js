import React from 'react';
import {Collapse, Button, Container, Row, ButtonGroup, Stack, OverlayTrigger, Modal, Dropdown, DropdownButton, Navbar, CloseButton, Image} from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import Download from '../Download';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#900000', '#A00000', '#d00000'];

class PiegraphChild extends React.Component{
	constructor(props){
		super(props);
		// title
	}
	render() {
		return (
			<div style={{color : 'white', width : this.props.width, height : this.props.height, margin : 'auto', position : 'relative'}}>
				<ResponsiveContainer width="100%" height="100%">
					<PieChart width='100%' height='100%' margin={{top : 0, left : 0, bottom : 0, right : 30}}>
					<Pie 
						dataKey={this.props.var}
						data={this.props.data} 
						cx="50%"
            			cy="50%"
						innerRadius='40%' 
						outerRadius='80%' 
						label = {(e) => {console.log(e); return `${e[this.props.var]}%`}}
						style={{fontSize : this.props.fontSize.label}}
						nameKey={this.props.id}
						>
						{this.props.data.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
						))}
					</Pie>
					<Tooltip contentStyle={{background : 'transparent'}} 
                                itemStyle={{color : 'white'}} 
                                // formatter={(v, n) => {console.log(v, n); return [`${this.props.id} : ${n}${'\n'}value : ${v}`, ''];}}
								// separator = '\n'
                        />
					<Legend wrapperStyle={{fontSize : this.props.fontSize.legend}}/>
					</PieChart>
				</ResponsiveContainer>
		  </div>
		);
	  }
}


export default class Piegraph extends React.Component{
	constructor(props){
		super(props);
        this.state = {do : false}
		// title
	}
	render(){
		return(
			<div onContextMenu={(e) => {this.setState({do : true}); e.preventDefault()}}>
                <Download do={this.state.do} undo={() => {this.setState({do : false})}} heading='Chart' name='PieChart' data={this.props.data}>
					<PiegraphChild 	width={`12vw`}
									height={`20vw`}
									title={this.props.title}
									id={this.props.id}
									var={this.props.var}
									data={this.props.data} 
									style={this.props.style} 
									fontSize = {this.props.fontSize}
					/>
                </Download>
                <PiegraphChild 	width={this.props.width}
								height={this.props.height}
								title={this.props.title}
								id={this.props.id}
								var={this.props.var}
								data={this.props.data} 
								style={this.props.style} 
								fontSize = {this.props.fontSize}
				/>
            </div>
		);
	}
}