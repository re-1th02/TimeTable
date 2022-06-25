import React from 'react';
import { Scrollbar } from 'react-scrollbars-custom';
import {Table, Tab, Tabs, Row, ThemeProvider} from 'react-bootstrap';
import Texture from '../../../Texture';
import './TableSet.css';
import Block from '../Block';
import AreaCharts from '../Graphs/AreaChart';
import Expand from '../../Expand';
import Graph from '../Graphs/Graph';
import Panel from '../Panel';
import AreaApex from '../Graphs/ApexArea';

const val_color = {'3480' : 'black', '3490' : 'darkblue', '3500' : 'white', '3510' : 'red', '3520' : 'pink', '3530' : 'yellow', '_' : 'orange'};
const fontSize = [{legend : '1vw', label : '1.1vw', axis : '0.95vw'}, {legend : '1vw', label : '1.1vw', axis : '0.95vw'}]

class TableChild extends React.Component{
    constructor(props){
        super(props);
        this.minwidth = 80
    }
    render(){
        return(
                <Table size='sm' style={{color : 'white', textAlign : 'center', background : Texture.dark1, marginBottom : 0}}>
                    <thead style={{position : 'sticky', top : -1}}>
                        <tr >
                            <th style={{background : Texture.darkgrad, minWidth : this.minwidth}}>S.No</th>
                            {this.props.cols.map((e)=> {
                                return <th key={e} style={{background : Texture.darkgrad, minWidth : this.minwidth}}>{e}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {(this.props.data.map((e, i)=> {
                            return (
                                <tr id='hov' key={i}>
                                    <td >{i+1}</td>
                                    {this.props.cols.map((x, j) =>{
                                        return <td key={j}>{e[x]}</td>
                                    })}
                                </tr>
                            );
                        }))}
                    </tbody>
                </Table>
        );
    }
}

export default class TableSet extends React.Component{
    constructor(props){
        super(props);
        this.state = {slabs : this.props.tables[0].matrix.length, 
                    features : Object.keys(this.props.tables[0].matrix[0]).length, 
                    curr : 0,
                    expand : false
        }
        this.changeExp = this.changeExp.bind(this);

    }
    changeExp(){
        // if(this.state.expand){
        //     setTimeout(() => {this.props.scrollSet()}, 100 );
        // }
        // else{
        //     this.props.scrollGet();
        // }
        this.setState((state) => {return {expand : !state.expand}});
    }
    render(){
        return(
            <div>
                <Expand style={{marginTop : '1.3vh'}} left={this.props.left} hide={this.state.expand} clicked={() => this.changeExp()} expandable>
                    <Tabs onSelect={(e) => {this.setState({slabs : this.props.tables[e].matrix.length, features : Object.keys(this.props.tables[e].matrix[0]).length, curr : e})}} 
                        defaultActiveKey={this.state.curr} 
                    >
                        {this.props.tables.map((e, i) => {
                            return(
                                <Tab eventKey={i} title={e.title} style={{background : 'white', paddingLeft : 5}}>
                                    <div className="noScroll" style={{maxHeight : ((e.graph && !this.state.expand) ? `calc(${this.props.height}*2/5)` : `calc(${this.props.height}*3/4)`), overflow : 'scroll'}}>
                                        {/* <Scrollbar > */}
                                            <TableChild data={e.matrix} cols={Object.keys(e.matrix[0])}/>
                                        {/* </Scrollbar> */}
                                    </div>
                                </Tab>
                            );
                        })}
                    </Tabs>
                </Expand>
                {this.props.tables[this.state.curr].graph &&
                    <div style={{marginTop : 30, display : 'inline-flex'}}>
                        <Expand style={{margin : `${this.state.expand ? '0%' : '1vw'} 1vw`, minWidth : '45%'}} left={this.props.left} hide={this.state.expand} clicked={() => this.changeExp()} expandable>
                            <Panel big={this.props.enLarged && this.state.expand} head="Width">
                                <AreaCharts height={(this.state.expand) ? `calc(${this.props.height}*3/4)` : `max(min(calc(${this.props.height}*3/4), calc(${this.props.width}*9/20), 18vw)`}
                                            width={(this.state.expand) ? `calc(${this.props.width}*9/10)` : `max(calc(${this.props.width}*9/20), 24vw)`}
                                            data={this.props.tables[this.state.curr].matrix.map((e, i) => {return {SLABID : e.SLABID, 'Plt Width' : [-e.PLT_WIDTH/2, e.PLT_WIDTH/2], index : i+1}})} 
                                            x={'SLABID'} 
                                            alt_x = {'index'}
                                            list={{'Plt Width' : {fill : 'lightgreen', stroke : 'darkgreen'}}}
                                            domain={[-3000, 3000]}
                                            color = {(e) => {console.log(e);for(var i in val_color){if(e[1]-e[0]<=parseInt(i)){console.log(val_color[i]); return val_color[i]}}return val_color['_']}}
                                            fontSize={fontSize[this.props.enLarged ? 1 : 0]}
                                            title = {{x : 'Sequence', y : 'Width (in mm)'}}
                                />
                            </Panel>
                        </Expand>
                        <Expand style={{margin : `${this.state.expand ? '0%' : '1vw'} 1vw`, minWidth : '45%'}} left={this.props.left} hide={this.state.expand} clicked={() => this.changeExp()} expandable>
                            <Panel big={this.props.enLarged && this.state.expand} head="Thickness">
                                <Graph  height={(this.state.expand) ? `calc(${this.props.height}*3/4)` : `max(min(calc(${this.props.height}*3/4), calc(${this.props.width}*9/20), 18vw)`}
                                        width={(this.state.expand) ? `calc(${this.props.width}*9/10)` : `max(calc(${this.props.width}*9/20), 24vw)`}
                                        data={this.props.tables[this.state.curr].matrix.map((e, i) => {return {SLABID : e.SLABID, 'Plt Thick' : e.PLT_THK, index : i+1}})} 
                                        x={'SLABID'} 
                                        alt_x = {'index'}
                                        list ={{'Plt Thick' : '#8884d8'}}
                                        fontSize={fontSize[this.props.enLarged ? 1 : 0]}
                                        title = {{x : 'Sequence', y : 'Thickness (in mm)'}}
                                />
                            </Panel>
                        </Expand>
                    </div>
                }
                <Expand left={this.props.left} hide={this.state.expand} clicked={() => this.changeExp()} style={{position : 'absolute', top : '-0.5vh', right : '2%'}}>
                    <Row>
                        <fieldset style={{border : 'solid white 2px', minWidth : '6vw', margin : '0 0.2vw'}}>
                            <legend style={{margin : '0 5%', padding : '0 2%', textAlign : 'left' ,fontSize : '0.9vw', background : Texture.dark1, width : 'auto', borderRadius : 8}}>Slabs</legend>
                            <h5 style={{position : 'relative', 
                                        top : '50%', 
                                        textAlign : 'center'}}
                            >{this.state.slabs}</h5>
                        </fieldset>
                        <fieldset style={{border : 'solid white 2px', minWidth : '6vw', margin : '0 0.2vw'}}>
                            <legend style={{margin : '0 5%', padding : '0 2%', textAlign : 'left' ,fontSize : '0.9vw', background : Texture.dark1, width : 'auto', borderRadius : 8}}>Steel Grade</legend>
                            <h5 style={{position : 'relative', 
                                        top : '50%', 
                                        textAlign : 'center'}}
                            >{this.state.features-1}</h5>
                        </fieldset>
                    </Row>
                </Expand>
            </div>
        );
    }
}

// onSelect={(e1, e2) => {e2.target.style.background = Texture.lightgrad; e2.target.style.color = 'white'; if(this.elem){this.elem.style.background = 'white'; this.elem.style.color = 'black';} this.elem = e2.target;}}