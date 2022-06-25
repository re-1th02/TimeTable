import React from 'react';
import {Button, Collapse, Container, Row, Stack, OverlayTrigger, Tooltip, Table, Modal, CloseButton, Spinner} from 'react-bootstrap';
import Texture from '../Texture';
import Image from '../img/button_3.png';
import Image_ from '../img/button_1.png'
import Scrollbar from 'react-scrollbars-custom';
// import FormRange from 'react-bootstrap/esm/FormRange';
import {CSVLink} from 'react-csv';
// import BootstrapTable from 'react-bootstrap-table-next';
import {FaCompress, FaDownload, FaExpand, FaExpandAlt, FaExpandArrowsAlt} from 'react-icons/fa'
import listenObj from './Exp_class';
import escObj from './Escape';

const width = '12.5vw';
const margin = '0.3vw';
const height = 50;
const elemFont = 'max(0.95vw, 1.4vh)';
const headFont = 'max(0.9vw, 1.3vh)';

export default class Suggestions extends React.Component{
	constructor(props){
		super(props);
		this.state =   {visible : true, 
                        current : 0, 
                        buttonWidth : '3vw',
                        headWidth : '10vw',
                        headHeight : '5vh',
                        width : '8vw', 
                        margin : '0.2vw', 
                        height : '4.8vh', 
                        minHeight : 25, 
                        enLarge : false, 
                        zoom : 10, 
                        current_new : 0, 
                        download : false, 
                        small : false,
                        numCols : 10,
                        namesLen : 0,
                        show : false
                    };
		this.statusCount = 20;
		this.EventCount = 8;

        fetch('http://127.0.0.1:8000/?table=SUGG&cols=SLABID,RHF_CALC_TEMP,RETENTION_TIME,RESUME_TEMP,FRT,FCT,TYPE_OF_ROLLING,MULPIC_MODE,TURN_BEFORE_ROLLING,PLT_THK,PLT_WIDTH,PLT_LEN,SINGLE_ROLL_CHARGING,SLABWIDTH_JUMP,SLABTHICKNESS_JUMP,ROLLING_TIME,PLATE_AFTER_ROLL_CHANGE,KMS_ROLLED_AFTER_ROLL_CHANGE,WORKROLL_CHANGE,BACKUPROLL_CHANGE,BATCH_ROLLING_TYPE,OPI_INPUT1,OPI_INPUT2,OPI_INPUT3,OPI_INPUT4,OPI_INPUT5,TOC,TOM,MOP').then(
            (res) => res.json()).then(
                (json) => {console.log(json); this.data = [...json.data]; this.get(); this.setState({show : true})}
        ).catch(e => console.log(e))

        // this.data = [
        //     {SLABID : 'A2305670', RHF_CALC_TEMP : 1192, RETENTION_TIME : 210, RESUME_TEMP : 1100, FRT : 870, FCT : 570, TYPE_OF_ROLLING : 1, MULPIC_MODE : 1, TURN_BEFORE_ROLLING : 1, PLT_THK : 20.6, PLT_WIDTH : 3500, PLT_LEN : 48200, SINGLE_ROLL_CHARGING : 1, SLABWIDTH_JUMP : 1, SLABTHICKNESS_JUMP : 1, ROLLING_TIME : 480, PLATE_AFTER_ROLL_CHANGE : 28, KMS_ROLLED_AFTER_ROLL_CHANGE : 36.01, WORKROLL_CHANGE : 0, BACKUPROLL_CHANGE : 0, BATCH_ROLLING_TYPE : 2, OPI_INPUT1 : 25, OPI_INPUT2 : -140, OPI_INPUT3 : 5.5, OPI_INPUT4 : 85, OPI_INPUT5 : 3.5},
        //     {SLABID : 'A2305680', RHF_CALC_TEMP : 1197, RETENTION_TIME : 193, RESUME_TEMP : 1100, FRT : 860, FCT : 570, TYPE_OF_ROLLING : 1, MULPIC_MODE : 1, TURN_BEFORE_ROLLING : 1, PLT_THK : 20.6, PLT_WIDTH : 3500, PLT_LEN : 49200, SINGLE_ROLL_CHARGING : 1, SLABWIDTH_JUMP : 0, SLABTHICKNESS_JUMP : 0, ROLLING_TIME : 480, PLATE_AFTER_ROLL_CHANGE : 29, KMS_ROLLED_AFTER_ROLL_CHANGE : 36.06, WORKROLL_CHANGE : 0, BACKUPROLL_CHANGE : 0, BATCH_ROLLING_TYPE : 2, OPI_INPUT1 : 25, OPI_INPUT2 : -140, OPI_INPUT3 : 5.5, OPI_INPUT4 : 85, OPI_INPUT5 : 3.5},
        //     {SLABID : 'A2305645', RHF_CALC_TEMP : 1187, RETENTION_TIME : 200, RESUME_TEMP : 1080, FRT : 870, FCT : 840, TYPE_OF_ROLLING : 1, MULPIC_MODE : 1, TURN_BEFORE_ROLLING : 1, PLT_THK : 22.36, PLT_WIDTH : 3600, PLT_LEN : 52000, SINGLE_ROLL_CHARGING : 0, SLABWIDTH_JUMP : 1, SLABTHICKNESS_JUMP : 1, ROLLING_TIME: 470, PLATE_AFTER_ROLL_CHANGE : 30, KMS_ROLLED_AFTER_ROLL_CHANGE : 36.11, WORKROLL_CHANGE : 0, BACKUPROLL_CHANGE : 0, BATCH_ROLLING_TYPE : 3, OPI_INPUT1 : 22, OPI_INPUT2 : -135, OPI_INPUT3 : 6, OPI_INPUT4 :   80, OPI_INPUT5 : 3  },
        //     {SLABID : 'A2305780', RHF_CALC_TEMP : 1184, RETENTION_TIME : 196, RESUME_TEMP : 1075, FRT : 850, FCT : 800, TYPE_OF_ROLLING : 1, MULPIC_MODE : 1, TURN_BEFORE_ROLLING : 0, PLT_THK : 22.36, PLT_WIDTH : 3600, PLT_LEN : 52000, SINGLE_ROLL_CHARGING : 0, SLABWIDTH_JUMP : 0, SLABTHICKNESS_JUMP : 0, ROLLING_TIME : 480, PLATE_AFTER_ROLL_CHANGE : 31, KMS_ROLLED_AFTER_ROLL_CHANGE : 36.16, WORKROLL_CHANGE : 0, BACKUPROLL_CHANGE : 0, BATCH_ROLLING_TYPE : 3, OPI_INPUT1 : 22, OPI_INPUT2 : -135, OPI_INPUT3 : 6, OPI_INPUT4 : 80, OPI_INPUT5 : 3},
        //     {SLABID : 'A2205645', RHF_CALC_TEMP : 1193, RETENTION_TIME : 194, RESUME_TEMP : 1096, FRT : 850, FCT : 800, TYPE_OF_ROLLING : 1, MULPIC_MODE : 1, TURN_BEFORE_ROLLING : 0, PLT_THK : 22.36, PLT_WIDTH : 3600, PLT_LEN : 52000, SINGLE_ROLL_CHARGING : 0, SLABWIDTH_JUMP : 0, SLABTHICKNESS_JUMP : 0, ROLLING_TIME: 470, PLATE_AFTER_ROLL_CHANGE : 32, KMS_ROLLED_AFTER_ROLL_CHANGE : 36.21, WORKROLL_CHANGE : 0, BACKUPROLL_CHANGE : 0, BATCH_ROLLING_TYPE : 3, OPI_INPUT1 : 22, OPI_INPUT2 : -135, OPI_INPUT3 : 6, OPI_INPUT4 :   80, OPI_INPUT5 : 3  },
        // ];
        // this.get();
        // this.state.show = true;

        this.enLarge = this.enLarge.bind(this);
        //render with data
        
	}
    get(){
        this.csvArr = [Object.keys(this.data[0]).join(',')];
        this.csvArr.push(Object.keys(this.data[0]).map((e) => '').join(','));
        for(var i=0; i<this.data.length; i++){
            this.csvArr.push(Object.values(this.data[i]).join(','));
        }
        this.csvstr = this.csvArr.join('\n');


        this.desc = {SLABID : 'Slab Identification', RHF_CALC_TEMP : 'Reheating Furnace Discharging (RHF) Temperature', RETENTION_TIME : 'Duration of the slab in RHF', RESUME_TEMP : 'Holding Temperature', FRT : 'Finished Rolled Temperature', FCT : 'Finished Cooling Temperature', TYPE_OF_ROLLING : '1 means TMCP (Thermo mechanical control process)\n0 means NR (Normalized Rolling)', MULPIC_MODE : '1 means ACC (Acceelerated cooling)\n0 means Non Cooling', TURN_BEFORE_ROLLING : '1 is YES and 0 is NO', PLT_THK : 'Plate Thickness', PLT_WIDTH : 'Plate Width', PLT_LEN : 'Plate Length', SINGLE_ROLL_CHARGING : '0 : single charging\n1 : double charging', SLABWIDTH_JUMP : '1 if jump>=100mm', SLABTHICKNESS_JUMP : '1 if jump>=1mm', ROLLING_TIME : 'Rolling time', PLATE_AFTER_ROLL_CHANGE : 'Plate Sequence after work roll change', KMS_ROLLED_AFTER_ROLL_CHANGE : 'KMS rolled after the work roll change', WORKROLL_CHANGE : '1 : do work roll change\n0 : continue rolling', BACKUPROLL_CHANGE : '1 : do backup roll change\n0 : continue rolling', BATCH_ROLLING_TYPE : '# batch rolling', OPI_INPUT1 : 'draft', OPI_INPUT2 : 'CVC', OPI_INPUT3 : 'Speed max limit m/sec', OPI_INPUT4 : 'Rollforce max limit MN', OPI_INPUT5 : 'Torque max limit MN'}
        this.names = [];
        this.mat = {};
        for(var i=0; i<this.data.length; i++){
            for(var j in this.data[i]){
                this.names.push(j);
                this.mat[j] = [];
            }
            this.names.shift();
            break;
        }
        this.events = [];
        for(i=0; i<this.data.length; i++){
            this.events.push(this.data[i].SLABID);
            for(j in this.names){
                this.mat[this.names[j]].push(this.data[i][this.names[j]]);
            }
        }
        this.cols = [{dataField : 'prop', text : 'Suggestions'}];
        for(i in this.data){
            this.cols.push({dataField : this.data[i].SLABID, text : this.data[i].SLABID})
        }

        this.muitable = [];
        for(i in this.names){
            var temp = {prop : this.names[i]};
            for(j in this.events){
                temp[this.events[j]] = this.data[j][this.names[i]]; 
            }
            this.muitable.push(temp);
        }

        this.arrCol = [...Array(this.state.numCols).keys()];
        this.state.namesLen = this.names.length;
        this.main = React.createRef();
        this.props.refresh();
        return this.data;
    }
    enLarge(boo){
        this.props.hideContent();
        if(boo){
			listenObj.sugg.start(() => {this.props.hideContent(); this.setState({enLarge : false}); listenObj.sugg.end();})
		}
		else{
			listenObj.sugg.end();
		}
        this.setState({enLarge : boo});
    }
	render(){
        this.size = 250/this.state.zoom+ 4;
        this.maxHeight = `calc(${100/this.size}vh - ${this.props.headHeight/this.size}px)`;
        if(!this.state.show){
            return (
            <div style={{height : '25vh', width : '100vw', background : Texture.dark1}}>
                <Spinner animation='grow' style={{color : 'white', position : 'relative', top : '45%', left : '49%'}}/>
            </div>
            );
        }
		return (
        <div onContextMenu={(e) => {e.preventDefault();this.setState({download : true})}}
             style={{
                 transition : 'height 0.5s'
             }}>
            <Modal show={this.state.download} onHide={() => {this.setState({download : false})}}>
                <Modal.Header>
                <Modal.Title>Download Suggestions</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => {this.setState({download : false})}}>
                    Close
                </Button>
                <CSVLink data={this.data} 
                        target='_blank' 
                        filename={`${Math.floor(((new Date()).getDate())/10)}${((new Date()).getDate())%10}${Math.floor(((new Date()).getMonth()+1)/10)}${((new Date()).getMonth()+1)%10}${(new Date()).getFullYear()}_ripik_suggestions.csv`} 
                        onClick={() => {this.setState({download : false})}}>
                    <Button variant="primary" onClick={() => {this.setState({download : false})}}>
                        Download
                    </Button>
                </CSVLink>
                </Modal.Footer>
            </Modal>

        {/* <Button onClick={() => this.setState((state, props) => {return {visible : !state.visible}})}>Suggestions</Button> */}
			{/* <div onPointerLeave={(e) => {this.setState({visible : false})}}> */}
            {this.props.visible &&
            <div>
            
			<Container fluid style={{ background : Texture.dark1}}>
                {
                (!this.state.enLarge) ? 
                
                <Row style={{position : 'relative'}}>
                    {/* 1st column */}

                    <div onDoubleClick={() => {this.enLarge(!this.state.enLarge)}}>
                        <Stack>
                            <div onClick={() => {this.enLarge(true)}} 
                                 style={{overflow : 'clip', 
                                        cursor : 'pointer', 
                                        backgroundImage : `url(${Image_})`, 
                                        backgroundSize : '100% 100%', 
                                        color : 'white' ,
                                        width : this.state.headWidth, 
                                        height : this.state.headHeight, 
                                        minHeight : this.state.minHeight, 
                                        textAlign : 'center', 
                                        margin : this.state.margin
                                    }}
                            >
                                <h6 style={{ position : 'relative', top : '50%', transform : 'translateY(-50%)', fontWeight : 800, fontSize : elemFont}}>Suggestions</h6>
                            </div>

                            {this.events.map((e) => {
                                return (
                                    <OverlayTrigger
                                    placement='top'
                                    delay={{ show: 50, hide: 50 }}
                                    overlay={<Tooltip>ID : {e}</Tooltip>}>
                                    <div key={e} 
                                        style={{overflow : 'clip', 
                                                backgroundImage : `url(${Image})`, 
                                                backgroundSize : '100% 100%', 
                                                color : 'white' ,
                                                width : this.state.headWidth, 
                                                height : this.state.height, 
                                                minHeight : this.state.minHeight, 
                                                textAlign : 'center', 
                                                margin : this.state.margin
                                            }}
                                    >
                                        <h6 style={{position : 'relative', top : '50%', transform : 'translateY(-50%)', fontWeight : 700, fontSize : elemFont}}>{e}</h6>
                                    </div>

                                    </OverlayTrigger>
                                );
                            })}

                        </Stack>
                    </div>

                    {/* -- 1st column -- */}

                    {/* Next Columns */}

                    {this.arrCol.map((x) => {
                        const num = (this.state.current+x);
                        if(num >= this.state.namesLen){
                            return null;
                        }
                        return (
                            <div key={num} onDoubleClick={() => {this.enLarge(!this.state.enLarge)}}>
                                <Stack >
                                    <OverlayTrigger
                                        placement='top'
                                        delay={{ show: 50, hide: 50 }}
                                        overlay={<Tooltip>{this.desc[this.names[num]]}</Tooltip>}
                                    >
                                        <div style={{overflow : 'clip', 
                                                    backgroundImage : `url(${Image})`, 
                                                    backgroundSize : '100% 100%', 
                                                    color : 'white', 
                                                    width : this.state.width, 
                                                    height : this.state.headHeight, 
                                                    minHeight : this.state.minHeight, 
                                                    textAlign : 'center', 
                                                    margin : this.state.margin
                                                }}
                                        >
                                            <h6 style={{overflow : 'hidden', 
                                                        wordWrap : 'break-word', 
                                                        position : 'relative', 
                                                        top : '50%', 
                                                        transform : 'translateY(-50%)', 
                                                        margin : 'auto 2%', 
                                                        fontWeight : 700,
                                                        fontSize : elemFont
                                                    }}
                                            >
                                                {this.names[num].replaceAll('_','  ')}
                                            </h6>
                                        </div>
                                    </OverlayTrigger>

                                    {this.mat[this.names[num]].map((e, i) => {
                                        return (
                                            <div key={i}>
                                                {/* <Block  head="Temp" 
                                                        body = {e} 
                                                        height={this.state.height} 
                                                        width={this.state.width}
                                                        minHeight={this.state.minHeight} 
                                                        margin ={this.state.margin}
                                                /> */}

                                                <div style={{backgroundImage : `url(${Image})`,
                                                            backgroundSize : '100% 100%',
                                                            color : 'white' ,
                                                            width : this.state.width, 
                                                            height : this.state.height, 
                                                            margin : this.state.margin,
                                                            minHeight : this.state.minHeight,
                                                        }}
                                                >
                                                    <h6 style={{position : 'relative', 
                                                                top : '50%', 
                                                                transform : 'translateY(-50%)',
                                                                fontWeight : 550,
                                                                fontSize : headFont,
                                                                textAlign : 'center'
                                                            }}
                                                    >{e}</h6>
                                                </div>

                                            </div>
                                        );
                                    })}
                                </Stack>
                            </div>
                        );
                    })}

                    {/* -- Next Columns -- */}

                    {/* Button Column */}

                    <div style={{position : 'absolute', right : 0, top : 0}}>
                        <Button style={{height : this.state.height, 
                                        width  : this.state.buttonWidth,
                                        minHeight : this.state.minHeight, 
                                        color : 'white', backgroundImage : `url(${Image})`, 
                                        backgroundSize : '100% 100%', 
                                        margin : this.state.margin,
                                        fontSize : headFont,
                                    }} 
                                variant='' 
                                onClick={() => {if(this.state.current>=this.state.numCols){const x = this.state.current-this.state.numCols; this.setState({current : x})}}}
                        >
                            &laquo;
                        </Button>
                    </div>

                    <div style={{position : 'absolute', right : 0, bottom : 0}}>
                        <Button style={{height : this.state.height, 
                                        width  : this.state.buttonWidth,
                                        minHeight : this.state.minHeight, 
                                        color : 'white', 
                                        backgroundImage : `url(${Image})`, 
                                        backgroundSize : '100% 100%', 
                                        margin : this.state.margin,
                                        fontSize : headFont,
                                    }} 
                                variant='' 
                                onClick={() => {const x = this.state.current+this.state.numCols; if(x<this.state.namesLen){this.setState({current : x})}}}
                        >
                            &raquo;
                        </Button>
                    </div>


                    {/* -- Button Column -- */}

                </Row>

                :
                // <BootstrapTable keyField='prop' data={this.muitable} columns={this.cols} />
                // <MUIDataTable
                // title = {"Suggestions"}
                // data={this.muitable}
                // columns={['Suggesstions'].concat(this.events)}
                // options={{
                //     filter : true,
                //     print : false,
                //     viewColumns : true,
                //     selectableRows : true,
                //     responsive: "stacked",
                //     rowsPerPage : 25,
                // }}
                // />
                // null
                <div onDoubleClick={() => {this.enLarge(!this.state.enLarge)}}>
                <div class="card card-cascade narrower" style={{background : 'white'}}>
                    <div style={{textAlign : 'center', position : 'relative', height : 50, background : Texture.lightgrad}} class="view view-cascade gradient-card-header blue-gradient narrower py-2 mb-1">
                        <h3 class="mx-3" style={{cursor : 'pointer', display : 'inline', color : 'white'}} onClick={() => {this.enLarge(!this.state.enLarge)}}>Suggestions</h3>
                        <div style={{position : 'absolute', right : '2%', top : '50%', transform : 'translateY(-50%)'}}>
                            <Row>
                                <OverlayTrigger
                                    placement='top'
                                    delay={{ show: 50, hide: 50 }}
                                    overlay={<Tooltip>Download as CSV</Tooltip>}>

                                <CSVLink style={{color : 'white'}} data={this.data} target='_blank' filename='Suggestions.csv'>
                                    <FaDownload />
                                </CSVLink>
                                </OverlayTrigger>
                                <div style={{cursor : 'pointer', color : 'white', marginLeft : '1vw'}} onClick={() => {this.enLarge(!this.state.enLarge)}}>&#10006;</div>
                            </Row>
                        </div>
                        <div style={{position : 'absolute', left : '2%', top : '50%', transform : 'translateY(-50%)'}}>
                            <OverlayTrigger
                                placement='top'
                                delay={{ show: 50, hide: 50 }}
                                overlay={<Tooltip>{(!this.state.small) ? 'Increase' : 'Decrease'} Density</Tooltip>}>
                            <div style={{cursor : 'pointer', color : 'white'}} onClick={() => {this.setState((state) => {return {small : !state.small}})}}>
                                {(!this.state.small) ? <FaCompress /> : <FaExpand />}
                            </div>
                            </OverlayTrigger>
                        </div>
                    </div>
                <div class='ml-1 mr-1'>
                <Scrollbar style={{width : '100%', height : `calc(100vh - ${this.props.headHeight+75}px)`, background : Texture.dark1}}>
                <Table size={(this.state.small) ? 'sm' : 'lg'} style={{color : 'white', textAlign : 'center', height : 200}}>
                    <thead style={{position : 'sticky', top : 0}}>
                        <tr >
                            <th onClick={() => {this.setState((state) => {return {small : !state.small}})}} style={{background : Texture.darkgrad}}>S.No</th>
                            <th onClick={() => {this.enLarge(false)}} style={{background : Texture.darkgrad, cursor : 'pointer', textAlign : 'left'}}>Suggestions</th>
                            {this.events.map((e)=> {
                                return <th key={e} style={{background : Texture.darkgrad}}>{e}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {(this.names.map((e, i)=> {
                            return (<tr id='hov' key={e}>
                                <td >{i+1}</td>
                                <td height={15} style={{textAlign : 'left'}}>{e.replaceAll('_', "  ")}</td>
                                {this.mat[e].map((x, i) =>{
                                    return <td key={i} height={15} style={{}}>{x}</td>
                                })}
                            </tr>);
                        }))}
                    </tbody>
                </Table>
                </Scrollbar>
                </div>
                </div>
                </div>


                // <Scrollbar style={{width: '100vw', height: `calc(100vh - ${this.props.headHeight}px)` }}>
                //     <Row style={{marginLeft : 0}}>
                //         <div>
                //             <Stack>
                //                 <div onDoubleClick={() => {this.enLarge(false)}} style={{backgroundImage : `url(${Image_})`, backgroundSize : '100% 100%', color : 'white' ,width : this.state.width, height : this.maxHeight, textAlign : 'center', marginLeft : this.state.margin}}><h6 style={{position : 'relative', top : '50%', transform : 'translateY(-50%)'}}>Suggestions</h6></div>
                //                 {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24].map((e) => {
                //                     return <div key={e} style={{backgroundImage : `url(${Image})`, backgroundSize : '100% 100%', color : 'white' ,width : this.state.width, height : this.maxHeight, textAlign : 'center', marginLeft : this.state.margin}}>
                //                         <h6 style={{fontSize : `${75+(this.state.zoom)}%`,wordWrap : 'break-word',position : 'relative', top : '50%', transform : 'translateY(-50%)'}}>{this.names[e]}</h6></div>
                //                 })}
                //             </Stack>
                //         </div>
                //         {[0,1,2].map((x) => {
                //         const num = (this.state.current_new+x)%3;
                //         return (<div key={num}>
                //             <Stack>
                //                 <div style={{backgroundImage : `url(${Image})`, backgroundSize : '100% 100%', color : 'white', width : this.state.width, height : this.maxHeight, textAlign : 'center', marginLeft : this.state.margin}}><h6 style={{position : 'relative', top : '50%', transform : 'translateY(-50%)'}}>{this.events[num]}</h6></div>
                //                 {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24].map((e, i) => {
                //                     return <div key={i}><Block head="Temp" body = {this.mat[this.names[e]][num]} height={this.maxHeight} margin ={0}/></div>
                //                 })}
                //             </Stack>
                //         </div>);
                //         })}
                //         <div>
                //             <Stack>
                //                 <Button style={{height : this.maxHeight, color : 'white', backgroundImage : `url(${Image})`, backgroundSize : '100% 100%', marginLeft : this.state.margin}} variant='' onClick={() => {this.setState((state, props) => {const x = (state.current_new+6)%3; return {current_new : (x>5)*x}; } )}}><h3 style={{position : 'relative', top : '50%', transform : 'translateY(-50%)'}}>&raquo;</h3></Button>
                //                 <div>
                //                     <Row style={{margin : 0, color : 'white'}}>
                //                     <button class='btn btn-light btn-xs' onMouseEnter={(e) => {e.target.style.background = 'white'; e.target.style.color = Texture.dark1}} onMouseLeave={(e) => {e.target.style.background = 'transparent'; e.target.style.color = 'white'}} style={{background : 'transparent', 
                //                                 border : 'solid transparent',
                //                                 color : 'white',}}
                //                                 onClick ={() => this.setState((state) => {return {zoom : ((state.zoom>10) ? state.zoom-1 : 10)}})}>
                //                                     &minus;</button>
                //                         <div>
                //                         <FormRange value={10*(this.state.zoom-10)} onChange={(e) => this.setState({zoom : 10+Math.round(e.target.value/10)})} style={{width : '5vw'}}/>
                //                         <h6 style={{textAlign : 'center', margin : 'auto'}}>{10*(this.state.zoom-10)}</h6>
                //                         </div>
                //                     <button class='btn btn-light btn-xs' onMouseEnter={(e) => {e.target.style.background = 'white'; e.target.style.color = Texture.dark1}} onMouseLeave={(e) => {e.target.style.background = 'transparent'; e.target.style.color = 'white'}} style={{background : 'transparent', 
                //                                 border : 'solid transparent',
                //                                 color : 'white',}}
                //                                 onClick ={() => this.setState((state) => {return {zoom : ((state.zoom<20) ? state.zoom+1 : 20)}})}>
                //                                     &#43;</button>
                //                     </Row>
                //                 </div>
                //             </Stack>
                            
                //         </div>
                //     </Row>
                //     <br />
                // </Scrollbar>
                }
				{/* <Row>
                    <div style={{width : this.state.Headwidth, textAlign : 'center', border : 'double', margin : this.state.margin}}>Suggestions</div>
                        <Col xs = {10}>
                            <Row>
                                {this.names.map((x, i) => <div key={i} style={{width : this.state.width, border : 'double', textAlign : 'center', margin : this.state.margin}}>{x}</div>)}
                            </Row>
                        </Col>
				</Row> */}
				{/* {this.events.map((x, i) => 
				<Row>
						<div style={{width : this.state.Headwidth, textAlign : 'center', border : 'double', margin : this.state.margin}}>{x}</div>
                        <Col>
                            <Row>
                            {this.mat[x].map((y, j) => <div key={y} style = {{width : this.state.width, border : 'solid grey', margin : this.state.margin, textAlign : 'center'}}>{y}</div>)}
                            </Row>
                        </Col>
				</Row>
				)} */}
			</Container>
			</div>}
        </div>
		);
	}
}