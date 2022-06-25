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
import Panel from '../Panel';

const fixed_data = {
    thickness : {
        x : 'length',
        colors : {'thickness' : {color : '#8884d8', dashed : false}, 
                    'LL' : {color : '#82ca9d', dashed : false},
                    'UL' : {color : '#82ca9d', dashed : false},
                    'OS' : {color : '#D2ca8d', dashed : false},
                    'DS' : {color : '#02ca7d', dashed : false},
                }
    },
    temp : {
        x : 'length',
        colors : {  'FCT' : {color : '#8884d8', dashed : false}, 
                    'FRT' : {color : '#82ca9d', dashed : false},
                    'SCT' : {color : '#95532d', dashed : false},
                }
    },
    width : {
        x : 'length',
        colors : {'width' : {fill : '#8884d8'}, 'Max' : {fill : 'transparent', stroke : '#2884d8'}, Min : {fill : 'transparent', stroke : '#2884d8'}},
    }
}
const fontSize = [{legend : '1vw', label : '1.1vw', axis : '0.95vw'}, {legend : '1vw', label : '1.1vw', axis : '0.95vw'}]

export default class SearchGraph extends React.Component{
    constructor(props){
        super(props);
        this.state = {  id : null,
                        thickness_id : 0,
                        temp_id : 0,
                        expand : false,
                        rend : {FRT : false, FCT : false, SCT : false},
                        colors : {},
                        current : 0,
                        prev : [],
                        next : [],
                        list : []
        }
        this.ref = React.createRef();
        // this.refresh = this.refresh.bind(this);

        this.history = [];

        fetch('http://127.0.0.1:8000/performance/start/').then(
            (res) => res.json()).then(
                (json) => {var l = []; l.push(json); if(json.id){this.setState({id : json.id, list : l}); if(this.ref.current){this.ref.current.value = json.id}}}
        ).catch(e => console.log(e));

        fetch('http://127.0.0.1:8000/performance/start/next').then(
            (res) => res.json()).then(
                (json) => {var temp = []; var l= this.state.list; for(var i=0; i<json.data.length; i++){l.push(json.data[i]); temp.push(i+1);} console.log(temp); this.setState({prev : temp, list : l})}
        ).catch(e => console.log(e));
    }
    getData(idd){
        // for(var i in this.state.list){
        //     this.history.push(this.state.list[i]);
        // }
        console.log(idd);
        
        fetch(`http://127.0.0.1:8000/performance/search/?id=${idd}`).then(
            (res) => res.json()).then(
                (json) => {this.setState({next : [], prev : [], id : json.id, list : [json], current : 0});
                fetch(`http://127.0.0.1:8000/performance/around/?id=${idd}`).then(
                    (res) => res.json()).then(
                        (json) => { var temp = []; var l = this.state.list; var temp_ = [];
                                    for(var i in json.next){l.push(json.next[i]); temp.push(l.length-1);}
                                    for(i in json.prev){l.push(json.prev[i]); temp_.push(l.length-1);} 
                                    this.setState({prev : temp, next : temp_, list : l});
                                    }
                ).catch(e => console.log(e));
            }
        ).catch(e => console.log(e));
    }
    changeExp(){
        this.setState((state) => {return {expand : !state.expand}})
    }
    render(){
        return(
            <Stack >
                <Expand left={this.props.left} hide={this.state.expand} clicked={() => this.changeExp()} >
                    <Form onSubmit={e => {e.preventDefault();this.getData(this.ref.current.value);}}>
                        <Form.Group className='mb-3' style={{position : 'relative'}}>
                            <Form.Label>Slab ID</Form.Label>
                            <div style={{width : 300, position : 'relative', left : '50%', transform : 'translateX(-45%)', display : 'flex'}}>
                                <Button style={{position : 'relative', 
                                                background : (this.state.prev.length ? Texture.lightgrad : 'white'), 
                                                color : (!this.state.prev.length ? Texture.dark2 : 'white'), 
                                                borderRadius : '50%'}}
                                        disabled = {!this.state.prev.length}
                                        onClick = {() => {  let temp1 = this.state.prev; 
                                                            let temp2 = this.state.next; 
                                                            let x = temp1[temp1.length-1]; 
                                                            console.log(this.state.list, x);
                                                            temp1.pop(); 
                                                            temp2.push(this.state.current); 
                                                            this.setState({current : x, prev : temp1, next : temp2});
                                                            if(this.ref.current){this.ref.current.value = this.state.list[x].id;}
                                                        }
                                                }
                                >&#8249;</Button>
                                <Form.Control autoComplete='on' ref={this.ref} placeholder='A123456' style={{width : 200}}></Form.Control>
                                <Button style={{position : 'relative', 
                                                background : (this.state.next.length ? Texture.lightgrad : 'white'), 
                                                color : (!this.state.next.length ? Texture.dark2 : 'white'), 
                                                borderRadius : '50%'}}
                                        disabled = {!this.state.next.length}
                                        onClick = {() => {  let temp1 = this.state.prev; 
                                                            let temp2 = this.state.next; 
                                                            let x = temp2[temp2.length-1]; 
                                                            console.log(x);
                                                            temp2.pop(); 
                                                            temp1.push(this.state.current); 
                                                            this.setState({current : x, prev : temp1, next : temp2});
                                                            if(this.ref.current){this.ref.current.value = this.state.list[x].id;}
                                                        }
                                                }
                                >&#8250;</Button>
                                {(this.state.loading) && <Spinner animation='grow' style={{marginLeft : 5}}/>}
                            </div>
                        </Form.Group>
                        <Button onClick={() => {this.getData(this.ref.current.value);}}>
                            Go
                        </Button>
                    </Form>
                </Expand>
                {
                    (this.state.id) && 
                    <Stack>
                        {/* <div className="noScroll" style={{marginTop : 10, marginBottom : 20, width : '100%', overflow : 'scroll', height : 120}}> */}
                        <Expand left={this.props.left} hide={this.state.expand} clicked={() => this.changeExp()}>
                            <Container style={{marginTop : 10, marginBottom : 20}}>
                                <div style={{display : 'inline-flex'}}>
                                    {Object.keys(this.props.data['A123456'].features).map((e) => {
                                        return(
                                            <Block height={50} margin={5} head={e} body={this.props.data['A123456'].features[e]} />
                                        )
                                    })}
                                </div>
                            </Container>
                        </Expand>
                        {/* </div> */}
                        <div className="noScroll" style={true ? {width : '100%', margin : 'auto'} : {width : '100%', overflowX : 'scroll', overflowY : 'hidden'}}>
                            <Stack>
                                <div style={{display : 'flex', margin : '0 1vw'}}>
                                    <Expand style={{border : `solid ${Texture.light1} 2px`,margin : '0.5vw auto', marginRight : this.state.expand ? 'auto' : '0.5vw'}} left={this.props.left} hide={this.state.expand} clicked={() => this.changeExp()} expandable>
                                            <div style={{display : 'block', width : 'auto'}}>
                                                <Button variant='secondary' style={{margin : '1%', background : ((this.state.thickness_id) ? 'white' : Texture.lightgrad), color : ((!this.state.thickness_id) ? 'white' : Texture.dark2)}} onClick={() => {this.setState({thickness_id : 0})}}>Tolerance</Button>
                                                <Button variant='secondary' style={{margin : '1%', background : ((this.state.thickness_id) ? Texture.lightgrad : 'white'), color : ((!this.state.thickness_id) ? Texture.dark2 : 'white')}} onClick={() => {this.setState({thickness_id : 1})}}>OS_DS</Button>
                                            </div>
                                            <div style={{margin : 'auto'}}>
                                                <LineCharts height={(this.state.expand) ? `calc(${this.props.height}*3/4)` : `max(calc(${this.props.width}*2/9), 15vw)`}
                                                            width={(this.state.expand) ? `calc(${this.props.width}*9/10)` : `max(calc(${this.props.width}*4/9), 27vw)`}
                                                            data={this.state.list[this.state.current].thickness} 
                                                            x={fixed_data.thickness.x} 
                                                            list={fixed_data.thickness.colors}
                                                            cols={(this.state.thickness_id ? ['thickness', 'OS', 'DS'] : ['thickness', 'LL', 'UL'])}
                                                            fontSize={fontSize[this.props.enLarged ? 1 : 0]}
                                                            title = {{x : 'Length (in m)', y : 'Thickness (in mm)'}}
                                                            noDot
                                                />
                                            </div>
                                    </Expand>
                                    <Expand style={{border : `solid ${Texture.light1} 2px`, margin : '0.5vw auto', padding : 'auto'}} left={this.props.left} hide={this.state.expand} clicked={() => this.changeExp()} expandable>
                                            <AreaCharts height={(this.state.expand) ? `calc(${this.props.height}*3/4)` : `max(calc(${this.props.width}*2/9), 15vw)`}
                                                        width={(this.state.expand) ? `calc(${this.props.width}*9/10)` : `max(calc(${this.props.width}*4/9), 27vw)`}
                                                        data={this.state.list[this.state.current].width.map(e => {return {length : e.length, width : [-e.width/2, e.width/2], Min : [-e.Min/2, e.Min/2], Max : [-e.Max/2, e.Max/2]}})} 
                                                        x={fixed_data.width.x} 
                                                        list={fixed_data.width.colors}
                                                        domain = {[-3000, 3000]}
                                                        onlyFirst
                                                        fontSize={fontSize[this.props.enLarged ? 1 : 0]}
                                                        title = {{x : 'Length (in m)', y : 'Width (in mm)'}}
                                            />
                                    </Expand>
                                </div>
                                <div style={{display : 'flex', margin : '0 1vw'}}>
                                        <Expand style={{border : `solid ${Texture.light1} 2px`, margin : '0% auto', marginRight : this.state.expand ? 'auto' : '0.5vw'}} left={this.props.left} hide={this.state.expand} clicked={() => this.changeExp()} expandable>
                                            <div style={{display : 'block', width : 'auto'}}>
                                                <Button style={{margin : '1%', background : ((this.state.temp_id===0) ? Texture.lightgrad : 'white'), color : ((this.state.temp_id!==0) ? Texture.dark2 : 'white')}} onClick={() => {this.setState({temp_id : 0})}}>FRT</Button>
                                                <Button style={{margin : '1%', background : ((this.state.temp_id===2) ? Texture.lightgrad : 'white'), color : ((this.state.temp_id!==2) ? Texture.dark2 : 'white')}} onClick={() => {this.setState({temp_id : 2})}}>SCT</Button>
                                                <Button style={{margin : '1%', background : ((this.state.temp_id===1) ? Texture.lightgrad : 'white'), color : ((this.state.temp_id!==1) ? Texture.dark2 : 'white')}} onClick={() => {this.setState({temp_id : 1})}}>FCT</Button>
                                                <Button style={{margin : '1%', background : ((this.state.temp_id===3) ? Texture.lightgrad : 'white'), color : ((this.state.temp_id!==3) ? Texture.dark2 : 'white')}} onClick={() => {this.setState({temp_id : 3})}}>ALL</Button>
                                            </div>
                                            <div style={{width : '100%'}}>
                                                <LineCharts height={(this.state.expand) ? `calc(${this.props.height}*3/4)` : `max(calc(${this.props.width}*2/9), 15vw)`}
                                                            width={(this.state.expand) ? `calc(${this.props.width}*9/10)` : `max(calc(${this.props.width}*4/9), 27vw)`}
                                                            data={this.state.list[this.state.current].temper} 
                                                            x={fixed_data.temp.x} 
                                                            list={fixed_data.temp.colors}
                                                            cols={(this.state.temp_id===3) ? ['FRT', 'SCT', 'FCT'] : (this.state.temp_id === 2 ? ['SCT'] : this.state.temp_id ? ['FCT'] : ['FRT'])}
                                                            fontSize={fontSize[this.props.enLarged ? 1 : 0]}
                                                            title = {{x : 'Length (in m)', y : `Temperature (in ${'\u2103'})`}}
                                                />
                                            </div>
                                        </Expand>
                                        <Expand style={{border : `solid ${Texture.light1} 2px`, margin : '0% auto', padding : 'auto'}} left={this.props.left} hide={this.state.expand} clicked={() => this.changeExp()} expandable>
                                            <div style={{display : 'block', width : 'auto'}}>
                                                <Button style={{margin : '1%', background : ((this.state.rend.FRT) ? Texture.lightgrad : 'white'), color : ((!this.state.rend.FRT) ? Texture.dark2 : 'white')}} onClick={() => {this.setState((state) => {return {rend : {FRT : !state.rend.FRT, FCT : state.rend.FCT, SCT : state.rend.SCT}}}); let x = {}; for(var i in this.state.rend){if((i==='FRT' && !this.state.rend[i]) || (i!=='FRT' && this.state.rend[i])){x[`# ${i}`] = this.props.data['A123456'].count.colors[i]}; this.setState({colors : x})}}}>FRT</Button>
                                                <Button style={{margin : '1%', background : ((this.state.rend.SCT) ? Texture.lightgrad : 'white'), color : ((!this.state.rend.SCT) ? Texture.dark2 : 'white')}} onClick={() => {this.setState((state) => {return {rend : {FRT : state.rend.FRT, FCT : state.rend.FCT, SCT : !state.rend.SCT}}}); let x = {}; for(var i in this.state.rend){if((i==='SCT' && !this.state.rend[i]) || (i!=='SCT' && this.state.rend[i])){x[`# ${i}`] = this.props.data['A123456'].count.colors[i]}; this.setState({colors : x})}}}>SCT</Button>
                                                <Button style={{margin : '1%', background : ((this.state.rend.FCT) ? Texture.lightgrad : 'white'), color : ((!this.state.rend.FCT) ? Texture.dark2 : 'white')}} onClick={() => {this.setState((state) => {return {rend : {FRT : state.rend.FRT, FCT : !state.rend.FCT, SCT : state.rend.SCT}}}); let x = {}; for(var i in this.state.rend){if((i==='FCT' && !this.state.rend[i]) || (i!=='FCT' && this.state.rend[i])){x[`# ${i}`] = this.props.data['A123456'].count.colors[i]}; this.setState({colors : x})}}}>FCT</Button>
                                            </div>
                                            <div style={{width : '100%'}}>
                                                <AreaCharts height={(this.state.expand) ? `calc(${this.props.height}*3/4)` : `max(calc(${this.props.width}*2/9), 15vw)`}
                                                            width={(this.state.expand) ? `calc(${this.props.width}*9/10)` : `max(calc(${this.props.width}*4/9), 27vw)`}
                                                            data={this.state.list[this.state.current].hist} 
                                                            x={'temp'} 
                                                            list={this.state.colors}
                                                            domain_x = {[this.state.list[this.state.current].minimum, this.state.list[this.state.current].maximum]}
                                                            nostep
                                                            number
                                                            fontSize={fontSize[this.props.enLarged ? 1 : 0]}
                                                            title = {{x : `Temperature (in ${'\u2103'})`, y : 'Frequency'}}
                                                />
                                            </div>
                                        </Expand>
                                </div>
                            </Stack>
                        </div>
                    </Stack>
                }
            </Stack>
        );
    }
}