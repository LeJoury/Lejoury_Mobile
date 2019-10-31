import React, { Component } from 'react';
import { View, Animated, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { Icon } from 'react-native-elements';

import { CircleBack, AddBookmark } from '../../navigation/IconNav';

import { connect } from 'react-redux';
import { getItineraryById, likeItinerary } from '@actions';

import { Styles, Languages, Color, Device, Constants } from '@common';
import { TravellerInfoHolder, Timeline, Spinner, Button } from '@components';

import styles from './styles';

const { width, height } = Dimensions.get('window');

const TYPE_LIKE = 'LIKE';
const TYPE_UNLIKE = 'UNLIKE';

const PARALLAX_HEADER_HEIGHT = Device.isIphoneX ? 450 : 350;
const backTop = Device.isIphoneX ? 35 : 20;
const { Mode, Sizes } = Constants.Spinner;

class ItineraryDetails extends Component {
	constructor(props) {
		super(props);

		this.state = {
			scrollY: new Animated.Value(backTop),
			isLoading: false,
			itinerary: this.props.itinerary
		};
	}
	_keyExtractor = (item) => item.id.toString();

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

	componentDidUpdate() {}

	componentWillUnmount() {}

	onActivityPress = (activity) => {
		const { navigation } = this.props;

		navigation.navigate('ActivityDetail', {
			selectedActivity: activity
		});
	};

	onBackHandle = () => {
		const { navigation } = this.props;
		navigation.goBack(null);
	};

	onGoToViewImages = () => {
		const { navigation } = this.props;
		const { itinerary } = this.state;
		let images = [ itinerary.coverPhoto ];

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
					itinerary: { ...itinerary, liked: !itinerary.liked }
				});
			}
		} catch (error) {
			console.log(error);
		}
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
									{Languages.Day} {day.identifier}
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
									onEventPress={this.onActivityPress}
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
		const { navigation } = this.props;

		return (
			<View style={Styles.Common.ColumnCenterBetween}>
				<View style={styles.navButtonWrapper}>
					<View style={[ styles.backButton, { top: backTop } ]}>{CircleBack(navigation, Color.white)}</View>
					<View style={[ styles.bookmarkButton, { top: backTop } ]}>
						{AddBookmark(navigation, Color.white)}
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
								countryTextSize={18}
								titleTextSize={15}
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
			</View>
		);
	}
}

const mapStateToProps = ({ user }) => ({
	user
});

export default connect(mapStateToProps, { getItineraryById, likeItinerary })(ItineraryDetails);
