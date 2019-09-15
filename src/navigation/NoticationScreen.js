import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Logo, Title } from './IconNav';

import { Notification } from '@container';
import { Color, Styles } from '@common';

class NotifcationScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		// headerTitle: Title(navigation.state.routeName, Color.black2),
	});

	componentDidMount() {}

	componentDidUpdate() {}

	componentWillUnmount() {}
	render() {
		return <Notification />;
	}
}
export default NotifcationScreen;
