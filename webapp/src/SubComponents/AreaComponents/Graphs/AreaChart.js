import React from 'react';
import {Collapse, Button, Container, Row, ButtonGroup, Stack, OverlayTrigger, Modal, Dropdown, DropdownButton, Navbar, CloseButton, Image} from 'react-bootstrap';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, PieChart, Pie, Cell , Label, CartesianAxis, Tooltip} from 'recharts';
import Download from '../Download';

class AreaChart_child extends React.Component{
	constructor(props){
		super(props);
		if(this.props.colordep){
			let temp = (this.props.data.map((i) => i[this.props.colordep]))
			this.dataMax = Math.max(temp);
			this.dataMin = Math.min(temp);
			this.colorList = Object.keys(this.props.color).map((e) => (parseFloat(e)-this.dataMin))
		}
		console.log(this.props.domain_x)
		// title
	}
	componentDidUpdate(prevProps){
		if(prevProps.data !== this.props.data){
			this.render();
		}
	}
	render(){
		return(
			<div style={{color : 'white', width : this.props.width, height : this.props.height, minHeight : 225, minWidth : 450, margin : 'auto'}}>
				<ResponsiveContainer style={{cursor: 'pointer'}} width="100%" height="100%">
					<AreaChart
                        width='100%'
                        height='100%'
                        data={this.props.data}
                        margin={{
                            top: 30,
                            right: 100,
                            left: 30,
                            bottom: 0,
                        }}
                        cursor = 'pointer'
					>
					
					<CartesianGrid strokeDasharray="0 1" />
					<XAxis  domain={this.props.domain_x} 
							stroke='gold' 
							dataKey={this.props.alt_x ? this.props.alt_x : this.props.x} 
							type={this.props.number ? 'number' : 'category'} 
							style={{fontSize : this.props.fontSize.axis}}
					>
						<Label position='insideBottom' offset={-15} style={{textAnchor : 'middle', fontSize : this.props.fontSize.label}} fill='gold'>{this.props.title.x}</Label>
					</XAxis>
					<YAxis stroke='gold' 
							domain={this.props.domain} 
							scale='linear'
							style={{fontSize : this.props.fontSize.axis, paddingLeft : '0.5vw'}}
					>
						<Label position='insideLeft' offset={-10} angle='270' style={{textAnchor : 'middle', fontSize : this.props.fontSize.label}} fill='gold'>{this.props.title.y}</Label>
					</YAxis>
					<Tooltip contentStyle={{background : 'transparent', fontSize : this.props.fontSize.label}} 
                                itemStyle={{color : 'white'}} 
                                labelFormatter={(v) => {return `${this.props.x} : ${this.props.alt_x ? this.props.data[v-1][this.props.x] : v}`}}
								formatter={(v, n, p) => {if(v[0] && v[1]){return [v[1]-v[0], n]} return [v, n];}}
                        />
					<Legend wrapperStyle={{fontSize : this.props.fontSize.legend, paddingTop : 20}} align='center' verticalAlign='bottom' />
					{Object.keys(this.props.list).map((e, i) => {
						return(
							<Area 	isAnimationActive={false}
									type={this.props.nostep ? 'monotone' : 'step' }
									key={e} 
									dataKey={e} 
									fill={this.props.list[e].fill} 
									stroke={this.props.list[e].stroke ? this.props.list[e].stroke : this.props.list[e].fill} 
									legendType = 'diamond'
							>
							</Area>
						);
					})}
					{/* <Bar dataKey="pv" fill="#8884d8" />
					<Bar dataKey="uv" fill="#82ca9d" /> */}
					</AreaChart>
				</ResponsiveContainer>
			</div>
		);
	}
}
// height, width, data, x, list
export default class AreaCharts extends React.Component{
	constructor(props){
		super(props);
		this.state = {do : false}
		// title
	}
	render(){
		return(
			// do, undo(), heading, key, children, data
			<div onContextMenu={(e) => {this.setState({do : true}); e.preventDefault()}}>
				<Download do={this.state.do} undo={() => {this.setState({do : false})}} heading='Chart' name="graph" data={this.props.data}>
					<AreaChart_child height={250}
									width = {500}
									data  = {this.props.data}
									x     = {this.props.x}
									alt_x = {this.props.alt_x}
									list  = {this.props.list}
									domain= {this.props.domain}
									domain_x= {this.props.domain_x}
									number= {this.props.number}
									nostep= {this.props.nostep}
									onlyFirst={this.props.onlyFirst}
									fontSize = {this.props.fontSize}
									title = {this.props.title}
									/>
				</Download>
				<AreaChart_child height={this.props.height}
								 width = {this.props.width}
								 data  = {this.props.data}
								 x     = {this.props.x}
								 alt_x = {this.props.alt_x}
								 list  = {this.props.list}
								 domain= {this.props.domain}
								 domain_x= {this.props.domain_x}
								 number= {this.props.number}
								 nostep= {this.props.nostep}
								 onlyFirst={this.props.onlyFirst}
								 fontSize = {this.props.fontSize}
								 title = {this.props.title}
								 />
			</div>
			
		);
	}
}