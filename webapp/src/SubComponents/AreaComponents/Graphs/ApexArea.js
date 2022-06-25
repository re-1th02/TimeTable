import React from "react";
import Chart from 'react-apexcharts';
import Texture from "../../../Texture";

// 66, 86, 244

export default class AreaApex extends React.Component{
    constructor(props){
        super(props);
        console.log(Object.keys(this.props.list).map((e, i) => {return {name : e, data : this.props.data.map((i) => i[e])}}));
    }
    render(){
        return(
            <Chart  options={{
                        xaxis : {
                            categories : this.props.data.map((e) => e[this.props.x]),
                            labels : {
                                show : true,
                                rotateAlways : true,
                                style : {colors : 'white'}
                            },
                            
                        },
                        yaxis : {
                            labels : {
                                show : true,
                                style : {colors : 'white'}
                            },
                            min : 0,
                            max : 6000
                        },
                        grid : {
                            padding : {right : 50}
                        },
                        dataLabels : {
                            enabled : false
                        },
                        fill: {
                            colors: this.props.data.map((e) => this.props.color(e['Plt Width'])),
                            type: "gradient",
                            gradient: {
                              stops: [100]
                            }
                        },
                        
                    }}
                    series= {Object.keys(this.props.list).map((e, i) => {return {name : e, data : this.props.data.map((i) => i[e][1]-i[e][0])}})}
                    type = 'area'
                    width = '600'
            />
        );
    }
}