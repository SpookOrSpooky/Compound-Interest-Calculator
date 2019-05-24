import React, { Component } from "react";
import "./CurrencyInput.css";

export default class CurrencyInput extends Component {
	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);

		this.state = {
			inputValid: false,
			hasFocus: false,
			currencyVal: this.props.value
		};
	}

	handleChange(e) {
		this.setState({ currencyVal: e.target.value });
		//Input validation check. Input cannot be longer than 15 digits and the decimal digits can only be precise up to 2 digits, per the backend specification
		let inputValid = this.state.inputValid;

		inputValid = e.target.value.match(/^\d{0,13}\.?\d{0,2}$/i);

		if (!inputValid) {
			console.log(
				"Input validation error, value is of an incorrect format/length, set to null"
			); //Perhaps trigger a popup at the parant component if the value is null?
		}

		this.props.onInputChange(e);
	}

	handleFocus(e) {
		this.setState({
			hasFocus: true
		});
	}

	render() {
		const { value, name } = this.props;

		//the span in the following is a bit iffy, will have to look into it more.
		return (
			<div className={`currency-input ${value !== undefined ? "value" : ""}`}>
				<span>£</span>
				<input
					name={name}
					type="text"
					value={value}
					onChange={this.handleChange}
					onFocus={this.handleFocus.bind(this)}
				/>
			</div>
		);
	}
}
