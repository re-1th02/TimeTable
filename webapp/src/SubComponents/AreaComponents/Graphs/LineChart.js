import React from 'react';
import {Collapse, Button, Container, Row, ButtonGroup, Stack, OverlayTrigger, Modal, Dropdown, DropdownButton, Navbar, CloseButton, Image} from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, PieChart, Pie, Tooltip, Label } from 'recharts';
import Download from '../Download';

// height, width, data, x, list, cols
class LinChart_child extends React.Component{
    constructor(props){
		super(props);
		// title
	}
	render(){
		return(
			<div style={{color : 'white', width : this.props.width, height : this.props.height, minWidth : 450, minHeight : 225, margin : 'auto'}}>
				<ResponsiveContainer style={{cursor: 'pointer'}} width="100%" height="100%">
					<LineChart
                        width='100%'
                        height='100%'
                        data={this.props.data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 30,
                            bottom: 5,
                        }}
                        cursor = 'pointer'
					>
                        <CartesianGrid strokeDasharray="0 1" />
                        <XAxis dataKey={this.props.x} 
                                stroke='gold' 
                                style={{fontSize : this.props.fontSize.axis}}>
                            <Label position='insideBottom' offset={-15} style={{textAnchor : 'middle', fontSize : this.props.fontSize.label}} fill='gold'>{this.props.title.x}</Label>
                        </XAxis>
                        <YAxis domain={['dataMin-0.1', 'dataMax+0.1']} 
                                stroke='gold' 
                                scale='linear'
                                style={{fontSize : `min(${this.props.fontSize.axis}, calc(${this.props.width}/30))`, paddingLeft : '0.5vw'}}>
                            <Label position='insideLeft' offset={-5} angle='270' style={{textAnchor : 'middle', fontSize : this.props.fontSize.label}} fill='gold'>{this.props.title.y}</Label>
                        </YAxis>
                        <Tooltip contentStyle={{background : 'transparent', fontSize : this.props.fontSize.label}} 
                                itemStyle={{color : 'white'}} 
                                labelFormatter={(v) => {return `${this.props.x} : ${v}`}}
                        />
                        <Legend wrapperStyle={{fontSize : this.props.fontSize.legend, paddingTop : 20}} align='center' verticalAlign='bottom' />
                        {this.props.cols.map((e, i) => {
                            return(
                                <Line   dot={!this.props.noDot}
                                        key={e} 
                                        dataKey={e} 
                                        stroke={this.props.list[e].color} 
                                        strokeDasharray ={(this.props.list[e].dashed ? "3 3" : "1 0")}
                                        isAnimationActive={false}
                                />
                            );
                        })}
					{/* <Bar dataKey="pv" fill="#8884d8" />
					<Bar dataKey="uv" fill="#82ca9d" /> */}
					</LineChart>
				</ResponsiveContainer>
			</div>
		);
	}
}

export default class LineCharts extends React.Component{
	constructor(props){
		super(props);
        this.state = {do : false}
		// title
	}
	render(){
		return(
			<div onContextMenu={(e) => {this.setState({do : true}); e.preventDefault()}}>
                <Download do={this.state.do} undo={() => {this.setState({do : false})}} heading='Chart' name='graph' data={this.props.data}>
                    <LinChart_child height= {250}
                                    width = {500}
                                    data  = {this.props.data}
                                    x     = {this.props.x}
                                    list  = {this.props.list}
                                    cols  = {this.props.cols}
                                    fontSize = {this.props.fontSize}
                                    noDot = {this.props.noDot}
                                    title = {this.props.title}
                    />
                </Download>
                <LinChart_child height={this.props.height}
								width = {this.props.width}
								data  = {this.props.data}
								x     = {this.props.x}
								list  = {this.props.list}
                                cols  = {this.props.cols}
                                fontSize = {this.props.fontSize}
                                noDot = {this.props.noDot}
                                title = {this.props.title}
                />
            </div>
		);
	}
}