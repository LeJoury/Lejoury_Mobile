import React, { Component } from 'react';
import { View, Text, ScrollView, Easing, Animated, RefreshControl, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Back } from '../../navigation/IconNav';

import { connect } from 'react-redux';
import { followTraveller, getProfile, getPublishedItineraries, getTravellerProfile } from '@actions';

import { UserProfileHeader, Spinner, ProfileItineraryList } from '@components';
import { Images, Languages, Color, Constants } from '@common';

import styles from './styles';
const { Mode, Sizes } = Constants.Spinner;

class TravellerProfile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			itineraries: [],
			isLoading: false,
			selectedUser: this.props.selectedUser,
			top: new Animated.Value(20),
			pullToRefresh: false
		};
	}

	componentDidMount = async () => {
		const { userId } = this.state.selectedUser;
		const { token } = this.props.user;
		try {
			this.setState({ isLoading: true });
			let itineraryResponse = await this.props.getPublishedItineraries(token, userId, false);
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
			console.log(error);
			this.setState({
				isLoading: false
			});
		}
	};

	refreshProfile = async () => {
		const { userId } = this.state.selectedUser;
		const { token } = this.props.user;
		try {
			this.setState({ pullToRefresh: true });
			let itineraryResponse = await this.props.getPublishedItineraries(token, userId, false);
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

	componentWillUnmount() {}

	navigateToFollowers = () => {
		// const { profile } = this.props;
		// this.props.navigation.dispatch(
		// 	NavigationActions.navigate({
		// 		routeName: 'ProfileFollower',
		// 		params: {
		// 			username: profile.username
		// 		},
		// 		action: NavigationActions.navigate({ routeName: 'Followers' })
		// 	})
		// );
	};

	navigateToFollowing = () => {
		// const { profile } = this.props;
		// this.props.navigation.dispatch(
		// 	NavigationActions.navigate({
		// 		routeName: 'ProfileFollowing',
		// 		params: {
		// 			username: profile.username
		// 		},
		// 		action: NavigationActions.navigate({ routeName: 'Following' })
		// 	})
		// );
	};

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
	render() {
		const { navigation } = this.props;
		const { itineraries, selectedUser } = this.state;

		return (
			<LinearGradient colors={[ Color.splashScreenBg1, Color.splashScreenBg1, Color.white, Color.white ]}>
				<Animated.View style={[ styles.backButton, { top: this.state.top } ]}>
					{Back(navigation, Color.white)}
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
						user={selectedUser}
						isMe={false}
						onFollowClick={(action) => this.onFollow(action)}
						onViewItinerariesPress={this.navigateToItineraries}
					/>
					<View style={styles.separator} />
					{itineraries.length > 0 ? (
						<View>
							<View style={styles.sectionContainer}>
								<Text style={styles.sectionTitle}>{Languages.Collections}</Text>
								<ProfileItineraryList itineraries={itineraries} navigation={navigation} />
							</View>
						</View>
					) : (
						<View style={styles.noItinerariesContainer}>
							<Image style={styles.noItinerariesImage} source={Images.defaultLogo} />
							<Text style={styles.noItinerariesText}>
								{selectedUser.username}
								{Languages.NoItineraries}
							</Text>
						</View>
					)}
					{this.renderLoading()}
				</ScrollView>
			</LinearGradient>
		);
	}
}

const mapStateToProps = ({ user }) => ({
	user
});

export default connect(mapStateToProps, { followTraveller, getProfile, getPublishedItineraries, getTravellerProfile })(
	TravellerProfile
);
