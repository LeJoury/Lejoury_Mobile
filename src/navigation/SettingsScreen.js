import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { Back, Title } from './IconNav';

import { Settings } from '@container';

import { Color, Styles, Languages } from '@common';

class SettingsScreen extends PureComponent {
	static navigationOptions = ({ navigation }) => ({
		headerTitle: Title(Languages.Settings, Color.headerTitleColor),
		headerLeft: Back(navigation, Color.black2),
	});

	render() {
		const { navigation } = this.props;

		return (
			<View style={styles.background}>
				<Settings navigation={navigation} />
			</View>
		);
	}
}

export default SettingsScreen;

const styles = StyleSheet.create({
	background: {
		flex: 1,
		backgroundColor: Color.primary
	}
});
