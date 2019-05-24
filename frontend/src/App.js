import React, { Component } from "react";

import { ApolloProvider, createBatchingNetworkInterface } from "react-apollo";
import { ApolloClient } from "apollo-client";

import InputGraphSectionContainer from "./Components/InputGraphSection";
import "./App.css";

class App extends Component {
	state = {
		loading: false
	};

	//	componentDidMount() {
	//		calculate(1000, 1)
	//			.then(r => this.setState({
	//           	loading: false,
	//              result: r.data.result
	//		}))
	//	}

	render() {
		const { loading } = this.state;

		return (
			//<ApolloProvider client={client}>
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">
						Finimize Challenge - Compound Interest Calculator
					</h1>
				</header>
				{loading ? "Loading..." : <InputGraphSectionContainer />}
			</div>
			//</ApolloProvider>
		);
	}
}

export default App;
