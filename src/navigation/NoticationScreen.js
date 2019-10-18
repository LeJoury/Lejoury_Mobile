import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { Title } from './IconNav';

import { Notification } from '@container';

import { NoInternetNotice } from '@components';
import { Color, Languages, Styles } from '@common';

class NotifcationScreen extends PureComponent {
	static navigationOptions = ({ navigation }) => ({
		headerTitle: Title(Languages.Notification, Color.headerTitleColor)
	});

	render() {
		return <Notification />;
	}
}
export default NotifcationScreen;
