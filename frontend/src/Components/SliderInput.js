import React, { Component } from "react";
import PropTypes from "prop-types";
import "./SliderInput.css";

export default class SliderInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sliderVal: this.props.value
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.setState({ sliderVal: e.target.value });
		this.props.onInputChange(e.target.value);
	}

	render() {
		return (
			<div className="fmz-slider">
				<p>{this.state.sliderVal}%</p>
				<input
					type="range"
					value={this.state.sliderVal}
					min={0}
					max={10}
					step={0.25}
					onChange={this.handleChange}
				/>
			</div>
		);
	}
}

SliderInput.propTypes = {
	value: PropTypes.number
};
