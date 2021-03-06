import React, { PureComponent } from 'react';
import { View, Platform } from 'react-native';

import { Title, Back, Save } from './IconNav';

import { EditProfile } from '@container';

import { NoInternetNotice } from '@components';
import { Color, Languages, Styles } from '@common';
// defaultNavigationOptions: {
// 	gesturesEnabled: false,
// 	headerStyle: Styles.Common.toolbar
// }

class EditProfileScreen extends PureComponent {
	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state;

		return {
			headerTitle: Title(Languages.EditProfile, Color.headerTitleColor),
			headerLeft: Back(navigation, Color.primary, params.handleOnBack),
			headerRight: Save(navigation, Color.blue1, params.handleOnSave),
			gesturesEnabled: true
		};
	};

	componentDidMount() {
		this.props.navigation.setParams({ handleOnBack: this._onBackAlert, handleOnSave: this._onConfirmSave });
	}

	_onBackAlert = () => {
		this.child.showDiscardAlert();
	};

	_onConfirmSave = () => {
		this.child.onConfirmSave();
	};

	render() {
		const { navigation } = this.props;

		return (
			<View style={Styles.Common.FullFlex}>
				<EditProfile navigation={navigation} onRef={(ref) => (this.child = ref)} />
				<NoInternetNotice />
			</View>
		);
	}
}
export default EditProfileScreen;
