import React, { PureComponent } from 'react';
import { View } from 'react-native';

import { Title, Back, Save } from './IconNav';

import { EditProfile } from '@container';

import { NoInternetNotice } from '@components';
import { Color, Languages, Styles } from '@common';

class EditProfileScreen extends PureComponent {
	static navigationOptions = ({ navigation }) => ({
		headerTitle: Title(Languages.EditProfile, Color.headerTitleColor),
		headerLeft: Back(navigation, Color.primary),
		headerRight: Save(navigation, Color.blue1)
	});

	render() {
		const { navigation } = this.props;

		return (
			<View style={Styles.Common.FullFlex}>
				<EditProfile navigation={navigation} />
				<NoInternetNotice />
			</View>
		);
	}
}
export default EditProfileScreen;
