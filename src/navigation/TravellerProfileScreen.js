import React, { PureComponent } from 'react';
import { View } from 'react-native';

import { Title, Back } from './IconNav';

import { Profile } from '@container';

import { NoInternetNotice } from '@components';
import { Color, Styles } from '@common';

const user = {
	userId: '622dcef6-2e6e-4009-b810-6f39b557c70c',
	name: 'Alex Brand',
	username: 'Brand',
	emailAddress: 'Sincere@april.biz',
	bio: 'Travellers, photographers, storytellers, and dreamers.',
	gender: 'male',
	followers: 100,
	following: 50,
	countries: 8,
	itineraries: 8,
	isFollow: true
};

class TravellerProfileScreen extends PureComponent {
	static navigationOptions = ({ navigation }) => ({
		headerTitle: Title(user.username, Color.headerTitleColor),
		headerLeft: Back(navigation, Color.primary)
	});

	render() {
		return <Profile navigation={this.props.navigation} user={user} isMe={false} />;
	}
}
export default TravellerProfileScreen;
