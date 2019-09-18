import React, { Component } from 'react';
import { View, Animated, Text, Dimensions, ScrollView, Image, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

import { CircleBack, ViewImages } from '../../navigation/IconNav';

import { DraftItinerary } from '@container';
import { Styles, Languages, Color, Device, Constants } from '@common';
import { TravellerInfoHolder, Timeline, Spinner } from '@components';

import styles from './styles';

const { width, height } = Dimensions.get('window');
const STICKY_HEADER_HEIGHT = Device.isIphoneX ? 90 : 70;
const PARALLAX_HEADER_HEIGHT = Device.isIphoneX ? 450 : 350;
const backTop = Device.isIphoneX ? 35 : 20;
const { Mode, Sizes } = Constants.Spinner;

class ItineraryDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			scrollY: new Animated.Value(backTop),
			// height: PARALLAX_HEADER_HEIGHT,
			// width: width,
			isLoading: false
		};
	}
	_keyExtractor = (item) => item.id.toString();

	componentDidMount() {}

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
		const { itinerary } = this.props;
		let images = [ itinerary.coverPhoto ];

		for (let day = 0; day < itinerary.days.length; day++) {
			for (let activity = 0; activity < itinerary.days[day].activities.length; activity++) {
				images.push(...itinerary.days[day].activities[activity].photos);
			}
		}

		navigation.navigate('ViewImages', {
			images: images
		});
	};

	renderDayTimeline() {
		const { itinerary } = this.props;
		const { days } = itinerary;

		return (
			<View>
				{days.map((day, index) => {
					return (
						<View key={index}>
							<View style={styles.dayContainer}>
								<LinearGradient
									start={{ x: 0.25, y: 0.25 }}
									end={{ x: 0.75, y: 1.0 }}
									colors={[ Color.top, Color.primaryLight ]}
									style={styles.dayGradientContainer}
								>
									<Text style={[ styles.dayTextStyle, { paddingBottom: 0 } ]}>{day.date}</Text>
									<Text style={[ styles.dayTextStyle, { paddingTop: 0, marginTop: 2 } ]}>
										{Languages.Day} {day.identifier}
									</Text>
								</LinearGradient>
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
		const { itinerary } = this.props;

		return (
			<View style={styles.imageWrapper}>
				<Image
					source={{
						uri: itinerary.coverPhoto,
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
			<View style={styles.navButtonWrapper}>
				<View style={[ styles.backButton, { top: backTop } ]}>{CircleBack(navigation, Color.primary)}</View>
				<View style={[ styles.imageButton, { top: backTop } ]}>
					{ViewImages(navigation, Color.primary, this.onGoToViewImages)}
				</View>
			</View>
		);
	};

	renderLoading() {
		const { isLoading } = this.state;

		if (!isLoading) return;

		return <Spinner mode={Mode.overlay} size={Sizes.LARGE} color={Color.lightTextPrimary} />;
	}

	render() {
		const { itinerary } = this.props;

		const backgroundColorInterpolate = this.state.scrollY.interpolate({
			inputRange: [ 0, 180, 181 ],
			outputRange: [ Color.white90T, Color.white10T, Color.transparent ]
		});

		const shadowOpacityInterpolate = this.state.scrollY.interpolate({
			inputRange: [ 0, 180, 181 ],
			outputRange: [ 0.5, 0.3, 0 ]
		});

		return (
			<View style={{ flex: 1 }}>
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
							/>
						</Animated.View>
						<View style={styles.timelineContainer}>{this.renderDayTimeline()}</View>
					</View>
				</ParallaxScrollView>
			</View>
		);
	}
}
export default ItineraryDetails;
