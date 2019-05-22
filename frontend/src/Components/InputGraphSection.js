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

export default class InputGraphSection extends Component {
    constructor(props) {
        super(props);
        this.handleInitialDepositChange = this.handleInitialDepositChange.bind(
            this
        );
        this.handleMonthlyDepositChange = this.handleMonthlyDepositChange.bind(
            this
        );
        this.handleInterestRateChange = this.handleInterestRateChange.bind(this);
        this.handlePaymentFrequencyChange = this.handlePaymentFrequencyChange.bind(
            this
        );
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            initialDeposit: "",
            monthlyDeposit: "",
            interestRate: 0,
            paymentFrequency: "",
            savT: [{ x: 0, y: 0 }],
            intT: [{ x: 0, y: 0 }],
            queryBool: false
        };
    }

    handleInitialDepositChange(value) {
        //Validation occurs in child handler
        this.setState({ initialDeposit: value });

        //Now we jump to the final validator
        this.handleChange();
    }

    handleMonthlyDepositChange(value) {
        //Validation occurs in child handler
        this.setState({ monthlyDeposit: value });
        this.handleChange();
    }

    handleInterestRateChange(value) {
        this.setState({ interestRate: value });
        this.handleChange();
    }

    handlePaymentFrequencyChange(value) {
        //No validation needed.
        this.setState({ paymentFrequency: value });
        this.handleChange();
    }

    handleMutationComplete(data) {
        var sav = [];
        var intr = [];

        sav.map(month => sav.push({ x: month.id, y: month.totalValue }));
        intr.map(month => intr.push({ x: month.id, y: month.totalInterest }));
        this.setState({ savT: sav, intT: intr }); //Graph has been updated
    }

    handleChange() {
        //DO: validate input. Might not care if any values are zero actually, but should double check to ensure values are non-null.
        if (
            this.state.initialDeposit !== "" &&
            this.state.monthlyDeposit !== "" &&
            this.state.paymentFrequency !== ""
        ) {
            this.setState({queryBool: true})
        } else {
            console.log("Input Requirements not met, will not generate graph.");
        }
    }

    render() {
        const initialDeposit = this.state.initialDeposit;
        const monthlyDeposit = this.state.monthlyDeposit;
        const interestRate = this.state.interestRate;
        const paymentFrequency = this.state.paymentFrequency;

        const savT = this.state.savT; //Total savings array for graph
        const intT = this.state.intT; //Total interest array for graph

        const makeQuery = (() => {
            if(this.state.queryBool === true){
                var paymentF = Number(this.state.paymentFrequency);
                var initialD = parseFloat(this.state.initialDeposit);
                var monthlyD = parseFloat(this.state.monthlyDeposit);
                var interestR = parseFloat(this.state.interestRate);
                return  <Mutation
                    mutation={SAVINGS_MUTATION}
                    variables={{ paymentFrequency: paymentF, initialDeposit : initialD, monthlyDeposit : monthlyD, interestRate: interestR }}
                    onCompleted={this.setState({queryBool: false})}
                >
                    {(savingsmutation, { data }) =>
                        this.handleMutationComplete(data.savings.months)
                    }
                </Mutation>;
            }

        })();



        return (
            <div>
                <makeQuery />
                <p className="input-label">
                    Inputs must be positive and have no more than 15 digits with 2 decimal
                    places!
                </p>
                <div className="financial-inputs">
                    <p className="input-label">What is your initial Deposit?</p>
                    <CurrencyInput
                        value={initialDeposit}
                        onInputChange={this.handleInitialDepositChange}
                    />

                    <p className="input-label">How much will you save each month?</p>
                    <CurrencyInput
                        value={monthlyDeposit}
                        onInputChange={this.handleMonthlyDepositChange}
                    />

                    <p className="input-label">
                        What is the annual interest rate you have acquired?
                    </p>
                    <SliderInput
                        value={Number(interestRate)}
                        onInputChange={this.handleInterestRateChange}
                    />

                    <p className="input-label">
                        Specify the frequency of interest compounding.
                    </p>
                    <FrequencyInput
                        value={paymentFrequency}
                        onInputChange={this.handlePaymentFrequencyChange}
                    />
                </div>
                <div className="financial-display">
                    <DisplayGraph savT={savT} intT={intT} />
                </div>
            </div>
        );
    }
}
