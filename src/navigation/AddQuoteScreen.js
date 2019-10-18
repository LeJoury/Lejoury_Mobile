import React, { PureComponent } from 'react';
import { View } from 'react-native';

import { Back, Title } from './IconNav';

import { AddQuote } from '@container';

import { NoInternetNotice } from '@components';
import { Color, Styles } from '@common';

class AddQuoteSreen extends PureComponent {
	static navigationOptions = ({ navigation }) => ({
		headerLeft: Back(navigation, Color.primary),
		headerTitle: Title(navigation.state.params.title, Color.headerTitleColor)
	});

	render() {
		const { navigation } = this.props;

		return (
			<View style={Styles.Common.FullFlex}>
				<AddQuote navigation={navigation} />
				<NoInternetNotice />
			</View>
		);
	}
}
export default AddQuoteSreen;
