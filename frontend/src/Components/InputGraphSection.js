import React, { Component } from "react";
import CurrencyInput from "./CurrencyInput";
import SliderInput from "./SliderInput";
import DisplayGraph from "./DisplayGraph";
import "./InputGraphSection.css";
import FrequencyInput from "./FrequencyInput";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const SAVINGS_MUTATION = gql`
    mutation savingsmutation(
        $paymentFrequency: Int!
        $initialDeposit: Float!
        $monthlyDeposit: Float!
        $interestRate: Float!
    ) {
        createSavings(
            paymentFrequency: $paymentFrequency
            initialDeposit: $initialDeposit
            monthlyDeposit: $monthlyDeposit
            interestRate: $interestRate
        ) {
            savings {
                months {
                    id
                    totalInterest
                    totalValue
                }
            }
        }
    }
`;

export default class InputGraphSectionContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            savT: [{ x: 0, y: 0 }],
            intT: [{ x: 0, y: 0 }]
        };
    }
    handleComplete = ({ data: { createSavings } }) => {
        this.setState(prevState => ({
            savT: [
                ...prevState.savT,
                // month is inside the data returned by the API????
                { x: createSavings.savings.months.id, y: createSavings.savings.months.totalValue }
            ],
            intT: [
                ...prevState.intT,
                { x: createSavings.savings.months.id, y: createSavings.savings.months.totalInterest }
            ]
        }));
    };
    render() {
        const { savT, intT } = this.state;
        return (
            <Mutation mutation={SAVINGS_MUTATION} onCompleted={this.handleComplete}>
                {savingsmutation => (
                    <InputGraphSection mutate={savingsmutation} savT={savT} intT={intT} />
                )}
            </Mutation>
        );
    }
}

class InputGraphSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialDeposit: "",
            monthlyDeposit: "",
            interestRate: 0,
            paymentFrequency: ""
        };
    }
    componentDidUpdate({ mutate }, prevState) {
        console.log(this.state);

        if (
            this.state.initialDeposit !== "" &&
            this.state.monthlyDeposit !== "" &&
            this.state.paymentFrequency !== "" &&
            prevState !== this.state
        ) {
            //If currencyInput elements are returning strings, convert to ints here.
            var paymentF = Number(this.state.paymentFrequency);
            var initialD = parseFloat(this.state.initialDeposit);
            var monthlyD = parseFloat(this.state.monthlyDeposit);
            var interestR = parseFloat(this.state.interestRate)/100;

            console.log("execute mutation");
            mutate({
                variables: {
                    paymentFrequency: paymentF,
                    initialDeposit: initialD,
                    monthlyDeposit: monthlyD,
                    interestRate: interestR
                }
            });
            console.log("Mutation query commencing")
        } else {
            console.log("Input Requirements not met, will not generate graph.");
        }
    }
    handleChange = evt => {
        const { name, value } = evt.target;
        this.setState({ [name]: value });
    };

    render() {
        const {
            initialDeposit,
            monthlyDeposit,
            interestRate,
            paymentFrequency
        } = this.state;
        const { savT, intT } = this.props;
        return (
            <div>
                <p className="input-label">
                    Inputs must be positive and have no more than 15 digits with 2 decimal
                    places!
                </p>
                <div className="financial-inputs">
                    <p className="input-label">What is your initial Deposit?</p>
                    <CurrencyInput
                        name="initialDeposit"
                        value={initialDeposit}
                        onInputChange={this.handleChange}
                    />
                    <p className="input-label">How much will you save each month?</p>
                    <CurrencyInput
                        name="monthlyDeposit"
                        value={monthlyDeposit}
                        onInputChange={this.handleChange}
                    />
                    <p className="input-label">
                        What is the annual interest rate you have acquired?
                    </p>
                    <SliderInput
                        name="interestRate"
                        value={Number(interestRate)}
                        onInputChange={this.handleChange}
                    />
                    <p className="input-label">
                        Specify the frequency of interest compounding.
                    </p>
                    <FrequencyInput
                        name="paymentFrequency"
                        value={paymentFrequency}
                        onInputChange={this.handleChange}
                    />
                </div>
                <div className="financial-display">
                    <DisplayGraph savT={savT} intT={intT} />
                </div>
            </div>
        );
    }
}
