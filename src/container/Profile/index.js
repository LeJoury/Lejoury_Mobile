import React, { Component } from 'react';
import { View, Alert, Easing, RefreshControl, Animated, Image, Text } from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import { NavigationActions, FlatList } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';

import { Settings } from '../../navigation/IconNav';

import { connect } from 'react-redux';
import {
	getProfile,
	getFollowers,
	getFollowing,
	getUserItineraries,
	deleteItineraryByID,
	unPublishItineraryByID,
	getDraftItineraries
} from '@actions';

import { UserProfileHeader, ItineraryHolder } from '@components';
import { Languages, Color, Device, Images, showOkAlert } from '@common';

import styles from './styles';

const BUTTONS = [
	Languages.Edit,
	Languages.SetToDraft,
	Languages.Delete,
	Languages.Cancel
];
const EDIT_INDEX = 0;
const SET_DRAFT_INDEX = 1;
const REMOVE_INDEX = 2;
const CANCEL_INDEX = 3;

const STATUS_PUBLISHED = 'PUBLISHED';

const TOP_IPHONE_X = 32;
const TOP_NORMAL_IPHONE = 20;

class Profile extends Component {
	state = {
		top: new Animated.Value(Device.isIphoneX ? TOP_IPHONE_X : TOP_NORMAL_IPHONE),
		pullToRefresh: false,
		page: 1,
		endReachedCalledDuringMomentum: true,
		selectedItineraryForOptions: null
	};

	_keyExtractor = (item, index) => item.itineraryId.toString();

	componentDidMount = async () => {
		const { token } = this.props.user;

		try {
			let followersResponse = await this.props.getFollowers(token);
			let followingResponse = await this.props.getFollowing(token);

			Promise.all([ followersResponse, followingResponse ]).then((values) => {
				if (followersResponse.OK && followingResponse.OK) {
				}
			});
		} catch (error) {}

		// console.log(this.props.profile);
	};

	willFocusSubscription = this.props.navigation.addListener('willFocus', async (payload) => {
		const { token, userId } = this.props.user;

		try {
			let profileResponse = await this.props.getProfile(userId, token);
			let itineraryResponse = await this.props.getUserItineraries(token, userId, true, 1);
			let followersResponse = await this.props.getFollowers(token);
			let followingResponse = await this.props.getFollowing(token);

			Promise.all([ profileResponse, itineraryResponse, followersResponse, followingResponse ]).then((values) => {
				if (profileResponse.OK && itineraryResponse.OK) {
					this.setState({
						page: 1
					});
				}
			});
		} catch (error) {}
	});

	componentWillUnmount() {
		this.willFocusSubscription.remove();
	}

	refreshProfile = async () => {
		const { userId, token } = this.props.user;
		this.setState({ pullToRefresh: true });

		try {
			let profileResponse = await this.props.getProfile(userId, token);

			if (profileResponse.OK) {
				this.setState({ pullToRefresh: false });
			}
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
			toValue: hide ? -100 : Device.isIphoneX ? TOP_IPHONE_X : TOP_NORMAL_IPHONE,
			easing: Easing.linear
		}).start();
	};

	handleLoadMore = async () => {
		const { token, userId } = this.props.user;
		const { isItineraryLastPage } = this.props.profile;

		if (!this.state.endReachedCalledDuringMomentum) {
			if (!isItineraryLastPage) {
				try {
					let response = await this.props.getUserItineraries(token, userId, true, this.state.page + 1);
					this.setState({ endReachedCalledDuringMomentum: true });
					if (response.OK) {
						this.setState((prevState) => {
							return {
								page: prevState.page + 1
							};
						});
					}
				} catch (error) {}
			} else {
				this.setState({ endReachedCalledDuringMomentum: true });
			}
		}
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
		this.props.navigation.navigate('ProfileItineraryDetails', {
			itinerary: itinerary
		});
	};

	onItineraryOptionPress = (itinerary) => {
		this.setState(
			{
				selectedItineraryForOptions: itinerary
			},
			() => {
				this.ActionSheet.show();
			}
		);
	};

	renderActionSheet = () => {
		return (
			<ActionSheet
				ref={(ref) => (this.ActionSheet = ref)}
				options={BUTTONS}
				cancelButtonIndex={CANCEL_INDEX}
				destructiveButtonIndex={REMOVE_INDEX}
				onPress={(buttonIndex) => {
					if (buttonIndex === REMOVE_INDEX) {
						Alert.alert(Languages.RemoveConfirmationItineraryTitle, Languages.RemoveConfirmationItinerary, [
							{
								text: Languages.Remove,
								onPress: async () => {
									const { itineraryId } = this.state.selectedItineraryForOptions;
									const { token, userId } = this.props.user;

									try {
										let deleteResponse = await this.props.deleteItineraryByID(
											itineraryId,
											token,
											STATUS_PUBLISHED
										);

										if (deleteResponse.OK) {
											let userPublishItinerariesResponse = await this.props.getUserItineraries(
												token,
												userId,
												true,
												1
											);
											let profileResponse = await this.props.getProfile(userId, token);

											Promise.all([
												profileResponse,
												userPublishItinerariesResponse
											]).then((values) => {
												showOkAlert(
													Languages.RemoveItinerarySuccessTitle,
													Languages.RemoveItinerarySuccessMessage
												);
												
												this.setState({
													page: 1
												});
											});
										}
									} catch (error) {
										console.log(error);
									}
								},
								style: 'destructive'
							},
							{
								text: Languages.Cancel
							}
						]);
					} else if (buttonIndex === SET_DRAFT_INDEX) {
						Alert.alert(
							Languages.SetToDraftConfirmationItineraryTitle,
							Languages.SetToDraftConfirmationItinerary,
							[
								{
									text: Languages.Confirm,
									onPress: async () => {
										const { itineraryId } = this.state.selectedItineraryForOptions;
										const { token, userId } = this.props.user;

										try {
											let response = await this.props.unPublishItineraryByID(itineraryId, token);
											showOkAlert(
												Languages.SetToDraftSuccessTitle,
												Languages.SetToDraftSuccessMessage
											);

											if (response.OK) {
												let userPublishItinerariesResponse = await this.props.getUserItineraries(
													token,
													userId,
													true,
													1
												);
												let profileResponse = await this.props.getProfile(userId, token);
												let draftResponse = await this.props.getDraftItineraries(token, userId);

												Promise.all([
													profileResponse,
													userPublishItinerariesResponse,
													draftResponse
												]).then((values) => {
													this.setState({
														page: 1
													});
												});
											}
										} catch (error) {
											console.log(error);
										}
									}
								},
								{
									text: Languages.Cancel
								}
							]
						);
					} else if (buttonIndex === EDIT_INDEX) {
						const { itineraryId } = this.state.selectedItineraryForOptions;

						this.props.navigation.navigate('EditItineraryDetail', {
							itineraryId: itineraryId
						});
					} else {
						//dismiss
					}
				}}
			/>
		);
	};

	renderItem = ({ item }) => {
		return (
			<ItineraryHolder
				itinerary={item}
				key={item.itineraryId.toString()}
				onPress={(itinerary) => this.onPressItinerary(itinerary)}
				type="profile"
				isMe={true}
				onItineraryOptionPress={this.onItineraryOptionPress}
			/>
		);
	};

	renderHeader = () => {
		const { profile } = this.props;

		return (
			<View style={styles.headerContainer}>
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

	renderEmptyList = () => {
		return (
			<View style={styles.emptyContainer}>
				<Image source={Images.defaultLogo} style={styles.emptyImage} />
				<Text style={styles.emptyBucketListText}>{Languages.EmptyItinerary}</Text>
			</View>
		);
	};

	render() {
		const { navigation } = this.props;

		const { itineraries } = this.props.profile;

		return (
			<LinearGradient
				colors={[ Color.splashScreenBg1, Color.splashScreenBg1, Color.white, Color.white ]}
				styles={{ paddingTop: 30 }}
			>
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
					contentContainerStyle={styles.container}
					ListHeaderComponent={this.renderHeader()}
					ListEmptyComponent={this.renderEmptyList()}
					onEndReachedThreshold={0.2}
					onEndReached={() => this.handleLoadMore()}
					onMomentumScrollBegin={() =>
						this.setState({
							endReachedCalledDuringMomentum: false
						})}
				/>
				{this.renderActionSheet()}
			</LinearGradient>
		);
	}
}

const mapStateToProps = ({ user, profile }) => ({
	user,
	profile
});

export default connect(mapStateToProps, {
	getProfile,
	getFollowers,
	getFollowing,
	getUserItineraries,
	deleteItineraryByID,
	unPublishItineraryByID,
	getDraftItineraries
})(Profile);
