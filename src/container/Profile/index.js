import React, { Component } from 'react';
import { View, Text, ScrollView, ImageBackground, Image } from 'react-native';
// import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { NavigationActions } from 'react-navigation';

import { connect } from 'react-redux';
import { getProfile, getFollowers, getFollowing } from '@actions';

import { ProfileItineraryList, MemoryList, PictureList } from '@container';
import { UserProfileHeader } from '@components';
import { Images, Languages, Color, Constants } from '@common';

import styles from './styles';

class Profile extends Component {
	//constructor(props) {
	//super (props)
	//}

	componentDidMount = async () => {
		const { userId, token } = this.props.user;
		try {
			let followersResponse = await this.props.getFollowers(token);
			let followingResponse = await this.props.getFollowing(token);

			Promise.all([ followersResponse, followingResponse ]).then((values) => {
				// console.log(values);
				// console.log(values);
			});
		} catch (error) {}
		// console.log(this.props.profile);
	};

	navigateToFollowers = () => {
		const { profile } = this.props;

		this.props.navigation.dispatch(
			NavigationActions.navigate({
				routeName: 'ProfileFollower',
				params: {
					username: profile.username
				},
				action: NavigationActions.navigate({ routeName: 'Followers' })
			})
		);
	};

	navigateToFollowing = () => {
		const { profile } = this.props;

		this.props.navigation.dispatch(
			NavigationActions.navigate({
				routeName: 'ProfileFollowing',
				params: {
					username: profile.username
				},
				action: NavigationActions.navigate({ routeName: 'Following' })
			})
		);
	};

	navigateToItineraries = () => {};

	onEditProfilePress = () => {
		const { profile } = this.props;

		this.props.navigation.navigate('EditProfile', { profile });
	};

	render() {
		const { profile, navigation } = this.props;

		const { itineraries } = this.props.profile;

		return (
			<ScrollView ref="scrollView" contentContainerStyle={styles.container}>
				<UserProfileHeader
					user={profile}
					isMe={true}
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
							<ProfileItineraryList
								itineraries={itineraries}
								user={profile}
								navigation={navigation}
								type={'carousel'}
							/>
						</View>
					</View>
				) : (
					<View style={styles.noItinerariesContainer}>
						<Image style={styles.noItinerariesImage} source={Images.defaultLogo} />
						<Text style={styles.noItinerariesText}>
							{profile.username}
							{Languages.NoItineraries}
						</Text>
					</View>
				)}
			</ScrollView>
		);
	}
}

const mapStateToProps = ({ user, profile }) => ({
	user,
	profile
});

export default connect(mapStateToProps, { getProfile, getFollowers, getFollowing })(Profile);
