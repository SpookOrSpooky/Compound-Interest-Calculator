import React, {Component} from 'react'

class Month extends Component {



    constructor(props) {
        super(props)

        this.state = {
            hasFocus: false,
            num: props.defaultValue,
            interest: props.defaultValue,
            totalInterest: props.defaultValue,
            totalValue: props.defaultValue
        }
    }
    render() {

        const num = this.props.key;
        const totalVal = this.props.month.totalValue;
        const totalInt = this.props.month.totalInterest;

        return (

            <div>
                <div>
                    {this.props.savings.id} ({this.props.savings.paymentFrequency})
                </div>
            </div>
        )
    }
}
export default Savings
