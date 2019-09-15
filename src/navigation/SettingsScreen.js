import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Back } from './IconNav';

import { Settings } from '@container';
import { Color, Styles } from '@common';

class SettingsScreen  extends Component {
	static navigationOptions = ({ navigation }) => ({
		// headerTitle: Title(user.username, Color.blackTextPrimary),
		headerLeft: Back(navigation, Color.black2)
	});

	componentDidMount() {}

	componentDidUpdate() {}

	componentWillUnmount() {}
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
