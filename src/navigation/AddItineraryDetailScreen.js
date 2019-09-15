import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';

import { AddItineraryDetail } from '@container';
import { Color } from '@common';

class AddItineraryDetailScreen extends Component {
	componentDidMount() {}

	componentDidUpdate() {}

	componentWillUnmount() {}

	render() {
		const { navigation } = this.props;
		return (
			<View>
				<StatusBar
					backgroundColor={Color.transparent1}
					translucent={true}
					barStyle="dark-content"
					showHideTransition="fade"
				/>
				<AddItineraryDetail navigation={navigation} />
			</View>
		);
	}
}
export default AddItineraryDetailScreen;
