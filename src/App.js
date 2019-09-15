import React, { Component } from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from '@redux';
import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';

import Router from './Router';

let store = null;
const middleware = [ thunk ];

store = compose(applyMiddleware(...middleware))(createStore)(reducers);
let persistor = persistStore(store);

export default class App extends Component {
	componentWillMount() {
		console.ignoredYellowBox = [ 'Warning: View.propTypes', 'Warning: BackAndroid' ];
	}

	render() {
		return (
			<Provider store={store}>
				<PersistGate persistor={persistor}>
					<Router />
				</PersistGate>
			</Provider>
		);
	}
}
