import React, { Component } from 'react';
import { View, Text, FlatList, Easing, Animated, RefreshControl, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Back } from '../../navigation/IconNav';

import { connect } from 'react-redux';
import { followTraveller, getProfile, getUserItineraries, getTravellerProfile } from '@actions';

import { UserProfileHeader, Spinner, ItineraryHolder } from '@components';
import { Languages, Color, Constants, Images } from '@common';

import styles from './styles';
const { Mode, Sizes } = Constants.Spinner;

class TravellerProfile extends Component {
	state = {
		itineraries: [],
		isLoading: false,
		selectedUser: this.props.selectedUser,
		top: new Animated.Value(20),
		pullToRefresh: false,
		page: 1,
		endReachedCalledDuringMomentum: true
	};

	_keyExtractor = (item, index) => item.itineraryId.toString();

	componentDidMount = async () => {
		const { userId } = this.state.selectedUser;
		const { token } = this.props.user;
		try {
			this.setState({ isLoading: true });
			let itineraryResponse = await this.props.getUserItineraries(token, userId, false);
			let profileResponse = await this.props.getTravellerProfile(userId, token);

			Promise.all([ itineraryResponse, profileResponse ]).then((values) => {
				if (itineraryResponse.OK) {
					this.setState({
						isLoading: false,
						itineraries: itineraryResponse.itineraries
					});
				} else {
					this.setState({
						isLoading: false
					});
				}

				if (profileResponse.OK) {
					this.setState({
						isLoading: false,
						selectedUser: profileResponse.user
					});
				} else {
					this.setState({
						isLoading: false
					});
				}
			});
		} catch (error) {
			this.setState({
				isLoading: false
			});
		}
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
						itineraries: itineraryResponse.itineraries
					});
				}
			});
		} catch (error) {
			console.log(error);
		}
	});

	componentWillUnmount() {
		this.willFocusSubscription.remove();
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
						isLoading: false,
						itineraries: itineraryResponse.itineraries
					});
				} else {
					this.setState({
						isLoading: false
					});
				}

				if (profileResponse.OK) {
					this.setState({
						isLoading: false,
						selectedUser: profileResponse.user
					});
				} else {
					this.setState({
						isLoading: false
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
			toValue: hide ? -100 : 20,
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
		const { userId } = this.state.selectedUser;
		const { token } = this.props.user;

		if (!this.state.endReachedCalledDuringMomentum) {
			try {
				let response = await this.props.getUserItineraries(token, userId, false, this.state.page);
				this.setState({ endReachedCalledDuringMomentum: true });
				if (response.OK) {
					this.setState((prevState) => {
						return {
							page: prevState.page + 1
						};
					});
				}
			} catch (error) {}
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
					contentContainerStyle={styles.containerStyle}
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
