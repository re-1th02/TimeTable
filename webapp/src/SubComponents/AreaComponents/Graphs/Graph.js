import React from 'react';
import {Collapse, Button, Container, Row, ButtonGroup, Stack, OverlayTrigger, Modal, Dropdown, DropdownButton, Navbar, CloseButton, Image} from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, PieChart, Pie, Tooltip, LabelList, Label } from 'recharts';
import Texture from '../../../Texture';
import Download from '../Download';

// height, width, data, x, list
class GraphChild extends React.Component{
	constructor(props){
		super(props);
		// title
	}
	render(){
		return(
			<div style={{color : 'white', width : this.props.width, height : this.props.height, margin : 'auto'}}>
				<ResponsiveContainer style={{cursor: 'pointer'}} width="100%" height="100%">
					<BarChart
					width='100%'
					height='100%'
					data={this.props.data}
					margin={{
						top: 0,
						right: 60,
						left: 0,
						bottom: 0,
					}}
					cursor = 'pointer'
					>
					<CartesianGrid strokeDasharray="0 1" />
					<XAxis dataKey={this.props.alt_x ? this.props.alt_x : this.props.x} 
							stroke='gold'
							style={{fontSize : this.props.fontSize.axis}}>
						<Label position='insideBottom' offset={-15} style={{textAnchor : 'middle', fontSize : this.props.fontSize.label}} fill='gold'>{this.props.title.x}</Label>
					</XAxis>
					<YAxis 	stroke='gold' 
							domain={[0, 'dataMax+1']} 
							scale='linear'
							style={{fontSize : this.props.fontSize.axis, paddingLeft : '0.5vw'}}>
						<Label position='insideLeft' offset={10} angle='270' style={{textAnchor : 'middle', fontSize : this.props.fontSize.label}} fill='gold'>{this.props.title.y}</Label>
					</YAxis>
					<Tooltip contentStyle={{background : Texture.light1, fontSize : this.props.fontSize.label}} 
                                itemStyle={{color : 'white', fontWeight : 800}} 
                                labelFormatter={(v) => {return `${this.props.x} : ${this.props.alt_x ? this.props.data[v-1][this.props.x] : v}`}}
								cursor={{fill : 'transparent', stroke : 'white'}}
                        />
					<Legend wrapperStyle={{fontSize : this.props.fontSize.legend, paddingTop : 20}} align='center' verticalAlign='bottom' />
					{Object.keys(this.props.list).map((e) => {
						return(
							<Bar key={e} dataKey={e} fill={this.props.list[e]}>
								{/* <LabelList dataKey={e} formatter={(e) => {if(e){return e}return null}} position='top' fill='white'/> */}
							</Bar>
						);
					})}
					{/* <Bar dataKey="pv" fill="#8884d8" />
					<Bar dataKey="uv" fill="#82ca9d" /> */}
					</BarChart>
				</ResponsiveContainer>
			</div>
		);
	}
}

export default class Graph extends React.Component{
	constructor(props){
		super(props);
        this.state = {do : false}
		// title
	}
	render(){
		return(
			<div onContextMenu={(e) => {this.setState({do : true}); e.preventDefault()}}>
                <Download do={this.state.do} undo={() => {this.setState({do : false})}} heading='Chart' name='PieChart' data={this.props.data}>
					<GraphChild	width={`24vw`}
								height={`18vw`}
								x={this.props.x}
								alt_x = {this.props.alt_x}
								data={this.props.data} 
								fontSize = {this.props.fontSize}
								title = {this.props.title}
								list ={this.props.list}/>
                </Download>
                <GraphChild	width={this.props.width}
							height={this.props.height}
							x={this.props.x}
							alt_x = {this.props.alt_x}
							data={this.props.data} 
							fontSize = {this.props.fontSize}
							title = {this.props.title}
							list ={this.props.list}/>
            </div>
		);
	}
}