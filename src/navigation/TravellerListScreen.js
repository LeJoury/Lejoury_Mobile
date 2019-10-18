import React, { PureComponent } from 'react';

import { Back, Title } from './IconNav';

import { Traveller } from '@container';

class TravellerListScreen extends PureComponent {
	static navigationOptions = ({ navigation }) => ({
		// headerLeft: Back(navigation, Color.primary),
		// headerTitle: Title(navigation.state.routeName, Color.headerTitleColor)
	});

	render() {
		return <Traveller />;
	}
}
export default TravellerListScreen;
