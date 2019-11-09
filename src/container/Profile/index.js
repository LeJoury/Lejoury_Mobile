import React, { PureComponent } from 'react';
import { View, Text, ScrollView, Easing, RefreshControl, Animated, Image } from 'react-native';
import { NavigationActions, FlatList } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';

import { Settings } from '../../navigation/IconNav';

import { connect } from 'react-redux';
import { getProfile, getFollowers, getFollowing, getUserItineraries } from '@actions';

import { UserProfileHeader, ProfileItineraryList, ItineraryHolder } from '@components';
import { Images, Languages, Color } from '@common';

import styles from './styles';

class Profile extends PureComponent {
	state = {
		top: new Animated.Value(20),
		pullToRefresh: false,
		page: 1
	};

	_keyExtractor = (item, index) => item.itineraryId.toString();

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

	handleLoadMore = async () => {
		const { token, userId } = this.props.user;

		this.setState(
			(prevState) => {
				return { page: prevState.page + 1 };
			},
			async () => {
				try {
					console.log(this.state.page);

					let response = await this.props.getUserItineraries(token, userId, true, this.state.page);

					if (response.OK) {
					}
				} catch (error) {}
			}
		);
	};

	onScrollHandle = (event) => {
		var currentOffset = event.nativeEvent.contentOffset.y;
		this.setBackButtonHide(currentOffset > 64);
	};

	onEditProfilePress = () => {
		const { profile } = this.props;

		this.props.navigation.navigate('EditProfile', { profile });
	};

	onPressItinerary = (itinerary) => {
		this.props.navigation.navigate('ItineraryDetails', {
			itinerary: itinerary
		});
	};

	renderItem = ({ item }) => {
		return (
			<ItineraryHolder
				itinerary={item}
				key={item.itineraryId.toString()}
				onPress={(itinerary) => this.onPressItinerary(itinerary)}
				type="profile"
			/>
		);
	};

	renderHeader = () => {
		const { profile } = this.props;

		return (
			<View>
				<UserProfileHeader
					user={profile}
					isMe={true}
					onEditProfilePress={this.onEditProfilePress}
					onViewFollowersPress={this.navigateToFollowers}
					onViewFollowingPress={this.navigateToFollowing}
					onViewItinerariesPress={this.navigateToItineraries}
				/>
				<View style={styles.separator} />
			</View>
		);
	};

	render() {
		const { navigation } = this.props;

		const { itineraries } = this.props.profile;

		return (
			<LinearGradient colors={[ Color.splashScreenBg1, Color.splashScreenBg1, Color.white, Color.white ]}>
				<Animated.View style={[ styles.settingsButton, { top: this.state.top } ]}>
					{Settings(navigation, Color.white)}
				</Animated.View>
				<FlatList
					data={itineraries}
					extraData={this.props.profile}
					refreshControl={
						<RefreshControl refreshing={this.state.pullToRefresh} onRefresh={this.refreshProfile} />
					}
					scrollEventThrottle={16}
					onScroll={(e) => this.onScrollHandle(e)}
					keyExtractor={this._keyExtractor}
					renderItem={this.renderItem}
					contentContainerStyle={{ backgroundColor: Color.white, flexGrow: 1 }}
					ListHeaderComponent={this.renderHeader()}
					onEndReachedThreshold={0.1}
					onEndReached={() => this.handleLoadMore()}
				/>
			</LinearGradient>
		);
	}
}

const mapStateToProps = ({ user, profile }) => ({
	user,
	profile
});

export default connect(mapStateToProps, { getProfile, getFollowers, getFollowing, getUserItineraries })(Profile);
