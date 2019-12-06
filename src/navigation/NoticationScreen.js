import React, { PureComponent } from 'react';
import { View, StatusBar } from 'react-native';
import { Title } from './IconNav';

import { Notification } from '@container';

import { NoInternetNotice } from '@components';
import { Color, Languages, Styles } from '@common';

class NotifcationScreen extends PureComponent {
	static navigationOptions = ({ navigation }) => ({
		headerTitle: Title(Languages.Notification, Color.headerTitleColor)
	});

	render() {
		return (
			<View style={Styles.Common.FullFlex}>
				<Notification />
			</View>
		);
	}
}
export default NotifcationScreen;
