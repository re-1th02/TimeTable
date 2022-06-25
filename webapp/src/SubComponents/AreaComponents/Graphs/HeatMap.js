import React from "react";
import Chart from 'react-apexcharts';
import Texture from "../../../Texture";

// 66, 86, 244

export default class HeatMap_child extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Chart  options={{
                        xaxis : {
                            categories : this.props.x,
                            labels : {
                                show : true,
                                rotate : -45,
                                rotateAlways : false,
                                style : {colors : 'gold', fontSize : this.props.fontSize.label}
                            },
                            position : 'top'
                        },
                        yaxis : {
                            reversed : true,
                            labels : {
                                show : true,
                                style : {colors : 'gold', fontSize : this.props.fontSize.label},
                            }
                        },
                        grid : {
                            padding : {right : 50},
                            width : this.props.width
                        },
                        dataLabels : {
                            style : {
                                fontSize : this.props.fontSize.label,
                                fontWeight : 800,
                                colors : ['darkblue'],
                                position : 'relative',  top : '50%'
                            }
                        },
                        legend : {
                            show : false
                        },
                        plotOptions : {
                            heatmap : {
                                distributed : true,
                                shadeIntensity : 0.5,
                                colorScale : {
                                    ranges : [{
                                        from : 0,
                                        to : 4,
                                        color : '#53b3fc'
                                    }]
                                }
                            }
                        }
                    }}
                    series= {this.props.data.map((e, i) => {return {name : e.hour, data : this.props.x.map((j) => {return {x : j, y : e[j]}})}})}
                    type = 'heatmap'
                    style={{width : this.props.width, height : this.props.height}}
                    // width = {'50vw'}
                    // height = {'50vw'}
            // options = {{
            //     series : [{name : '1', data : [{x : 'a', y : 1}, {x : 'b', y: 2}]}],
            //     // series: this.props.data.map((e, i) => {return {name : i+1, data : Object.keys(e).map((i) => {return {x : i, y : e[i]}})}}),
            //     chart: {
            //     height: 450,
            //     type: 'heatmap',
            //   },
            //   dataLabels: {
            //     enabled: false
            //   },
            //   title: {
            //     text: 'HeatMap Chart (Different color shades for each series)'
            //   },
            //   grid: {
            //     padding: {
            //       right: 20
            //     }
            //   }
            //   }}
            />
        );
    }
}