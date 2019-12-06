import React, { PureComponent } from 'react';

import { Back, Title } from './IconNav';

import { Traveller } from '@container';
import { Color } from '@common';

class TravellerListScreen extends PureComponent {
	static navigationOptions = ({ navigation }) => ({
		headerLeft: Back(navigation, Color.primary),
		headerTitle: Title(navigation.state.routeName, Color.headerTitleColor),
	});

	render() {
		return <Traveller navigation={this.props.navigation}/>;
	}
}
export default TravellerListScreen;
