import React, { Component } from 'react';
import { ScrollView } from 'react-native';

import { Title, Back, Save } from './IconNav';

import { EditProfile } from '@container';
import { Color, Styles, Languages } from '@common';

class EditProfileScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		headerTitle: Title(Languages.EditProfile, Color.blackTextPrimary),
		headerLeft: Back(navigation, Color.primary),
		headerRight: Save(navigation, Color.blue1)
	});

	componentDidMount() {}

	componentDidUpdate() {}

	componentWillUnmount() {}

	render() {
		return <EditProfile navigation={this.props.navigation} />;
	}
}
export default EditProfileScreen;
