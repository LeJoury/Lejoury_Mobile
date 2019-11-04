import React, { PureComponent } from 'react';
import { View, Text, ScrollView, Easing, RefreshControl, Animated, Image } from 'react-native';
import { NavigationActions } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';

import { Settings } from '../../navigation/IconNav';

import { connect } from 'react-redux';
import { getProfile, getFollowers, getFollowing } from '@actions';

import { UserProfileHeader, ProfileItineraryList } from '@components';
import { Images, Languages, Color } from '@common';

import styles from './styles';

class Profile extends PureComponent {
	state = {
		top: new Animated.Value(20),
		pullToRefresh: false
	};

	componentDidMount = async () => {
		const { token } = this.props.user;
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

	refreshProfile = async () => {
		const { userId, token } = this.props.user;
		this.setState({ pullToRefresh: true });

		try {
			let profileResponse = await this.props.getProfile(userId, token);
			let followersResponse = await this.props.getFollowers(token);
			let followingResponse = await this.props.getFollowing(token);

			Promise.all([ profileResponse, followersResponse, followingResponse ]).then((values) => {
				this.setState({ pullToRefresh: false });

				// console.log(values);
				// console.log(values);
			});
		} catch (error) {
			this.setState({ pullToRefresh: false });
		}
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

	setBackButtonHide = (hide) => {
		Animated.timing(this.state.top, {
			duration: 50,
			toValue: hide ? -100 : 20,
			easing: Easing.linear
		}).start();
	};

	onScrollHandle = (event) => {
		var currentOffset = event.nativeEvent.contentOffset.y;
		this.setBackButtonHide(currentOffset > 64);
	};

	onEditProfilePress = () => {
		const { profile } = this.props;

		this.props.navigation.navigate('EditProfile', { profile });
	};

	render() {
		const { profile, navigation } = this.props;

		const { itineraries } = this.props.profile;
		return (
			<LinearGradient colors={[ Color.splashScreenBg1, Color.splashScreenBg1, Color.white, Color.white ]}>
				<Animated.View style={[ styles.settingsButton, { top: this.state.top } ]}>
					{Settings(navigation, Color.white)}
				</Animated.View>
				<ScrollView
					refreshControl={
						<RefreshControl refreshing={this.state.pullToRefresh} onRefresh={this.refreshProfile} />
					}
					scrollEventThrottle={16}
					onScroll={(e) => this.onScrollHandle(e)}
					contentContainerStyle={[ styles.container, { backgroundColor: Color.white } ]}
				>
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
								<Text style={styles.sectionTitle}>{Languages.Experiences}</Text>
								<ProfileItineraryList
									itineraries={itineraries}
									user={profile}
									navigation={navigation}
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
			</LinearGradient>
		);
	}
}

const mapStateToProps = ({ user, profile }) => ({
	user,
	profile
});

export default connect(mapStateToProps, { getProfile, getFollowers, getFollowing })(Profile);
