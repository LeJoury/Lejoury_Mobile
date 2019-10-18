import React, { Component } from 'react';
import { View } from 'react-native';

import { Back, Title } from './IconNav';

import { AddItinerary } from '@container';

import { NoInternetNotice } from '@components';
import { Color, Languages, Styles } from '@common';

class AddNewItineraryScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		headerLeft: Back(navigation, Color.primary),
		headerTitle: Title(Languages.Itinerary, Color.headerTitleColor)
	});

	render() {
		const { navigation } = this.props;

		return (
			<View style={Styles.Common.FullFlex}>
				<AddItinerary navigation={navigation} />
				<NoInternetNotice />
			</View>
		);
	}
}

export default AddNewItineraryScreen;
