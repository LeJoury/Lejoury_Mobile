import React, { Component } from 'react';
import { View, Alert, Animated, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import ActionSheet from 'react-native-actionsheet';
import { Icon } from 'react-native-elements';

import { connect } from 'react-redux';
import {
	getItineraryById,
	likeItinerary,
	addBookmark,
	removeBookmark,
	deleteItineraryByID,
	unPublishItineraryByID,
	getProfile,
	getDraftItineraries,
	getUserItineraries
} from '@actions';

import { CircleBack, AddBookmark, RemoveBookmark, MoreOptions } from '../../navigation/IconNav';

import { Styles, Languages, Color, Device, Constants, showOkAlert } from '@common';
import { TravellerInfoHolder, Timeline, Spinner, Button } from '@components';

import styles from './styles';

const { width, height } = Dimensions.get('window');

const TYPE_LIKE = 'LIKE';
const TYPE_UNLIKE = 'UNLIKE';

const PARALLAX_HEADER_HEIGHT = Device.isIphoneX ? 450 : 350;
const backTop = Device.isIphoneX ? 35 : 20;
const { Mode, Sizes } = Constants.Spinner;
const { Bucket_Type } = Constants.Bucket_Type;

const BUTTONS = [ Languages.Edit, Languages.SetToDraft, Languages.Delete, Languages.Cancel ];
const EDIT_INDEX = 0;
const SET_DRAFT_INDEX = 1;
const REMOVE_INDEX = 2;
const CANCEL_INDEX = 3;

const STATUS_PUBLISHED = 'PUBLISHED';

class ItineraryDetails extends Component {
	constructor(props) {
		super(props);

		this.state = {
			scrollY: new Animated.Value(backTop),
			isLoading: false,
			itinerary: this.props.itinerary
		};
	}

	componentDidMount = async () => {
		this.setState({ isLoading: true });
		try {
			const { itinerary } = this.state;

			let response = await this.props.getItineraryById(this.props.user.token, itinerary.itineraryId);

			if (response.OK) {
				this.setState({
					isLoading: false,
					itinerary: response.itinerary
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	//TODO: pull to refresh

	componentDidUpdate() {}

	willFocusSubscription = this.props.navigation.addListener('willFocus', async (payload) => {
		try {
			const { itinerary } = this.state;

			let response = await this.props.getItineraryById(this.props.user.token, itinerary.itineraryId);

			if (response.OK) {
				this.setState({
					itinerary: response.itinerary
				});
			}
		} catch (error) {
			console.log(error);
		}
	});

	componentWillUnmount() {}

	updateActivityBookmark = (result, id) => {
		var tmpItinerary = this.state.itinerary;
		for (let i = 0; i < tmpItinerary.days.length; i++) {
			let tmpActivity = tmpItinerary.days[i].activities.find((act) => act.id === id);
			tmpActivity.bookmarked = result;
			break;
		}

		this.setState({
			itinerary: tmpItinerary
		});
	};

	onActivityBookmarkPress = async (activity) => {
		const { token } = this.props.user;
		const { id } = activity;

		try {
			if (!activity.bookmarked) {
				let response = await this.props.addBookmark(token, id, Bucket_Type.ACTIVITY);

				if (response.OK) {
					var tmpItinerary = this.state.itinerary;
					for (let i = 0; i < tmpItinerary.days.length; i++) {
						let tmpActivity = tmpItinerary.days[i].activities.find((act) => act.id === id);
						tmpActivity.bookmarked = true;
						break;
					}

					this.setState({
						itinerary: tmpItinerary
					});
				}
			} else {
				let response = await this.props.removeBookmark(token, id, Bucket_Type.ACTIVITY);

				if (response.OK) {
					var tmpItinerary = this.state.itinerary;
					for (let i = 0; i < tmpItinerary.days.length; i++) {
						let tmpActivity = tmpItinerary.days[i].activities.find((act) => act.id === id);
						tmpActivity.bookmarked = false;
					}

					this.setState({
						itinerary: tmpItinerary
					});
				}
			}
		} catch (error) {}
	};

	onMoreOptionPress = () => {
		this.ActionSheet.show();
	};

	onItineraryBookmarkPress = async () => {
		const { itinerary } = this.state;
		const { itineraryId } = itinerary;
		const { token } = this.props.user;

		try {
			if (!itinerary.bookmarked) {
				let response = await this.props.addBookmark(token, itineraryId, Bucket_Type.ITINERARY);

				if (response.OK) {
					this.setState({
						itinerary: {
							...this.state.itinerary,
							bookmarked: true
						}
					});
				}
			} else {
				let response = await this.props.removeBookmark(token, itineraryId, Bucket_Type.ITINERARY);

				if (response.OK) {
					this.setState({
						itinerary: {
							...this.state.itinerary,
							bookmarked: false
						}
					});
				}
			}
			this.props.navigation.state.params.refreshBookmarks();
		} catch (error) {}
	};

	onActivityPress = (activityIndex, dayIndex) => {
		const { navigation } = this.props;
		const { itinerary } = this.state;

		navigation.navigate('ActivityDetail', {
			days: itinerary.days,
			dayIndex: dayIndex,
			activityIndex: activityIndex,
			updateBookmark: this.updateActivityBookmark
		});
	};

	onBackHandle = () => {
		const { navigation } = this.props;
		navigation.goBack(null);
	};

	onGoToViewImages = () => {
		const { navigation } = this.props;
		const { itinerary } = this.state;
		let coverPhoto = {
			link: itinerary.coverPhoto,
			id: -1
		};

		let images = [ coverPhoto ];

		for (let day = 0; day < itinerary.days.length; day++) {
			for (let activity = 0; activity < itinerary.days[day].activities.length; activity++) {
				images.push(...itinerary.days[day].activities[activity].photos);
			}
		}

		navigation.navigate('ViewImages', {
			images: images,
			title: itinerary.title
		});
	};

	onLikePress = async () => {
		const { itinerary } = this.state;

		try {
			let type = !itinerary.liked === true ? TYPE_LIKE : TYPE_UNLIKE;
			let response = await this.props.likeItinerary(this.props.user.token, itinerary.itineraryId, type);

			if (response.OK) {
				this.setState({
					itinerary: {
						...itinerary,
						liked: !itinerary.liked,
						totalLikes: type === TYPE_LIKE ? itinerary.totalLikes + 1 : itinerary.totalLikes - 1
					}
				});
			}
		} catch (error) {
			console.log(error);
		}
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
									const { itineraryId } = this.state.itinerary;
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

												this.props.navigation.goBack(null);
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
										const { itineraryId } = this.state.itinerary;
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
													this.props.navigation.goBack(null);
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
						const { itineraryId } = this.state.itinerary;

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

	renderDayTimeline() {
		const { itinerary } = this.state;
		const { days } = itinerary;

		return (
			<View>
				{days.map((day, index) => {
					return (
						<View key={index}>
							<View style={styles.dayContainer}>
								<Text style={styles.dayTextStyle}>
									{Languages.Day} {day.day}
								</Text>
								<Text style={styles.dayTextStyle}>{day.date}</Text>
							</View>
							<View style={{ marginTop: 4 }}>
								<Timeline
									key={index}
									data={day.activities}
									options={{
										style: { marginTop: 10 }
									}}
									onEventPress={(activityIndex) => this.onActivityPress(activityIndex, index)}
									onBookmarkPress={this.onActivityBookmarkPress}
								/>
							</View>
						</View>
					);
				})}
			</View>
		);
	}

	renderBackground = () => {
		const { itinerary } = this.state;

		return (
			<View style={styles.imageWrapper}>
				<Image
					source={{
						uri: itinerary.coverPhoto
						// cache: 'only-if-cached'
					}}
					style={styles.image}
					resizeMode="cover"
				/>
			</View>
		);
	};

	renderForeground = () => {
		const { navigation, user } = this.props;
		const { itinerary } = this.state;
		const { traveller } = itinerary;

		const isMe = traveller.userId === user.userId;

		return (
			<View style={styles.foregroundWrapper}>
				<View style={styles.navButtonWrapper}>
					<View style={[ styles.backButton, { top: backTop } ]}>{CircleBack(navigation, Color.white)}</View>
					<View style={Styles.Common.Row}>
						<View style={[ styles.bookmarkButton, { top: backTop } ]}>
							{itinerary.bookmarked ? (
								RemoveBookmark(navigation, Color.white, this.onItineraryBookmarkPress)
							) : (
								AddBookmark(navigation, Color.white, this.onItineraryBookmarkPress)
							)}
						</View>
						{isMe && (
							<View style={[ styles.moreButton, { top: backTop } ]}>
								{MoreOptions(navigation, Color.white, this.onMoreOptionPress)}
							</View>
						)}
					</View>
				</View>
				<TouchableOpacity style={styles.viewImageWrapper} onPress={this.onGoToViewImages}>
					<Icon name="image" type="feather" color={Color.lightGrey6} size={16} />
					<Button
						text={Languages.ViewImage}
						textStyle={styles.viewImageTextStyle}
						containerStyle={styles.viewImageButton}
						onPress={this.onGoToViewImages}
					/>
				</TouchableOpacity>

				{itinerary.quote !== '' &&
				itinerary.quote && (
					<View style={styles.quoteWrapper}>
						<Text style={styles.quoteTextStyle}>{itinerary.quote}</Text>
					</View>
				)}
			</View>
		);
	};

	renderLoading() {
		const { isLoading } = this.state;

		if (!isLoading) return;

		return <Spinner mode={Mode.overlay} size={Sizes.SMALL} color={Color.lightTextPrimary} />;
	}

	render() {
		const { itinerary } = this.state;

		const backgroundColorInterpolate = this.state.scrollY.interpolate({
			inputRange: [ 0, 180, 181 ],
			outputRange: [ Color.white90T, Color.white10T, Color.transparent ]
		});

		const shadowOpacityInterpolate = this.state.scrollY.interpolate({
			inputRange: [ 0, 180, 181 ],
			outputRange: [ 0.5, 0.3, 0 ]
		});

		return (
			<View style={Styles.Common.FullFlex}>
				<View style={{ position: 'absolute', top: 0 }}>{this.renderLoading()}</View>
				<ParallaxScrollView
					style={styles.scrollViewContainer}
					parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
					backgroundColor={Color.transparent}
					scrollEventThrottle={16}
					onScroll={Animated.event(
						[
							{
								nativeEvent: { contentOffset: { y: this.state.scrollY } }
							}
						],
						{},
						{
							useNativeDriver: true // <- Native Driver used for animated events
						}
					)}
					renderBackground={this.renderBackground}
					renderForeground={this.renderForeground}
				>
					<View style={styles.subContain}>
						<Animated.View style={Styles.Common.ColumnCenter}>
							<TravellerInfoHolder
								itinerary={itinerary}
								traveller={itinerary.traveller}
								mainContainer={[
									styles.travellerMainContainer,
									{
										shadowOpacity: shadowOpacityInterpolate
									}
								]}
								contentContainer={[
									styles.travellerContentContainer,
									{
										backgroundColor: backgroundColorInterpolate
									}
								]}
								countryTextSize={15}
								titleTextSize={16}
								travellerPicSize={28}
								travellerNameSize={16}
								travellerWrapperMarginTop={12}
								heartIconSize={Styles.IconSize.Medium}
								onLikePress={() => this.onLikePress()}
							/>
						</Animated.View>
						<View style={styles.timelineContainer}>{this.renderDayTimeline()}</View>
					</View>
				</ParallaxScrollView>
				{this.renderLoading()}
				{this.renderActionSheet()}
			</View>
		);
	}
}

const mapStateToProps = ({ user }) => ({
	user
});

export default connect(mapStateToProps, {
	getItineraryById,
	likeItinerary,
	addBookmark,
	removeBookmark,
	deleteItineraryByID,
	unPublishItineraryByID,
	getProfile,
	getDraftItineraries,
	getUserItineraries
})(ItineraryDetails);
