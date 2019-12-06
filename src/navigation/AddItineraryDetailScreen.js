import React, { PureComponent } from 'react';
import { StatusBar, View } from 'react-native';

import { AddItineraryDetail } from '@container';

import { NoInternetNotice } from '@components';
import { Color, Styles } from '@common';

class AddItineraryDetailScreen extends PureComponent {
	componentDidMount() {}

	componentDidUpdate() {}

	componentWillUnmount() {}

	render() {
		const { navigation } = this.props;
		return (
			<View style={Styles.Common.FullFlex}>
				<StatusBar
					backgroundColor={Color.white}
					translucent={true}
					barStyle="dark-content"
					showHideTransition="fade"
				/>
				<AddItineraryDetail navigation={navigation} />
				<NoInternetNotice />
			</View>
		);
	}
}
export default AddItineraryDetailScreen;
