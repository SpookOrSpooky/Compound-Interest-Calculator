import React, { Component } from "react";
import "./FrequencyInput.css";

export default class FrequencyInput extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            hasFocus: false
        };
    }

    handleChange(e) {
        this.props.onInputChange(e);
    }

    handleFocus(e) {
        this.setState({
            hasFocus: true
        });
    }

    render() {
        const { value, name } = this.props;

        return (
            <div className="frequency-input">
                <select
                    name={name}
                    value={value}
                    onChange={this.handleChange}
                    onFocus={this.handleFocus.bind(this)}
                >
                    <option value={""} />
                    <option value={12}>Monthly</option>
                    <option value={4}>Quarterly</option>
                    <option value={1}>Yearly</option>
                </select>
            </div>
        );
    }
}
