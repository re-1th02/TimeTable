import React from 'react';
import Block from '../Block';
import Graph from '../Graphs/Graph';
import { Button, Container, Form, Stack, Col, Row, Tabs, Tab, Spinner } from 'react-bootstrap';
import Scrollbar from 'react-scrollbars-custom';
import './TableSet.css'
import LineCharts from '../Graphs/LineChart';
import AreaCharts from '../Graphs/AreaChart';
import Texture from '../../../Texture';
import Expand from '../../Expand';
import './TableSet.css'
import refreshGraphData from '../Functions';
import Piegraph from '../Graphs/PieGraph';
import './TableSet.css'
import High from '../High';
import Panel from '../Panel';

const pie_dim = {height : 300, width : 400}
const fontSize = [{legend : '0.9vw', label : '1vw'}, {legend : '1vw', label : '1.1vw'}]

export default class Dashboard1 extends React.Component{
    constructor(props){
        super(props);
        this.state = {expand : false, loaded : 0}
        this.piedata = {}
        fetch('http://127.0.0.1:8000/?table=dash_thk&cols=thickness,Percentage').then(
            (res) => res.json()).then(
                (json) => {this.piedata['plt_thick'] = json.data; this.setState((state) => {return {loaded : state.loaded+1}})}
        ).catch(e => console.log(e))
        fetch('http://127.0.0.1:8000/?table=dash_wid&cols=width,Percentage').then(
            (res) => res.json()).then(
                (json) => {this.piedata['plt_width'] = json.data;this.setState((state) => {return {loaded : state.loaded+1}})}
        ).catch(e => console.log(e))
        fetch('http://127.0.0.1:8000/?table=dash_len&cols=length,Percentage').then(
            (res) => res.json()).then(
                (json) => {this.piedata['plt_len'] = json.data;this.setState((state) => {return {loaded : state.loaded+1}})}
        ).catch(e => console.log(e));
        this.changeExp = this.changeExp.bind(this);
    }
    changeExp(){
        this.setState((state) => {return {expand : !state.expand}})
    }
    render(){
        return(
            <Stack>
                {/* <div>
                    <div style={{display : 'inline-flex', background : 'Texture.darkgrad'}}>
                        <High head='Production' body='20%' />
                        <High head='Turn Time'  body='10%' />
                        <High head='Avg SRPH'   body='0.5' />
                        <High head='NR'         body='0.2' />
                        <High head='test'       body='Test'/>
                    </div>
                </div> */}
                {(this.state.loaded>2) ? 
                <div style={{display : 'inline-flex', minWidth : '100%'}}>
                    <Expand left={this.props.left} hide={this.state.expand} clicked={() => this.changeExp()} expandable style={{margin : 'auto', marginRight : '1vw', marginLeft : '1vw'}}>
                        <Panel head = 'Plt Thick'>
                            <Piegraph 	width={this.state.expand ? `max(calc(${this.props.width}*9/10), 15vw)` : `max(calc(${this.props.width}*3/10), 20vw)`}
                                        height={`max(calc(${this.props.height}*3/4), 20vw)`}
                                        title='Plt Thick' 
                                        id='thickness' 
                                        var='Percentage' 
                                        data={this.piedata['plt_thick']} 
                                        style={{width : 'auto'}} 
                                        fontSize = {this.props.enLarged ? {label : '1.1vw', legend : '1vw'} : {label : '1vw', legend : '0.9vw'}}
                            />
                        </Panel>
                        {/* <Stack>
                            <h3>Plt Thick</h3>
                        </Stack> */}
                    </Expand>
                    <Expand left={this.props.left} hide={this.state.expand} clicked={() => this.changeExp()} expandable style={{margin : 'auto', marginRight : '1vw'}}>
                        <Panel head = 'Plt Width'>
                            <Piegraph 	width={this.state.expand ? `max(calc(${this.props.width}*9/10), 15vw)` : `max(calc(${this.props.width}*3/10), 20vw)`}
                                        height={`max(calc(${this.props.height}*3/4), 20vw)`}
                                        title='Plt Width' 
                                        id='width' 
                                        var='Percentage' 
                                        data={this.piedata['plt_width']} 
                                        style={{width : 'auto'}} 
                                        fontSize = {this.props.enLarged ? {label : '1.1vw', legend : '1vw'} : {label : '1vw', legend : '0.9vw'}}
                            />
                        </Panel>
                        {/* <Stack>
                            <h3>Plt Width</h3>
                            <Piegraph 	width={`max(min(calc(${this.props.width}/5), calc(${this.props.height} - 200px)*3/5), 12vw)`}
                                        height={`max(min(calc(${this.props.width}/3), calc(${this.props.height} - 200px)), 20vw)`} 
                                        title='Plt Width' 
                                        id='width' 
                                        var='Percentage' 
                                        data={this.piedata['plt_width']} 
                                        style={{width : 'auto'}} />
                        </Stack> */}
                    </Expand>
                    <Expand left={this.props.left} hide={this.state.expand} clicked={() => this.changeExp()} expandable style={{margin : 'auto'}}>
                        <Panel head = 'Plt Length'>
                            <Piegraph 	width={this.state.expand ? `max(calc(${this.props.width}*9/10), 15vw)` : `max(calc(${this.props.width}*3/10), 20vw)`}
                                        height={`max(calc(${this.props.height}*3/4), 20vw)`}
                                        title='Plt Length' 
                                        id='length' 
                                        var='Percentage' 
                                        data={this.piedata['plt_len']} 
                                        style={{width : 'auto'}} 
                                        fontSize = {this.props.enLarged ? {label : '1.1vw', legend : '1vw'} : {label : '1vw', legend : '0.9vw'}}
                            />
                        </Panel>
                        {/* <Stack>
                            <h3>Plt Length</h3>
                            <Piegraph 	width={`max(min(calc(${this.props.width}/5), calc(${this.props.height} - 200px)*3/5), 12vw)`}
                                        height={`max(min(calc(${this.props.width}/3), calc(${this.props.height} - 200px)), 20vw)`} 
                                        title='Plt Length' 
                                        id='length' 
                                        var='Percentage' 
                                        data={this.piedata['plt_len']} 
                                        style={{width : 'auto'}} />
                        </Stack> */}
                    </Expand>
                </div>
                : null
                }
                
            </Stack>
        );
    }
}