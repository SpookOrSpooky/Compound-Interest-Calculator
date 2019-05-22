import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const httpLink = createHttpLink({
    uri: "http://localhost:8000/gql"
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});

//Below is where Apollo Provider implementation usually happends
ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById("root")
);
registerServiceWorker();
