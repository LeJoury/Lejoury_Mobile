import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Logo, Title } from './IconNav';

import { Notification } from '@container';
import { Color, Languages } from '@common';

class NotifcationScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		headerTitle: Title(Languages.Notification, Color.headerTitleColor),
	});

	componentDidMount() {}

	componentDidUpdate() {}

	componentWillUnmount() {}
	render() {
		return <Notification />;
	}
}
export default NotifcationScreen;
