import React, { Component } from 'react';
import { Traveller } from '@container';
import { Back, Title } from './IconNav';

import { Color } from '@common';

class TravellerListScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		// headerLeft: Back(navigation, Color.primary),
		// headerTitle: Title(navigation.state.routeName, Color.black2)
	});

	componentDidMount() {}

	componentDidUpdate() {}

	componentWillUnmount() {}

	render() {
		return <Traveller />;
	}
}
export default TravellerListScreen;
