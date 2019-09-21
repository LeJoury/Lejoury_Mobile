import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';

import { Landing } from '@container';
import { Color, Styles } from '@common';

class LandingScreen extends Component {
	componentDidMount() {}

	componentDidUpdate() {}

	componentWillUnmount() {}
	render() {
		return (
			<View>
				<StatusBar
					backgroundColor={Color.transparent1}
					translucent={true}
					barStyle="dark-content"
					showHideTransition="fade"
				/>
				<Landing navigation={this.props.navigation} />
			</View>
		);
	}
}

export default LandingScreen;
