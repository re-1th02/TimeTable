import React from 'react';
import {Collapse, Button, Container, Row, ButtonGroup, Stack, OverlayTrigger, Tooltip, Modal, Dropdown, DropdownButton, Navbar, CloseButton, Image} from 'react-bootstrap';
import {Scrollbar} from 'react-scrollbars-custom'
import {CSVLink} from 'react-csv';
import { exportComponentAsJPEG, exportComponentAsPNG } from 'react-component-export-image';
import Graph from './Graphs/Graph';
import Piegraph from './Graphs/PieGraph';
import Block from './Block';
import data from './data';
import TableSet from './Areas/TableSet';
import SearchGraph from './Areas/Performance';
import listenObj from '../Exp_class';
import Dashboard1 from './Areas/Dashboard1';
import Dashboard2 from './Areas/Dashboard2';

export default class Space extends React.Component{
	constructor(props){
		super(props);
		this.state={expand : 0, 
					download : false, 
					downloadElem : '',
					piedown : {width : 300, height : 300},
					graphdown : {width : 500, height : 300}
				};
		// values : 1
		// thick : 2
		// width : 3
		// length : 4
		// graph : 5,6,7
		this.data = {plt_thick : [{One : 10, Two : 15, Three : 20}],
					 plt_width : [{One : 20, Two: 5, Three : 2}],
					 plt_length : [{One : 10, Two: 10, Three : 10}]};
		this.type = {};
		this.colors = ['#E38627', '#C13C37', '#6A2135'];
		this.piedata = {};
		this.reff = {};
		this.list = []
		for(var j in this.data){
			this.list.push(j);
			var n = 0;
			this.piedata[j] = [];
			for(var i in this.data[j][0]){
				this.piedata[j].push({title : i, value : this.data[j][0][i], fill : this.colors[n%this.colors.length]});
				n++;
			}
			this.reff[j] = React.createRef();
			this.type[j] = 'PieChart';
		}
		this.downloadRef = React.createRef();

		this.graphData = {
			'graph1' : {
				x : 'x',
				colors : {'app1' : '#8884d8', 'app2' : '#82ca9d'},
				data : [
					{x : 'x1', app1 : 2, app2 : 3},
					{x : 'x2', app1 : 3, app2 : 2},
					{x : 'x3', app1 : 5, app2 : 0},
					{x : 'x4', app1 : 2, app2 : 2},
					{x : 'x5', app1 : 4, app2 : 1},
					{x : 'x6', app1 : 0, app2 : 5},
				]
			},
			'graph2' : {
				x : 'x',
				colors : {'app1' : '#8884d8', 'app2' : '#82ca9d'},
				data : [
					{x : 'x1', app1 : 2, app2 : 3},
					{x : 'x2', app1 : 3, app2 : 2},
					{x : 'x3', app1 : 5, app2 : 0},
					{x : 'x4', app1 : 2, app2 : 2},
					{x : 'x5', app1 : 4, app2 : 1},
					{x : 'x6', app1 : 0, app2 : 5},
				]
			},
			'graph3' : {
				x : 'x',
				colors : {'app1' : '#8884d8', 'app2' : '#82ca9d'},
				data : [
					{x : 'x1', app1 : 2, app2 : 3},
					{x : 'x2', app1 : 3, app2 : 2},
					{x : 'x3', app1 : 5, app2 : 0},
					{x : 'x4', app1 : 2, app2 : 2},
					{x : 'x5', app1 : 4, app2 : 1},
					{x : 'x6', app1 : 0, app2 : 5},
				]
			}
		}
		for(i in this.graphData){
			this.reff[i] = React.createRef();
			this.data[i] = this.graphData[i].data;
			this.type[i] = 'Graph';
		}
		this.esc = this.esc.bind(this);
		this.callBack = this.callBack.bind(this);
	}
	callBack(){
		console.log('deLarge', this.props.esc);
		if(this.props.esc){
			this.setState({expand : 0});
			this.esc(1);
		}
	}
	esc(e){
		if(!e){
			listenObj[(this.props.left ? 'left' : 'right')].start(() => {this.setState({expand : 0});this.esc(1)})
		}
		else{
			listenObj[(this.props.left ? 'left' : 'right')].end();
		}
	}
	componentDidUpdate(prevProps){
		if(prevProps.num!== this.props.num){
			this.setState({expand : 0})
		}
	}
	
	render(){
        if(`Area${this.props.num}` in data){
			let obj = data[`Area${this.props.num}`]
			if(obj.type==='table_set'){
            	return <TableSet enLarged={this.props.enLarged} tables={obj.data} height={this.props.height} left={this.props.left} scrollGet={this.props.scrollGet} scrollSet={this.props.scrollSet} width={this.props.width}/>
        	}
			else if(obj.type==='search_id'){
				return <SearchGraph enLarged={this.props.enLarged} data={obj.data} left={this.props.left} width={this.props.width} height ={this.props.height}/>
			}
			else if(obj.type === 'dash1'){
				return <Dashboard1 enLarged={this.props.enLarged} left={this.props.left} height={this.props.height} width={this.props.width}/>
			}
			else if(obj.type === 'dash2'){
				return <Dashboard2 enLarged={this.props.enLarged} left={this.props.left} height={this.props.height} width={this.props.width}/>
			}
		}
		return(
			<div style={{fontSize : '1vw'}}>
					{(this.state.download) && 
				<Modal size='lg' show={this.state.download} onHide={() => {this.setState({download : false})}}>
					<Modal.Header>
						<Modal.Title style={{textAlign : 'center'}}>Download {this.type[this.state.downloadElem]}</Modal.Title>
					</Modal.Header>
					<Modal.Body >
						<Container ref={this.downloadRef} style={{textAlign : 'center', margin: 'auto', width : '100%', height : '100%'}}>
							{/* {(this.reff[this.state.downloadElem].current) && <div dangerouslySetInnerHTML={{__html: this.reff[this.state.downloadElem].current.innerHTML}}/>} */}
							{(this.state.downloadElem in this.piedata) ? 
								<Stack>
									<Row style={{position : 'relative', height : 60}}>
										<h6 style={{textAlign : 'center', 
													fontSize : 20, 
													fontWeight : 1000, 
													position : 'absolute', 
													top : '50%', 
													left : '2%',
													transform : 'translateY(-50%)'
										}}>
											{new Date().toLocaleDateString()}
										</h6>
										<Image style={{width : 'auto', 
													height : 60, 
													position : 'absolute', 
													top : '50%', 
													transform : 'translateY(-50%)',
													right : '2%'
											}} src = '/icons/logo.png' alt=''/>
									</Row>
									<div>
										<Piegraph 	height={this.state.piedown.height}
													width={this.state.piedown.width}
													id='title'
													var='value' 
													data={this.piedata[this.state.downloadElem]} 
													style={{width : 'auto'}} />
									</div>
								</Stack>
								:
								<Stack>
									<Row style={{position : 'relative', height : 60}}>
										<h6 style={{textAlign : 'center', 
													fontSize : 20, 
													fontWeight : 1000, 
													position : 'absolute', 
													top : '50%', 
													left : '2%',
													transform : 'translateY(-50%)'
										}}>
											{new Date().toLocaleDateString()}
										</h6>
										<Image style={{width : 'auto', 
													height : 60, 
													position : 'absolute', 
													top : '50%', 
													transform : 'translateY(-50%)',
													right : '2%'
											}} src = '/icons/logo.png' alt=''/>
									</Row>
									<div>
										<Graph 	height={this.state.graphdown.height}
											width={this.state.graphdown.width}
											x={this.graphData[this.state.downloadElem].x} 
											data={this.graphData[this.state.downloadElem].data} 
											list ={this.graphData[this.state.downloadElem].colors} />
									</div>
								</Stack>
								
							}
						</Container>
					</Modal.Body>
					<Modal.Footer>
					<Button variant="secondary" onClick={() => {this.setState({download : false})}}>
						Close
					</Button>
					<CSVLink data={this.data[this.state.downloadElem]} target='_blank' filename={`${Math.floor(((new Date()).getDate())/10)}${((new Date()).getDate())%10}${Math.floor(((new Date()).getMonth()+1)/10)}${((new Date()).getMonth()+1)%10}${(new Date()).getFullYear()}_ripik_${this.state.downloadElem}.csv`} onClick={() => {this.setState({download : false})}}>
						<Button variant="primary" onClick={() => {this.setState({download : false})}}>
							Download CSV
						</Button>
					</CSVLink>
					<DropdownButton title='Export as '>
						<Dropdown.Item onClick={() => {exportComponentAsPNG(this.downloadRef, {fileName :  `${Math.floor(((new Date()).getDate())/10)}${((new Date()).getDate())%10}${Math.floor(((new Date()).getMonth()+1)/10)}${((new Date()).getMonth()+1)%10}${(new Date()).getFullYear()}_ripik_${this.state.downloadElem}`});this.setState({download : false, downloadElem : ''})}}>PNG</Dropdown.Item>
						<Dropdown.Item onClick={() => {exportComponentAsJPEG(this.downloadRef, {fileName : `${Math.floor(((new Date()).getDate())/10)}${((new Date()).getDate())%10}${Math.floor(((new Date()).getMonth()+1)/10)}${((new Date()).getMonth()+1)%10}${(new Date()).getFullYear()}_ripik_${this.state.downloadElem}`});this.setState({download : false, downloadElem : ''})}}>JPEG</Dropdown.Item>
					</DropdownButton>
					</Modal.Footer>
				</Modal>
					}
				<Stack>
					<h6>Area{this.props.num}</h6>
					{(this.state.expand===0 || this.state.expand===1) && 
					<div style={{display : 'inline-flex'}} onDoubleClick={() => {this.setState((state) => {return {expand : 1*(state.expand===0)}}); this.esc(this.state.expand);}}>
						{[0,1,2,3,4,5].map((e) => {
							return(
								<Block key={e} head={this.props.list[e].show} body={this.props.list[e].value} desc={this.props.list[e].description}/>
							);
						})}
					</div>}
					{(this.state.expand===0 || this.state.expand===1) && <div style={{display : 'inline-flex'}} onDoubleClick={() => {this.setState((state) => {return {expand : 1*(state.expand===0)}}); this.esc(this.state.expand);}}>
						{[6,7,8,9,10,11].map((e) => {
							return(
								<Block key={e} head={this.props.list[e].show} body={this.props.list[e].value} desc={this.props.list[e].description}/>
							);
						})}
					</div>}
					<br />
					<div style={{display : 'flex'}}>
						{(this.state.expand===0 || this.state.expand===2) && 
						<div ref={this.reff['plt_thick']} 
							onContextMenu={(e) => {e.preventDefault(); this.setState({download : true, downloadElem : 'plt_thick'})}} 
							style={{cursor : 'pointer', margin : 'auto', width : '100%', height : '100%'}} 
							onDoubleClick={() => {this.setState((state) => {return {expand : 2*(state.expand===0)}}); this.esc(this.state.expand);}}
						>
							<Stack>
								<h3>Plt Thick</h3>
								<Piegraph 	height={(this.state.expand===2) ? `calc(${this.props.height}*7/10)` : 200} 
											width={(this.state.expand===2) ? `calc(${this.props.width}*7/10)` : 200} 
											title='Plt Thick' 
											id='title' 
											var='value' 
											data={this.piedata['plt_thick']} 
											style={{width : 'auto'}} />
							</Stack>
						</div>
						}
						{(this.state.expand===0 || this.state.expand===3) && 
						<div ref={this.reff['plt_width']}
							onContextMenu={(e) => {e.preventDefault(); this.setState({download : true, downloadElem : 'plt_width'})}} 
							style={{cursor : 'pointer', margin : 'auto', width : '100%', height : '100%'}} onDoubleClick={() => {this.setState((state) => {return {expand : 3*(state.expand===0)}}); this.esc(this.state.expand);}}>
							<Stack>
								<h3>Plt Width</h3>
								<Piegraph height={(this.state.expand===3) ? `calc(${this.props.height}*7/10)` : 200} width={(this.state.expand===3) ? `calc(${this.props.width}*7/10)` : 200} title='Plt Width' id='title' var='value' data={this.piedata['plt_width']} style={{width : 'auto'}} />
							</Stack>
						</div>}
						{(this.state.expand===0 || this.state.expand===4) && 
						<div ref={this.reff['plt_length']}
							onContextMenu={(e) => {e.preventDefault(); this.setState({download : true, downloadElem : 'plt_length'})}} 
							 style={{cursor : 'pointer', margin : 'auto', width : '100%', height : '100%'}} onDoubleClick={() => {this.setState((state) => {return {expand : 4*(state.expand===0)}}); this.esc(this.state.expand);}}>
							<Stack>
								<h3>Plt Length</h3>
								<Piegraph height={(this.state.expand===4) ? `calc(${this.props.height}*7/10)` : 200} width={(this.state.expand===4) ? `calc(${this.props.width}*7/10)` : 200} title='Plt Length' id='title' var='value' data={this.piedata['plt_length']} style={{width : 'auto'}} />
							</Stack>
						</div>}
					</div>
					<br />
					{(this.state.expand===0 ||this.state.expand===5 || this.state.expand===6 || this.state.expand===7) &&
					<Scrollbar noScrollY style={{height : (this.state.expand===5 || this.state.expand===6 || this.state.expand===7) ? `calc(${this.props.height}*9/10)` : 320, margin : 'auto'}}>
						<div style={{display : 'inline-flex', width : '100%'}}>
							{(this.state.expand===0 || this.state.expand===5) && 
								<div ref={this.reff['graph1']}
								 onContextMenu={(e) => {e.preventDefault(); this.setState({download : true, downloadElem : 'graph1'})}}
								 onDoubleClick={() => {this.setState((state) => {return {expand : 5*(state.expand===0)}}); this.esc(this.state.expand);}}
								 style={{cursor : 'pointer', margin : 'auto'}}>
									{/* {item} */}
									<Graph 	height={(this.state.expand===5) ? `calc(${this.props.height}*8/10)` : 300} 
											width={(this.state.expand===5) ? `calc(${this.props.width}*8/10)` : 500} 
											x={this.graphData['graph1'].x} 
											data={this.graphData['graph1'].data} 
											list ={this.graphData['graph1'].colors}/>
								</div >
							}
							{(this.state.expand===0 || this.state.expand===6) && 
								<div ref={this.reff['graph2']} 
								onContextMenu={(e) => {e.preventDefault(); this.setState({download : true, downloadElem : 'graph2'})}}
								onDoubleClick={() => {this.setState((state) => {return {expand : 6*(state.expand===0)}}); this.esc(this.state.expand);}} 
								style={{cursor : 'pointer', margin : 'auto'}}>
									{/* {item} */}
									<Graph height={(this.state.expand===6) ? `calc(${this.props.height}*8/10)` : 300} width={(this.state.expand===6) ? `calc(${this.props.width}*8/10)` : 500} x={this.graphData['graph2'].x} data={this.graphData['graph2'].data} list ={this.graphData['graph2'].colors}/>
								</div >
							}
							{(this.state.expand===0 || this.state.expand===7) && 
								<div ref={this.reff['graph3']} 
								onContextMenu={(e) => {e.preventDefault(); this.setState({download : true, downloadElem : 'graph3'})}}
								onDoubleClick={() => {this.setState((state) => {return {expand : 7*(state.expand===0)}}); this.esc(this.state.expand)}} 
								style={{cursor : 'pointer', margin : 'auto'}}>
									{/* {item} */}
									<Graph height={(this.state.expand===7) ? `calc(${this.props.height}*8/10)` : 300} width={(this.state.expand===7) ? `calc(${this.props.width}*8/10)` : 500} x={this.graphData['graph3'].x} data={this.graphData['graph3'].data} list ={this.graphData['graph3'].colors}/>
								</div >
							}
							{/* {(this.state.expand==0 || this.state.expand==5) && <img src='/graph1.png' style={{margin : '1%'}}  onDoubleClick={() => {this.setState((state) => {return {expand : 5*(state.expand==0)}})}}></img>} */}
							{/* {(this.state.expand==0 || this.state.expand==6) && <img src='/graph2.png' style={{margin : '1%'}}  onDoubleClick={() => {this.setState((state) => {return {expand : 6*(state.expand==0)}})}}></img>}
							{(this.state.expand==0 || this.state.expand==7) && <img src='/graph3.png' style={{margin : '1%'}}  onDoubleClick={() => {this.setState((state) => {return {expand : 7*(state.expand==0)}})}}></img>} */}
						</div>
					</Scrollbar>}
					{(this.state.expand===0 || this.state.expand===1) && <div style={{display : 'inline-flex'}} onDoubleClick={() => {this.setState((state) => {return {expand : 1*(state.expand===0)}}); this.esc(this.state.expand);}}>
						{[12,13,14,15,16,17].map((e) => {
							return(
								<Block key={e} head={this.props.list[e].show} body={this.props.list[e].value} desc={this.props.list[e].description}/>
							);
						})}
					</div>}
				</Stack>
			</div>
		);
	}
}