import React, { PureComponent } from 'react';
import { View } from 'react-native';

import { Settings, Title } from './IconNav';

import { Profile } from '@container';

import { NoInternetNotice } from '@components';
import { Color, Styles } from '@common';

const user = {
	userId: '622dcef6-2e6e-4009-b810-6f39b557c79d',
	name: 'Leanne Graham',
	username: 'Bret',
	emailAddress: 'Sincere@april.biz',
	bio: 'Travellers, photographers, storytellers, and dreamers.',
	gender: 'male',
	followers: 100,
	following: 50,
	countries: 8,
	itineraries: 8
};

class ProfileScreen extends PureComponent {
	static navigationOptions = ({ navigation }) => ({
		headerTitle: Title(user.username, Color.headerTitleColor),
		headerRight: Settings(navigation, Color.lightGrey3)
	});

	render() {
		return <Profile navigation={this.props.navigation} user={user} isMe={true} />;
	}
}
export default ProfileScreen;
