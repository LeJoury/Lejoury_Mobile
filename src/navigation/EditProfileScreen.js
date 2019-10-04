import React, { Component } from 'react';

import { Title, Back, Save } from './IconNav';

import { EditProfile } from '@container';
import { Color, Styles, Languages } from '@common';

class EditProfileScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		headerTitle: Title(Languages.EditProfile, Color.headerTitleColor),
		headerLeft: Back(navigation, Color.primary),
		headerRight: Save(navigation, Color.blue1)
	});

	componentDidMount() {}

	componentDidUpdate() {}

	componentWillUnmount() {}

	render() {
		const { navigation } = this.props;
		return <EditProfile navigation={navigation} />;
	}
}
export default EditProfileScreen;
