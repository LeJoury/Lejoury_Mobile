import React, { Component } from 'react';
import { View, Text, ScrollView, ImageBackground, Image } from 'react-native';
// import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';

import { connect } from 'react-redux';
import { followTraveller, getProfile, getPublishedItineraries, getTravellerProfile } from '@actions';

import { ItineraryList, MemoryList, PictureList } from '@container';
import { UserProfileHeader, UserProfileItem, ProfileCenterItem, Spinner } from '@components';
import { Images, Languages, toCapitalized, Color, Constants } from '@common';

import styles from './styles';
const { Mode, Sizes } = Constants.Spinner;

class TravellerProfile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			itineraries: [],
			isLoading: false,
			selectedUser: this.props.selectedUser
		};
	}

	componentDidMount = async () => {
		const { userId } = this.state.selectedUser;
		const { token } = this.props.user;
		try {
			this.setState({ isLoading: true });
			let response = await this.props.getPublishedItineraries(token, userId, false);
			if (response.OK) {
				this.setState({
					isLoading: false,
					itineraries: response.itineraries
				});
			} else {
				this.setState({
					isLoading: false
				});
			}
		} catch (error) {
			console.log(error);
			this.setState({
				isLoading: false
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
			<ScrollView ref="scrollView" contentContainerStyle={styles.container}>
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
							<ItineraryList
								itineraries={itineraries}
								user={selectedUser}
								navigation={navigation}
								type={'carousel'}
							/>
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
		);
	}
}

const mapStateToProps = ({ user }) => ({
	user
});

export default connect(mapStateToProps, { followTraveller, getProfile, getPublishedItineraries, getTravellerProfile })(
	TravellerProfile
);
