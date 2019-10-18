import React, { PureComponent } from 'react';
import { View } from 'react-native';

import { Title, Back } from './IconNav';

import { ForgotPassword } from '@container';

import { NoInternetNotice } from '@components';
import { Color, Languages, Styles } from '@common';

class ForgotPasswordScreen extends PureComponent {
	static navigationOptions = ({ navigation }) => ({
		headerTitle: Title(Languages.ForgotPassword, Color.headerTitleColor),
		headerLeft: Back(navigation, Color.primary)
	});

	componentDidMount() {}

	componentDidUpdate() {}

	componentWillUnmount() {}
	render() {
		const { navigation } = this.props;
		return (
			<View style={Styles.Common.FullFlex}>
				<ForgotPassword navigation={navigation} />
				<NoInternetNotice />
			</View>
		);
	}
}
export default ForgotPasswordScreen;
