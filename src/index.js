import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { createClient, Provider, defaultExchanges } from "urql";


const client = createClient({
  url: "https://charge-data.herokuapp.com/v1/graphql",
  exchanges: defaultExchanges
});


ReactDOM.render(<Provider value={client}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
