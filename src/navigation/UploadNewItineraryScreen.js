import React, { Component } from 'react';
import { Back, Title } from './IconNav';

import { UploadItinerary } from '@container';
import { Color, Languages } from '@common';

class UploadNewItineraryScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		headerLeft: Back(navigation, Color.primary),
		headerTitle: Title(Languages.Itinerary, Color.headerTitleColor)
	});

	componentDidMount() {
	}

	componentDidUpdate() {}

	componentWillUnmount() {}

	render() {
		const { navigation } = this.props;

		return <UploadItinerary navigation={navigation}/>;
	}
}

export default UploadNewItineraryScreen;
