import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import { connect } from 'react-redux';

import { Splash } from '@components';
import { Constants } from '@common';

const { ASYNCKEY } = Constants.ASYNCKEY;

class SplashScreen extends React.Component {
	performTimeConsumingTask = async () => {
		return new Promise((resolve) =>
			setTimeout(() => {
				resolve('result');
			}, 2500)
		);
	};

	async componentDidMount() {
		// Preload data from an external API
		// Preload data using AsyncStorage
		const data = await this.performTimeConsumingTask();
		// const { token } = this.props.user;

		// if (data !== null) {
		// 	if (!token) this.props.navigation.navigate('Login');
		// 	else {this.props.refreshToken(token)}
		// }

		if (data !== null) {
			try {
				const sessions = await AsyncStorage.getItem(ASYNCKEY.SESSION);
				if (sessions !== null) {
					// value previously stored
					this.props.navigation.navigate('Main');
				} else {
					this.props.navigation.navigate('Landing');
				}
			} catch (e) {
				// error reading value
				console.log(e);
			}
		}
	}

	componentDidUpdate() {
		// if (this.props.user.token !== prevProps.user.token && this.props.user.token !== null) {
		// 	this.props.navigation.navigate('Main');
		// }else if (this.props.user === null || this.props.user.token === null) {
		// 	this.props.navigation.navigate('Login');
		// }
		// this.props.navigation.navigate('Landing');
	}

	render() {
		return <Splash />;
	}
}

// const mapStateToProps = ({ user }) => ({
// 	user
// });

// export default connect(mapStateToProps, { refreshToken })(SplashScreen);
export default SplashScreen;
