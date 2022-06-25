import React from 'react';
import {Collapse, Button, Container, Row, ButtonGroup, Stack, OverlayTrigger, Modal, Dropdown, DropdownButton, Navbar, CloseButton, Image} from 'react-bootstrap';
import { Bar, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, ComposedChart, Tooltip, Label } from 'recharts';
import Download from '../Download';

// height, width, data, x, list, cols
class Comp_child extends React.Component{
    constructor(props){
		super(props);
        console.log(this.props.yy);
		// title
	}
	render(){
		return(
			<div style={{color : 'white', width : this.props.width, height : this.props.height, minWidth : 450, minHeight : 225, margin : 'auto'}}>
				<ResponsiveContainer style={{cursor: 'pointer'}} width="100%" height="100%">
					<ComposedChart
                        width='100%'
                        height='100%'
                        data={this.props.data}
                        margin={{
                            top: 0,
                            right: 50,
                            left: 0,
                            bottom: 0,
                        }}
                        cursor = 'pointer'
					>
                        <CartesianGrid strokeDasharray="0 1" />
                        <XAxis dataKey={this.props.x} stroke='gold' style={{fontSize : this.props.fontSize.axis}}>
                            <Label position='insideBottom' offset={-15} style={{textAnchor : 'middle', fontSize : this.props.fontSize.label}} fill='gold'>{this.props.title.x}</Label>
                        </XAxis>
                        {
                            this.props.yy.map((e, i) => {return <YAxis key = {e.val} 
                                                                    yAxisId = {e.val} 
                                                                    stroke={e.color} 
                                                                    orientation = {e.place} 
                                                                    scale='linear'
                                                                    style={{fontSize : this.props.fontSize.axis}}>
                                                                    <Label position={i ? 'insideRight' : 'insideLeft'} offset={10} angle='270' style={{textAnchor : 'middle', fontSize : this.props.fontSize.label}} fill='gold'>{this.props.title.y[i]}</Label>
                                                                </YAxis>
                                                    })
                        }
                        <Tooltip contentStyle={{background : 'transparent', fontSize : this.props.fontSize.label}} 
                                itemStyle={{color : 'white'}} 
                                labelFormatter={(v) => {return `${this.props.x} : ${v}`}}
                        />
                        <Legend wrapperStyle={{fontSize : this.props.fontSize.legend, paddingTop : 20}} align='center' verticalAlign='bottom' />
                        {this.props.cols.map((e, i) => {
                            return(
                                e.type === 'area' ?
                                <Line key={e.val} 
                                yAxisId = {e.id}
                                dataKey={e.val} 
                                stroke={this.props.list[e.val]}
                                fill={this.props.list[e.val]}
                                isAnimationActive={false}
                                />
                                :
                                <Bar   key={e.val} 
                                yAxisId = {e.id}
                                        dataKey={e.val} 
                                        fill={this.props.list[e.val]}
                                        isAnimationActive={false}
                                />
                            );
                        })}
					{/* <Bar dataKey="pv" fill="#8884d8" />
					<Bar dataKey="uv" fill="#82ca9d" /> */}
					</ComposedChart>
				</ResponsiveContainer>
			</div>
		);
	}
}

export default class ComposedCharts extends React.Component{
	constructor(props){
		super(props);
        this.state = {do : false}
		// title
	}
	render(){
		return(
			<div onContextMenu={(e) => {this.setState({do : true}); e.preventDefault()}}>
                <Download do={this.state.do} undo={() => {this.setState({do : false})}} heading='Chart' name='graph' data={this.props.data}>
                    <Comp_child height= {250}
                                    width = {500}
                                    data  = {this.props.data}
                                    x     = {this.props.x}
                                    list  = {this.props.list}
                                    cols  = {this.props.cols}
                                    yy = {this.props.yy}
                                    fontSize = {this.props.fontSize}
                                    title = {this.props.title}
                    />
                </Download>
                <Comp_child height={this.props.height}
								width = {this.props.width}
								data  = {this.props.data}
								x     = {this.props.x}
								list  = {this.props.list}
                                cols  = {this.props.cols}
                                fontSize = {this.props.fontSize}
                                title = {this.props.title}
                                yy = {this.props.yy}
                />
            </div>
		);
	}
}