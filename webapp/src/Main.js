import React from 'react';
import Area from './SubComponents/Area';
import Heading from './SubComponents/AreaComponents/Heading';
// import Headline from './SubComponents/Headlines';
import Suggestions from './SubComponents/Suggestions';
import Texture from './Texture';
import {FormSelect} from 'react-bootstrap';
import refreshGraphData from './SubComponents/AreaComponents/Functions';
// import Image from './img/button 2.png';

const elemFont = '0.95vw';

export default class Main extends React.Component{
	constructor(props){
		super(props);
        this.Heading = React.createRef();
        this.state = {  units : [], 
                        data : {}, 
                        currentUnit : 0, 
                        divHeight : 0, 
                        enLargeContent : false, 
                        enLargeSugesstions : false, 
                        headHeight : 0,
                        elem : React.createRef(),
                        suggRefresh : true,
                        username : null
    };
        this.data = [
                        {unit1 : 1, unit2 : 0, unit3 : 0, unit4 : 0, unit5 : 0, Area1 : 1, Area2 : 1, Area3 : 0, Area4 : 0, Area5 : 1, Area6 : 1, Area7 : 0, Area8 : 0, Area9 : 0, Area10 : 0},
                        {unit1 : 0, unit2 : 1, unit3 : 0, unit4 : 0, unit5 : 0, Area1 : 1, Area2 : 0, Area3 : 1, Area4 : 1, Area5 : 0, Area6 : 0, Area7 : 1, Area8 : 1, Area9 : 0, Area10 : 1},
                        {unit1 : 0, unit2 : 0, unit3 : 1, unit4 : 0, unit5 : 0, Area1 : 1, Area2 : 0, Area3 : 1, Area4 : 1, Area5 : 1, Area6 : 1, Area7 : 1, Area8 : 1, Area9 : 1, Area10 : 0}
                    ];
        
        this.names = [];
        for(var i in this.data[0]){
            this.names.push(i);
        }
        for(var k in this.data){
            i = this.data[k];
            var j =0;
            for(var t in i){
                if(j===5 || i[t]===1){
                    break;
                }
                j++;
            }
            if(j===5){
                continue;
            }
            this.state.data[this.names[j]] = [];
            this.state.units.push(this.names[j]);
            j=0;
            for(var t1 in i){
                if(j<5){
                    j++;
                    continue;
                }
                if(i[t1]){
                    this.state.data[this.state.units[this.state.units.length-1]].push(j-4);
                }
                j++;
            }
        }
        this.state.currentUnit = this.state.units[0];
        this.sugg = React.createRef();

        // fetch("http://127.0.0.1:8000/?table=data&keys=SLABID,LENGTH,VALUE&conditions=MEASURING_DEVICE='WIDTH_GUAGE'").then(
        //     (res) => res.json()).then(
        //         (json) => {console.log(json.data)}
        // ).catch(e => console.log(e))
	}
    componentDidMount(){
        const timer = setInterval(this.setState({divHeight : this.state.elem.current.clientHeight, headHeight : this.Heading.current.clientHeight}), 1000);
        clearInterval(timer);
        window.addEventListener('resize', () => {
            if(!this.state.enLargeSugesstions){
                this.setState({divHeight : this.state.elem.current.clientHeight});
                this.setState({headHeight : this.Heading.current.clientHeight});
            }
        });
    }
    componentDidUpdate(prevProps, prevState){
        console.log('updated')
        if(this.state.suggRefresh !== prevState.suggRefresh){
            console.log('sugg refreshed');
            this.setState((state) => {return {divHeight : state.elem.current.clientHeight}})
        }
    }
	render(){
        if(this.sugg.current){console.log(this.sugg.current.clientHeight)};
		return(
			<div ref={this.sugg} style={{fontFamily : 'roboto',overflow : 'clip', padding : 0, minHeight : '100vh'}}>
                <div ref={this.state.elem}>
                    <div ref = {this.Heading}>
                        <Heading username={this.state.username} set={(e) => {this.setState({username : e})}}>
                            <div style ={{width : '9vw', height : '4.5vh' ,padding : 0, margin : `auto 0`, fontSize : elemFont}}>
                                <FormSelect defaultValue={this.state.currentUnit} hover='true' style={{cursor : 'pointer', height : '4.5vh', background : Texture.lightgrad, color : 'white', borderRadius : 0, textAlign : 'center', fontSize : elemFont}} className="form-control" onChange={(e) => {this.setState({currentUnit : e.target.value});}}>
                                    {this.state.units.map((e) => {
                                        return <option key={e} value={e} style={{background : Texture.dark1, color : 'white', fontSize : elemFont}}>{e}</option>
                                    })}
                                </FormSelect>
                            </div>

                        </Heading>
                    </div>
                    {/* {(!this.state.enLargeContent) && (!this.state.enLargeSugesstions) && <Row style={{background : Texture.darkgrad}}>
                        <div style={{margin : `auto 0`,width : '83.34vw'}}>
                            <Headline/>
                        </div>
                            
                    </Row>} */}
                    <Suggestions refresh={() => {this.setState((state) => {return {suggRefresh : !state.suggRefresh}})}} visible={!this.state.enLargeContent} headHeight={this.state.headHeight} hideContent={() => {this.setState((state) => {return {enLargeSugesstions : !state.enLargeSugesstions}})}}/>
                </div>
				<Area  hide={this.state.enLargeSugesstions} list = {this.state.data[this.state.currentUnit]} height= {this.state.divHeight} headHeight = {this.state.headHeight} hideContent={() => {this.setState((state) => {return {enLargeContent : !state.enLargeContent}})}}/>
                <div className='footer=bottom' style={{height : '3vh', bottom : 0, position :'fixed', background : Texture.dark1, width : '100%'}}>
                    <h6 style={{display : 'inline', position : 'absolute', right : '10%', top : '50%', transform: 'translateY(-50%)', color : 'white', width : 'fit-content', verticalAlign : 'middle', fontSize : '0.8vw'}} >Designed {'&'} developed by Ripik.ai | All rights reserved</h6>
                    <h6 className='text-xs-center' style={{display : 'inline', position : 'absolute', left : '10%', top : '50%', transform: 'translateY(-50%)', color : 'white', width : 'fit-content', fontSize : '0.8vw'}}>
                        Copyright&copy;{2021}
                    </h6>
                </div>
			</div>
		);
	}
}