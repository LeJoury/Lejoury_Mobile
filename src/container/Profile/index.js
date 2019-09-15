import React, { Component } from 'react';
import { View, Text, ScrollView, ImageBackground, Image } from 'react-native';
// import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { NavigationActions } from 'react-navigation';

import { ItineraryList, MemoryList, PictureList } from '@container';
import { UserProfileHeader, UserProfileItem, ProfileCenterItem } from '@components';
import { Images, Languages, toCapitalized, Color, Constants } from '@common';

import { connect } from 'react-redux';

import styles from './styles';

class Profile extends Component {
	//constructor(props) {
	//super (props)
	//}

	componentDidMount() {}

	componentDidUpdate() {}

	componentWillUnmount() {}

	_getName = (user) => {
		if (user != null) {
			if (typeof user.last_name != 'undefined' || typeof user.first_name != 'undefined') {
				let first = user.first_name != null ? user.first_name : '';
				let last = user.last_name != null ? user.last_name : '';
				return first + ' ' + last;
			} else if (typeof user.username != 'undefined' && user.username != null) {
				return toCapitalized(user.username);
			} else {
				return 'Guest';
			}
		}
		return 'Guest';
	};

	navigateToFollowers = () => {
		const { user } = this.props;

		this.props.navigation.dispatch(
			NavigationActions.navigate({
				routeName: 'TravellerListScreen',
				params: {
					username: user.username
				},
				action: NavigationActions.navigate({ routeName: 'Followers' })
			})
		);
	};

	navigateToFollowing = () => {
		const { user } = this.props;

		this.props.navigation.dispatch(
			NavigationActions.navigate({
				routeName: 'TravellerListScreen',
				params: {
					username: user.username
				},
				action: NavigationActions.navigate({ routeName: 'Following' })
			})
		);
	};

	navigateToItineraries = () => {};

	onEditProfilePress = () => {
		const { user } = this.props;

		this.props.navigation.navigate('EditProfileScreen', { user });
	};

	render() {
		const { user, isMe, navigation } = this.props;
		
		const itineraries = [];

		const name = this._getName(user);

		return (
			<ScrollView ref="scrollView" contentContainerStyle={{ flexGrow: 1 }}>
				<UserProfileHeader
					user={user}
					isMe={isMe}
					onEditProfilePress={this.onEditProfilePress}
					onViewFollowersPress={this.navigateToFollowers}
					onViewFollowingPress={this.navigateToFollowing}
					onViewItinerariesPress={this.navigateToItineraries}
				/>
				<View style={styles.separator} />
				{itineraries.length > 0 ? (
					<View>
						<View style={styles.sectionContainer}>
							<Text style={styles.sectionTitle}>{Languages.Collections}</Text>
							<ItineraryList
								itineraries={itineraries}
								user={user}
								navigation={navigation}
								type={'carousel'}
							/>
						</View>
					</View>
				) : (
					<View style={styles.noItinerariesContainer}>
						<Image style={styles.noItinerariesImage} source={Images.defaultLogo} />
						<Text style={styles.noItinerariesText}>{name} {Languages.NoItineraries}</Text>
					</View>
				)}
			</ScrollView>
		);
	}
}
export default Profile;
