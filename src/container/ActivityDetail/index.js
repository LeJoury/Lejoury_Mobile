import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	Dimensions,
	Animated,
	ActivityIndicator,
	TouchableOpacity,
	Platform,
	Modal,
	Linking
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Carousel, { ParallaxImage, Pagination } from 'react-native-snap-carousel';
import StarRating from 'react-native-star-rating';
import { Icon } from 'react-native-elements';
import ReadMore from 'react-native-read-more-text';

import { connect } from 'react-redux';
import { addBookmark, removeBookmark } from '@actions';

import { CircleBack, AddBookmark, RemoveBookmark } from '../../navigation/IconNav';

import { Constants, Styles, Languages, Color, Device, formatImages, getCountryCurrency } from '@common';

const { Sizes } = Constants.Spinner;

import styles from './styles';

const IMAGE_HEIGHT = Device.isIphoneX ? 320 : 300;

const { width, height } = Dimensions.get('window');
const backTop = Device.isIphoneX ? 35 : 20;
const { Bucket_Type } = Constants.Bucket_Type;

const ActivityDetail = (props) => {
	//location details
	const [ locationName, setLocationName ] = useState('');
	const [ locationLat, setLocationLat ] = useState(0);
	const [ locationLng, setLocationLng ] = useState(0);
	const [ locationCountry, setLocationCountry ] = useState();
	const [ locationUrl, setLocationUrl ] = useState();
	const [ locationState, setLocationState ] = useState();
	const [ locationPostcode, setLocationPostcode ] = useState();
	const [ locationTypes, setLocationTypes ] = useState();

	//activity details
	const [ title, setTitle ] = useState('');
	const [ photos, setPhotos ] = useState([]);
	const [ currency, setCurrency ] = useState('');
	const [ budget, setBudget ] = useState('');
	const [ description, setDescription ] = useState('');
	const [ rate, setRate ] = useState(0);
	const [ selectedIndex, setSelectedIndex ] = useState(0);
	const [ isBookmark, setBookmark ] = useState(false);

	//map
	const [ region, setRegion ] = useState();

	//preview image
	const [ previewModalVisible, setPreviewModalVisible ] = useState(false);

	//scroll animation
	const [ scrollY ] = useState(new Animated.Value(0));

	useEffect(() => {
		const { navigation } = props;
		const { selectedActivity } = navigation.state.params;

		// props.onRef(this);
		setTitle(selectedActivity.title);

		setLocationName(selectedActivity.location.name);
		setLocationLat(selectedActivity.location.lat);
		setLocationLng(selectedActivity.location.lng);
		setLocationCountry(selectedActivity.location.country);
		setLocationUrl(selectedActivity.location.url);
		setLocationState(selectedActivity.location.state);
		setLocationPostcode(selectedActivity.location.postcode);
		setLocationTypes(selectedActivity.location.types);

		setPhotos(selectedActivity.photos);
		setCurrency(selectedActivity.currency);
		setBudget(selectedActivity.budget);
		setDescription(selectedActivity.description);
		setRate(selectedActivity.rating);
		setBookmark(selectedActivity.bookmarked);

		return () => {};
	}, []);

	onBackHandle = () => {
		const { navigation } = props;
		navigation.goBack(null);
	};

	const onRegionChange = (region) => {
		setRegion(region);
	};

	const openGps = () => {
		Linking.openURL(locationUrl);
	};

	const onMapReady = () => {
		if (Platform.OS === 'ios') {
			// Create the object to update this.state.mapRegion through the onRegionChange function
			const region = {
				latitude: locationLat,
				longitude: locationLng,
				latitudeDelta: 0.00922 * 1.5,
				longitudeDelta: 0.00421 * 1.5
			};
			onRegionChange(region);
		} else if (this.state.permissionEnabled) {
			// Create the object to update this.state.mapRegion through the onRegionChange function
			const region = {
				latitude: locationLat,
				longitude: locationLng,
				latitudeDelta: 0.00922 * 1.5,
				longitudeDelta: 0.00421 * 1.5
			};
			onRegionChange(region);
		}
	};

	const onActivityBookmarkPress = async () => {
		const { token } = props.user;
		const { selectedActivity, updateBookmark } = props.navigation.state.params;

		try {
			if (!selectedActivity.bookmarked) {
				let response = await props.addBookmark(token, selectedActivity.id, Bucket_Type.ACTIVITY);

				if (response.OK) {
					setBookmark(true);
					updateBookmark(true, selectedActivity.id);
				}
			} else {
				let response = await props.removeBookmark(token, selectedActivity.id, Bucket_Type.ACTIVITY);

				if (response.OK) {
					setBookmark(false);
					updateBookmark(false, selectedActivity.id);
				}
			}
		} catch (error) {}
	};

	const renderImage = ({ item, index }, parallaxProps) => {
		return (
			<TouchableOpacity
				style={styles.item}
				onPress={() => {
					setPreviewModalVisible(true);
				}}
			>
				<ParallaxImage
					source={{ uri: item.link }}
					containerStyle={styles.imageContainer}
					style={styles.image}
					parallaxFactor={0.2}
					{...parallaxProps}
				/>
			</TouchableOpacity>
		);
	};

	const renderPagination = () => {
		return (
			<Pagination
				dotsLength={photos.length}
				activeDotIndex={selectedIndex}
				containerStyle={styles.paginationWrapper}
				dotStyle={styles.dotStyle}
				inactiveDotScale={0.6}
				inactiveDotColor={Color.white60T}
			/>
		);
	};

	const renderSliderBox = () => {
		return (
			<Animated.View style={{ transform: [ { scale: imageScale } ] }}>
				<Carousel
					data={photos}
					sliderWidth={width}
					sliderHeight={IMAGE_HEIGHT}
					itemWidth={width}
					renderItem={renderImage}
					hasParallaxImages={true}
					onSnapToItem={(index) => setSelectedIndex(index)}
				/>
				{renderPagination()}
			</Animated.View>
		);
	};

	const renderPreviewModal = () => {
		return (
			<Modal
				visible={previewModalVisible}
				transparent={true}
				onRequestClose={() => setPreviewModalVisible(false)}
			>
				<ImageViewer
					imageUrls={formatImages(photos)}
					onSwipeDown={() => setPreviewModalVisible(false)}
					enableSwipeDown={true}
					enablePreload={true}
					index={selectedIndex}
					loadingRender={() => (
						<ActivityIndicator color={Color.white} size={Sizes.LARGE} style={styles.loadingStyle} />
					)}
				/>
			</Modal>
		);
	};

	const renderNavButton = () => {
		const { navigation } = props;

		return (
			<View style={styles.navButtonWrapper}>
				<View style={[ styles.backButton, { top: backTop } ]}>{CircleBack(navigation, Color.white)}</View>
				<View style={[ styles.bucketButton, { top: backTop } ]}>
					{isBookmark ? (
						RemoveBookmark(navigation, Color.white, onActivityBookmarkPress)
					) : (
						AddBookmark(navigation, Color.white, onActivityBookmarkPress)
					)}
				</View>
			</View>
		);
	};

	const renderCurrency = () => {
		let tmpCurrency = getCountryCurrency(currency);

		if (tmpCurrency) {
			return (
				<Text style={styles.budgetTextStyle}>
					{tmpCurrency.symbol} {budget.toFixed(2)}
				</Text>
			);
		}
	};

	const renderTruncatedFooter = (handlePress) => {
		return (
			<Text style={styles.descriptionMoreLess} onPress={handlePress}>
				{Languages.ReadMore}
			</Text>
		);
	};

	const renderRevealedFooter = (handlePress) => {
		return (
			<Text style={styles.descriptionMoreLess} onPress={handlePress}>
				{Languages.ReadLess}
			</Text>
		);
	};

	const renderContent = () => {
		return (
			<View style={styles.subContain}>
				<View style={styles.contentWrapper}>
					<Text multiline={true} numberOfLines={2} ellipsizeMode={'tail'} style={styles.titleTextStyle}>
						{title}
					</Text>

					<View style={styles.budgetRateContainer}>
						<View style={styles.budgetContainer}>
							<Icon
								name="wallet"
								type={'simple-line-icon'}
								size={Styles.IconSize.Small}
								color={Color.darkGrey2}
							/>
							{renderCurrency()}
						</View>
						<View>
							<StarRating
								maxStars={5}
								rating={rate}
								starSize={16}
								starStyle={styles.ratingStar}
								fullStarColor={Color.starYellow}
								disabled
							/>
						</View>
					</View>

					<View style={styles.separator} />

					<View style={styles.descriptionContainer}>
						<View style={Styles.Common.ColumnCenter}>
							<Text style={styles.descriptionLabelStyle}>{Languages.IStory}</Text>
						</View>
						<ReadMore
							numberOfLines={8}
							renderTruncatedFooter={renderTruncatedFooter}
							renderRevealedFooter={renderRevealedFooter}
						>
							<Text multiline={true} style={styles.descriptionTextStyle}>
								{description}
							</Text>
						</ReadMore>
					</View>

					<View style={styles.separator} />
				</View>

				<View style={Styles.Common.ColumnCenter}>
					<Text multiline={true} style={styles.locationNameTextStyle}>
						{locationName}
					</Text>
					<View style={styles.locationMapContainer}>
						<TouchableOpacity style={styles.mapStyle} onPress={() => openGps()}>
							<MapView
								provider={PROVIDER_GOOGLE}
								onMapReady={onMapReady}
								style={{ aspectRatio: 1 }}
								initialRegion={region}
								showsUserLocation={false}
								followUserLocation={false}
								zoomEnabled={false}
								scrollEnabled={false}
								onPress={() => openGps()}
							>
								<Marker
									coordinate={{ latitude: locationLat, longitude: locationLng }}
									title={locationName}
								/>
							</MapView>
						</TouchableOpacity>

						<View style={styles.locationContainer}>
							<Text multiline={true} style={styles.locationTextStyle}>
								{locationPostcode}, {locationState},
							</Text>
							<Text multiline={true} style={styles.locationTextStyle}>
								{locationCountry}
							</Text>
							<TouchableOpacity onPress={() => openGps()}>
								<Text style={styles.directionTextStyle}>{Languages.Directions}</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</View>
		);
	};

	const imageScale = scrollY.interpolate({
		inputRange: [ -300, 0 ],
		outputRange: [ 2, 1 ],
		extrapolate: 'clamp'
	});

	return (
		<Animated.ScrollView
			style={styles.scrollViewContainer}
			scrollEventThrottle={1}
			onScroll={Animated.event(
				[
					{
						nativeEvent: { contentOffset: { y: scrollY } }
					}
				],
				{},
				{
					useNativeDriver: true // <- Native Driver used for animated events
				}
			)}
		>
			{renderSliderBox()}
			{renderNavButton()}
			{renderContent()}
			{renderPreviewModal()}
		</Animated.ScrollView>
	);
};

const mapStateToProps = ({ user }) => ({
	user
});

export default connect(mapStateToProps, { addBookmark, removeBookmark })(ActivityDetail);
