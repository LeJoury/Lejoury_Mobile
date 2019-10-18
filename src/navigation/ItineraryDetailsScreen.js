import React, { PureComponent } from 'react';
import { StatusBar, SafeAreaView, View } from 'react-native';

import { Back, Title } from './IconNav';

import { ItineraryDetails } from '@container';

import { NoInternetNotice } from '@components';
import { Color, Styles } from '@common';

class ItineraryDetailsScreen extends PureComponent {
	static navigationOptions = ({ navigation }) => ({
		// headerLeft: Back(navigation, Color.primary),
		// title: navigation.state.routeName, // journey name
		// headerTitleStyle: Styles.Common.headerStyle
	});

	render() {
		const { navigation } = this.props;
		const itinerary = navigation.getParam('itinerary');

		return (
			<View style={Styles.Common.FullFlex}>
				<ItineraryDetails navigation={this.props.navigation} itinerary={itinerary} />
				<NoInternetNotice />
			</View>
		);
	}
}
export default ItineraryDetailsScreen;
