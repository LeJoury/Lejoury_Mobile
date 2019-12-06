import React, { PureComponent } from 'react';
import { StatusBar, View } from 'react-native';

import { Landing } from '@container';

import { NoInternetNotice } from '@components';
import { Color, Styles } from '@common';

class LandingScreen extends PureComponent {
	componentDidMount() {}

	componentDidUpdate() {}

	componentWillUnmount() {}
	render() {
		return (
			<View style={Styles.Common.FullFlex}>
				<StatusBar
					backgroundColor={Color.white}
					translucent={true}
					barStyle="dark-content"
					showHideTransition="fade"
				/>
				<Landing navigation={this.props.navigation} />
				<NoInternetNotice />
			</View>
		);
	}
}

export default LandingScreen;
