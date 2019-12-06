import React, { PureComponent } from 'react';
import { StatusBar, View } from 'react-native';
import { NoInternetNotice } from '@components';

import { connect } from 'react-redux';
import { refreshToken } from '@actions';

import { Splash } from '@components';
import { Color, Styles } from '@common';

class SplashScreen extends PureComponent {
	performTimeConsumingTask = async () => {
		return new Promise((resolve) =>
			setTimeout(() => {
				resolve('result');
			}, 1500)
		);
	};

	async componentDidMount() {
		// Preload data from an external API
		const data = await this.performTimeConsumingTask();
		const { token } = this.props.user;

		//development
		// if (data !== null) {
		// 	try {
		// 		if (token !== null) {
		// 			// value previously stored
		// 			this.props.navigation.navigate('Main');
		// 		} else {
		// 			this.props.navigation.navigate('Landing');
		// 		}
		// 	} catch (e) {
		// 		// error reading value
		// 		console.log(e);
		// 	}
		// }

		// production
		if (data !== null) {
			if (!token) {
				this.props.navigation.navigate('Landing');
			} else {
				try {
					let result = await this.props.refreshToken(token);

					if (result.OK) {
						this.props.navigation.navigate('Main');
					} else {
						this.props.navigation.navigate('Landing');
					}
				} catch (error) {
					this.props.navigation.navigate('Landing');
				}
			}
		}
	}

	render() {
		return (
			<View style={Styles.Common.FullFlex}>
				<StatusBar
					backgroundColor={Color.transparent1}
					translucent={true}
					barStyle="dark-content"
					showHideTransition="fade"
				/>
				<Splash />
				<NoInternetNotice />
			</View>
		);
	}
}

const mapStateToProps = ({ user }) => ({
	user
});

export default connect(mapStateToProps, { refreshToken })(SplashScreen);
