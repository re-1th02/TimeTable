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
import ComposedCharts from '../Graphs/ComposedChart';
import Panel from '../Panel';
import HeatMap_child from '../Graphs/HeatMap';

const pie_dim = {height : 300, width : 500}
const fontSize = [{legend : '1vw', label : '1vw', axis : '0.95vw'}, {legend : '1.1vw', label : '1.1vw', axis : '0.95vw'}]

export default class Dashboard2 extends React.Component{
    constructor(props){
        super(props);
        this.state = {expand : false, loaded : 0, graph_id : 0, batch_id : 0}
        this.graphData = {}
        this.cols = {}
        this.colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#700000'];
        fetch('http://127.0.0.1:8000/?table=TPH_SRPH&cols=hour,SRPH,TPH').then(
            (res) => res.json()).then(
                (json) => {this.graphData['graph1'] = json.data; this.setState((state) => {return {loaded : state.loaded+1}})}
        ).catch(e => console.log(e))
        fetch('http://127.0.0.1:8000/?table=BATCH&cols=hour,Batch1,Batch2,Batch3,Batch4,Batch5,Batch6,Batch7,Batch8').then(
            (res) => res.json()).then(
                (json) => {this.graphData['graph2'] = json.data; this.cols['graph2'] = {}; Object.keys(this.graphData['graph2'][0]).map((k, i) => {if(i>0){this.cols['graph2'][k] = this.colors[i%this.colors.length]}}); this.setState((state) => {return {loaded : state.loaded+1}});}
        ).catch(e => console.log(e))
        fetch('http://127.0.0.1:8000/?table=TURN_TIME&cols=hour,T1,T2').then(
            (res) => res.json()).then(
                (json) => {this.graphData['graph3'] = json.data;this.setState((state) => {return {loaded : state.loaded+1}})}
        ).catch(e => console.log(e));
        this.changeExp = this.changeExp.bind(this);
    }
    changeExp(){
        this.setState((state) => {return {expand : !state.expand}})
    }
    render(){
        return(
            <Stack style={{minHeight : `calc(${this.props.height}*4/5)` , padding: 'auto', margin : 'auto'}}>
                {/* <div>
                    <div style={{display : 'inline-flex', background : 'Texture.darkgrad'}}>
                        <High head='Production' body='20%' width={180} height={80}/>
                        <High head='Turn Time' body='10%' width={180} height={80}/>
                        <High head='Avg SRPH' body='0.5' width={180} height={80}/>
                        <High head='NR' body='0.2' width={180} height={80}/>
                        <High head='test' body='Test' width={180} height={80}/>
                    </div>
                </div> */}
                {(this.state.loaded>2) ? 
                <div style={{display : 'inline-flex', margin : 'auto'}}>
                    {/* <Expand left={this.props.left} hide={this.state.expand} clicked={() => this.changeExp()} expandable style={{margin : 'auto', marginRight : '1vw'}}> */}
                            {/* <div style={{display : 'block', width : 'auto'}}>
                                <Button variant='secondary' style={{margin : '1%', background : ((this.state.graph_id) ? 'white' : Texture.lightgrad), color : ((!this.state.graph_id) ? 'white' : Texture.dark2)}} onClick={() => {this.setState({graph_id : 0})}}>TPH SRPH</Button>
                                <Button variant='secondary' style={{margin : '1%', background : ((this.state.graph_id) ? Texture.lightgrad : 'white'), color : ((!this.state.graph_id) ? Texture.dark2 : 'white')}} onClick={() => {this.setState({graph_id : 1})}}>TURN TIME</Button>
                            </div>
                            <div style={{margin : 'auto'}}>
                                {this.state.graph_id ? 
                                    <Graph  width={this.state.expand ? `min(calc(${this.props.width}*9/10), calc(${this.props.height}*4/3))`: `max(min(calc(${this.props.width}/3), calc(${this.props.height} - 200px)*2), 24vw)`}
                                    height={this.state.expand ? `min(calc(${this.props.width}*9/20), calc(${this.props.height}*2/3))` : `max(min(calc(${this.props.width}/6), calc(${this.props.height} - 200px)), 12vw)`}
                                    x='hour'
                                    data={this.graphData['graph3']} 
                                    list ={{'T1' : '#8884d8', 'T2' : '#82ca9d'}}/>
                                :
                                <ComposedCharts 	width={this.state.expand ? `min(calc(${this.props.width}*9/10), calc(${this.props.height}*4/3))`: `max(min(calc(${this.props.width}/3), calc(${this.props.height} - 200px)*2), 24vw)`}
                                    height={this.state.expand ? `min(calc(${this.props.width}*9/20), calc(${this.props.height}*2/3))` : `max(min(calc(${this.props.width}/6), calc(${this.props.height} - 200px)), 12vw)`}
                                    x='hour'
                                    data={this.graphData['graph1']} 
                                    list ={{'SRPH' : '#8884d8', 'TPH' : '#82ca9d'}}
                                    cols = {[{val : 'SRPH', type : 'line', id : '0'}, {val : 'TPH', type : 'area', id : '1'}]}
                                    yy = {[{val : '0', place : 'left', color :'#8884d8'}, {val : '1', place : 'right', color :'#82ca9d'}]}
                                />
                                }
                            </div> */}
                        <Stack style={{margin : 'auto'}}>
                            <Expand left={this.props.left} hide={this.state.expand} clicked={() => this.changeExp()} expandable style={{margin : 'auto', marginRight : '1vw', marginLeft : '1vw'}}>
                                <Panel big={this.props.enLarged && this.state.expand} head='TPH SRPH' style={{margin : 'auto', marginBottom : '2vh'}}>
                                    <ComposedCharts 
                                            width={this.state.expand ? `calc(${this.props.width}*8/10)`: `max(min(calc(${this.props.width}/3), calc(${this.props.height} - 200px)*2), 26vw)`}
                                            height={this.state.expand ? `calc(${this.props.height}*2/3)` : `max(min(calc(${this.props.width}/6), calc(${this.props.height} - 200px)), 15vw)`}
                                            x='hour'
                                            data={this.graphData['graph1']} 
                                            list ={{'SRPH' : '#8884d8', 'TPH' : '#82ca9d'}}
                                            cols = {[{val : 'SRPH', type : 'line', id : '0'}, {val : 'TPH', type : 'area', id : '1'}]}
                                            yy = {[{val : '0', place : 'left', color :'#8884d8'}, {val : '1', place : 'right', color :'#82ca9d'}]}
                                            fontSize={fontSize[this.props.enLarged ? 1 : 0]}
                                            title = {{x : 'Hour', y : ['Time (sec)', 'Turns']}}
                                    />
                                </Panel>
                            </Expand>
                            {/* <h3>TPH SRPH</h3> */}
                            <Expand left={this.props.left} hide={this.state.expand} clicked={() => this.changeExp()} expandable style={{margin : 'auto', marginRight : '1vw', marginLeft : '1vw'}}>
                                <Panel big={this.props.enLarged && this.state.expand} head="TURN TIME" style={{margin : 'auto'}}>
                                    <Graph  width={this.state.expand ? `calc(${this.props.width}*8/10)`: `max(min(calc(${this.props.width}/3), calc(${this.props.height} - 200px)*2), 26vw)`}
                                            height={this.state.expand ? `calc(${this.props.height}*2/3)` : `max(min(calc(${this.props.width}/6), calc(${this.props.height} - 200px)), 15vw)`}
                                            x='hour'
                                            data={this.graphData['graph3']} 
                                            list ={{'T1' : '#8884d8', 'T2' : '#82ca9d'}}
                                            title = {{x : 'Hour', y : 'Time (sec)'}}
                                            fontSize={fontSize[this.props.enLarged ? 1 : 0]}/>
                                </Panel>
                            </Expand>
                            {/* <h3>TURN TIME</h3> */}
                        </Stack>
                    <Expand left={this.props.left} hide={this.state.expand} clicked={() => this.changeExp()} expandable style={{color : 'black'}}>
                        <Stack>
                            {/* <h3>BATCH</h3> */}
                            <Panel big={this.props.enLarged && this.state.expand} head="BATCH">
                                {/* <div style={{display : 'block', width : 'auto', margin : 0}}>
                                    <Button variant='secondary' style={{margin : '1%', background : ((this.state.batch_id) ? 'white' : Texture.lightgrad), color : ((!this.state.batch_id) ? 'white' : Texture.dark2)}} onClick={() => {this.setState({batch_id : 0})}}>1-4</Button>
                                    <Button variant='secondary' style={{margin : '1%', background : ((this.state.batch_id) ? Texture.lightgrad : 'white'), color : ((!this.state.batch_id) ? Texture.dark2 : 'white')}} onClick={() => {this.setState({batch_id : 1})}}>5-8</Button>
                                </div>
                                <Graph 	width={this.state.expand ? `calc(${this.props.width}*9/10)`: `max(min(calc(${this.props.width}*2/3), calc(${this.props.height}*3/4)*2), 24vw)`}
                                        height={this.state.expand ? `min(calc(${this.props.width}*9/20), calc(${this.props.height}*2/3))` : `max(min(calc(${this.props.width}/3), calc(${this.props.height}*3/4)), 12vw)`}
                                        x='hour'
                                        data={this.graphData['graph2']} 
                                        list ={this.state.batch_id ? {Batch5 : '#0088FE', Batch6 : '#00C49F', Batch7 : '#FFBB28', Batch8 : '#FF8042'} : {Batch1 : '#0088FE', Batch2 : '#00C49F', Batch3 : '#FFBB28', Batch4 : '#FF8042'}}/> */}
                                <HeatMap_child 
                                    fontSize={this.props.enLarged ? {label : 19} : {label : 17}}
                                    width={this.state.expand ? `calc(${this.props.width}*8/10)`: `max(calc(${this.props.width}*5/9), 30vw)`}
                                    height={this.state.expand ? `min(calc(${this.props.width}*9/20), calc(${this.props.height}*2/3))` : `max(min(calc(${this.props.width}/3), calc(${this.props.height}*2/3)), 12vw)`}
                                    y={[...Array(8).keys()].map((i) => i+1)} 
                                    x={[...Array(8).keys()].map((i) => i+1).map((e) => `Batch${e}`)} data={this.graphData['graph2']}
                                    />
                            </Panel>
                        </Stack>
                    </Expand>
                    <Expand left={this.props.left} hide={this.state.expand} clicked={() => this.changeExp()} expandable>
                        {/* <Stack>
                            <h3>TURN TIME</h3>
                            <Graph  width={this.state.expand ? `min(calc(${this.props.width}*9/10), calc(${this.props.height}*4/3))`: `max(min(calc(${this.props.width}/3), calc(${this.props.height} - 200px)*2), 24vw)`}
                                    height={this.state.expand ? `min(calc(${this.props.width}*9/20), calc(${this.props.height}*2/3))` : `max(min(calc(${this.props.width}/6), calc(${this.props.height} - 200px)), 12vw)`}
                                    x='hour'
                                    data={this.graphData['graph3']} 
                                    list ={{'T1' : '#8884d8', 'T2' : '#82ca9d'}}/>
                        </Stack> */}
                    </Expand>
                </div>
                : null
                }
            </Stack>
        );
    }
}