import React, { Component } from 'react';
import { StatusBar, SafeAreaView, View } from 'react-native';
import { Back, Title } from './IconNav';

import { ItineraryDetails } from '@container';
import { Color, Styles } from '@common';

class ItineraryDetailsScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		// headerLeft: Back(navigation, Color.primary),
		// title: navigation.state.routeName, // journey name
		// headerTitleStyle: Styles.Common.headerStyle
	});

	componentDidMount() {}

	componentDidUpdate() {}

	componentWillUnmount() {}

	render() {
		const { navigation } = this.props;
		const itinerary = navigation.getParam('itinerary');

		return <ItineraryDetails navigation={this.props.navigation} itinerary={itinerary} />;
	}
}
export default ItineraryDetailsScreen;
