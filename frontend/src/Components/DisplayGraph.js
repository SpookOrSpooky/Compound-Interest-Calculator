import React, { Component } from "react";
import PropTypes from "prop-types";
import CanvasJSReact from "../assets/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart; //https://canvasjs.com/react-charts/stacked-area-chart/

export default class DisplayGraph extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		//const { data } = this.props;
		const { savT } = this.props.savT;
		const { intT } = this.props.intT;

		//currently unused, gotta figure out how to set the proportions for the canvas.js stuff
		//const baseProps = {
		//    width: 450,
		//    height: 300,
		//    padding: 50,
		//    colorScale: ["#48C8FF", "#00b2ff", "#038AD0", "#006C9B"]
		//};

		const options = {
			theme: "light2",
			title: {
				text: "Savings Calculated with Compound Interest"
			},
			subtitles: [
				{
					text: "Total Savings and Total Interest accumulated over 50 years"
				}
			],
			axisY: {
				includeZero: true,
				prefix: "£"
			},
			toolTip: {
				shared: true
			},
			data: [
				{
					type: "area",
					name: "Total Savings Value",
					showInLegend: true,
					xValueFormatString: "#",
					yValueFormatString: "£#,##0.##",
					dataPoints: savT
				},
				{
					type: "area",
					name: "Total Interest Accumulated",
					showInLegend: true,
					xValueFormatString: "#",
					yValueFormatString: "£#,##0.##",
					dataPoints: intT
				}
			]
		};

		return (
			<div>
				<CanvasJSChart options={options} />
			</div>
		);
	}
}


