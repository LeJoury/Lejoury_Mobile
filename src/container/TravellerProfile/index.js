import React, { Component } from 'react';
import { View, Text, FlatList, Easing, Animated, RefreshControl, Image, BackHandler } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Back } from '../../navigation/IconNav';

import { connect } from 'react-redux';
import { followTraveller, getProfile, getUserItineraries, getTravellerProfile } from '@actions';

import { UserProfileHeader, Spinner, ItineraryHolder } from '@components';
import { Languages, Color, Constants, Device, Images } from '@common';

import styles from './styles';
const { Mode, Sizes } = Constants.Spinner;

const TOP_IPHONE_X = 32;
const TOP_NORMAL_IPHONE = 20;

class TravellerProfile extends Component {
	state = {
		itineraries: [],
		isLoading: false,
		selectedUser: this.props.selectedUser,
		top: new Animated.Value(Device.isIphoneX ? TOP_IPHONE_X : TOP_NORMAL_IPHONE),
		pullToRefresh: false,
		page: 1,
		isLastPage: false,
		endReachedCalledDuringMomentum: true
	};

	_keyExtractor = (item, index) => item.itineraryId.toString();

	componentWillMount() {
		BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
	}
	componentDidMount = () => {
		this.setState({ isLoading: true });
	};

	willFocusSubscription = this.props.navigation.addListener('willFocus', async (payload) => {
		const { userId } = this.state.selectedUser;
		const { token } = this.props.user;

		try {
			let itineraryResponse = await this.props.getUserItineraries(token, userId, false);
			let profileResponse = await this.props.getTravellerProfile(userId, token);

			Promise.all([ profileResponse, itineraryResponse ]).then((values) => {
				if (profileResponse.OK) {
					this.setState({
						selectedUser: profileResponse.user
					});
				}

				if (itineraryResponse.OK) {
					this.setState({
						page: 1,
						isLastPage: itineraryResponse.isLastPage,
						itineraries: itineraryResponse.itineraries
					});
				}

				this.setState({
					isLoading: false
				});
			});
		} catch (error) {
			this.setState({
				isLoading: false
			});
			console.log(error);
		}
	});

	componentWillUnmount() {
		this.willFocusSubscription.remove();
		BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
	}

	handleBackButtonClick = () => {
		this.props.navigation.goBack(null);
		return true;
	}

	refreshProfile = async () => {
		const { userId } = this.state.selectedUser;
		const { token } = this.props.user;
		try {
			this.setState({ pullToRefresh: true });
			let itineraryResponse = await this.props.getUserItineraries(token, userId, false);
			let profileResponse = await this.props.getTravellerProfile(userId, token);

			Promise.all([ itineraryResponse, profileResponse ]).then((values) => {
				if (itineraryResponse.OK) {
					this.setState({
						pullToRefresh: false,
						page: 1,
						itineraries: itineraryResponse.itineraries,
						isLastPage: itineraryResponse.isLastPage
					});
				} else {
					this.setState({
						pullToRefresh: false
					});
				}

				if (profileResponse.OK) {
					this.setState({
						pullToRefresh: false,
						selectedUser: profileResponse.user
					});
				} else {
					this.setState({
						pullToRefresh: false
					});
				}
			});
		} catch (error) {
			this.setState({
				pullToRefresh: false
			});
		}
	};

	componentDidUpdate() {}

	navigateToFollowers = () => {};

	navigateToFollowing = () => {};

	navigateToItineraries = () => {};

	setBackButtonHide = (hide) => {
		Animated.timing(this.state.top, {
			duration: 50,
			toValue: hide ? -100 : Device.isIphoneX ? TOP_IPHONE_X : TOP_NORMAL_IPHONE,
			easing: Easing.linear
		}).start();
	};

	onFollow = async (action) => {
		const { userId } = this.state.selectedUser;
		const { token } = this.props.user;

		try {
			let response = await this.props.followTraveller(token, userId, action);

			if (response.OK) {
				await this.props.getProfile(this.props.user.userId, token);
				let travellerResponse = await this.props.getTravellerProfile(userId, token);

				if (travellerResponse.OK) {
					this.setState({
						selectedUser: travellerResponse.user
					});
				}
			}
		} catch (error) {}
	};

	onPressItinerary = (itinerary) => {
		this.props.navigation.navigate('ItineraryDetails', {
			itinerary: itinerary
		});
	};

	handleLoadMore = async () => {
		const { isLastPage, selectedUser } = this.state;
		const { userId } = selectedUser;
		const { token } = this.props.user;

		if (!this.state.endReachedCalledDuringMomentum) {
			if (!isLastPage) {
				try {
					let response = await this.props.getUserItineraries(token, userId, false, this.state.page + 1);
					this.setState({ endReachedCalledDuringMomentum: true });

					if (response.OK) {
						console.log(response);
						this.setState((prevState) => {
							return {
								page: prevState.page + 1,
								itineraries: prevState.itineraries.concat(response.itineraries),
								isLastPage: response.isLastPage
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

	renderLoading = () => {
		const { isLoading } = this.state;

		if (!isLoading) {
			return;
		}
		return <Spinner mode={Mode.overlay} size={Sizes.SMALL} color={Color.lightTextPrimary} />;
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
		const { selectedUser } = this.state;

		return (
			<View>
				<UserProfileHeader
					user={selectedUser}
					isMe={false}
					onFollowClick={(action) => this.onFollow(action)}
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
		const { itineraries } = this.state;

		return (
			<LinearGradient colors={[ Color.splashScreenBg1, Color.splashScreenBg1, Color.white, Color.white ]}>
				<Animated.View style={[ styles.backButton, { top: this.state.top } ]}>
					{Back(navigation, Color.white)}
				</Animated.View>
				<FlatList
					data={itineraries}
					extraData={this.state}
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
				{this.renderLoading()}
			</LinearGradient>
		);
	}
}

const mapStateToProps = ({ user }) => ({
	user
});

export default connect(mapStateToProps, { followTraveller, getProfile, getUserItineraries, getTravellerProfile })(
	TravellerProfile
);
