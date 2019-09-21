import React, { Component } from 'react';

import { Title, Back } from './IconNav';

import { ForgotPassword } from '@container';

import { Color, Languages } from '@common';

class ForgotPasswordScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		headerTitle: Title(Languages.ForgotPassword, Color.blackTextPrimary),
		headerLeft: Back(navigation, Color.primary)
	});

	componentDidMount() {}

	componentDidUpdate() {}

	componentWillUnmount() {}
	render() {
		const { navigation } = this.props;
		return <ForgotPassword navigation={navigation} />;
	}
}
export default ForgotPasswordScreen;
