import React, { PureComponent } from 'react';
import { StatusBar, SafeAreaView, Platform } from 'react-native';

import { Home } from '@container';

import { Color, Styles } from '@common';

class HomeScreen extends PureComponent {
	constructor(props) {
		super(props);
	}
	componentDidMount() {}

	componentDidUpdate() {}

	componentWillUnmount() {}

	render() {
		return (
			<SafeAreaView style={Styles.Common.FullFlex}>
				<StatusBar
					backgroundColor={Color.transparent1}
					translucent={true}
					barStyle="dark-content"
					showHideTransition="fade"
				/>
				<Home navigation={this.props.navigation} />
			</SafeAreaView>
		);
	}
}
export default HomeScreen;
