import React, { PureComponent } from 'react';

import { Back, Title } from './IconNav';

import { ItineraryList } from '@container';

import { NoInternetNotice } from '@components';
import { Color, Styles } from '@common';

class ItineraryListScreen extends PureComponent {
	static navigationOptions = ({ navigation }) => ({
		headerLeft: Back(navigation, Color.primary),
		headerTitle: Title(navigation.state.params.routeTitle, Color.headerTitleColor)
	});

	componentDidMount() {}

	componentDidUpdate() {}

	componentWillUnmount() {}

	render() {
		const { navigation } = this.props;

		return <ItineraryList navigation={navigation} />;
	}
}
export default ItineraryListScreen;
