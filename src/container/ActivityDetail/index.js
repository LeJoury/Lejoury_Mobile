import React, { useState, useEffect } from 'react';
import {
	View,
	Animated,
	ImageBackground,
	Text,
	Dimensions,
	ScrollView,
	ActivityIndicator,
	TouchableOpacity,
	Platform,
	Modal,
	Image
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Swiper from 'react-native-swiper';
import StarRating from 'react-native-star-rating';

import { CircleBack, AddBookmark } from '../../navigation/IconNav';

import { Constants, Styles, Languages, Color, Device, formatImages } from '@common';

const { Sizes } = Constants.Spinner;

import styles from './styles';

const { width, height } = Dimensions.get('window');
const backTop = Device.isIphoneX ? 35 : 20;

const ActivityDetail = (props) => {
	//location details
	const [ locationName, setLocationName ] = useState('');
	const [ locationLat, setLocationLat ] = useState(0);
	const [ locationLng, setLocationLng ] = useState(0);
	const [ locationCountry, setLocationCountry ] = useState();

	//activity details
	const [ title, setTitle ] = useState('');
	const [ photos, setPhotos ] = useState([]);
	const [ currency, setCurrency ] = useState('');
	const [ budget, setBudget ] = useState('');
	const [ description, setDescription ] = useState('');
	const [ rate, setRate ] = useState(0);
	const [ selectedIndex, setSelectedIndex ] = useState(0);

	//map
	const [ region, setRegion ] = useState();

	//preview image
	const [ previewModalVisible, setPreviewModalVisible ] = useState(false);

	useEffect(() => {
		const { navigation } = props;
		const { selectedActivity } = navigation.state.params;

		// props.onRef(this);
		setTitle(selectedActivity.title);

		setLocationName(selectedActivity.location.name);
		setLocationLat(selectedActivity.location.lat);
		setLocationLng(selectedActivity.location.lng);
		setLocationCountry(selectedActivity.location.country);

		setPhotos(selectedActivity.photos);
		setCurrency(selectedActivity.currency);
		setBudget(selectedActivity.budget);
		setDescription(selectedActivity.description);
		setRate(selectedActivity.rate);

		return () => {};
	}, []);

	onBackHandle = () => {
		const { navigation } = props;
		navigation.goBack(null);
	};

	const onRegionChange = (region) => {
		setRegion(region);
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

	const renderSliderBox = () => {
		return (
			<Swiper
				style={styles.imageWrapper}
				showsButtons={false}
				loop={false}
				activeDotColor={Color.white}
				loadMinimalLoader={<ActivityIndicator />}
				loadMinimal={true}
			>
				{photos.map((photo, index) => {
					return (
						<TouchableOpacity
							key={index}
							// onPress={() => {
							// 	setPreviewModalVisible(true);
							// 	setSelectedIndex(index);
							// }}
						>
							<ImageBackground
								source={{ uri: photo.link }}
								style={styles.image}
								resizeMode="cover"
								blurRadius={100}
							>
								<Image
									source={{
										uri: photo.link
										// cache: 'only-if-cached'
									}}
									style={styles.image}
									resizeMode="contain"
								/>
							</ImageBackground>
						</TouchableOpacity>
					);
				})}
			</Swiper>
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
				<View style={[ styles.bucketButton, { top: backTop } ]}>{AddBookmark(navigation, Color.white)}</View>
			</View>
		);
	};

	return (
		<ScrollView style={styles.scrollViewContainer} contentContainerStyle={{ flexGrow: 1 }}>
			{renderSliderBox()}
			{renderNavButton()}
			{renderPreviewModal()}
			<View style={styles.subContain}>
				<View style={[ styles.contentWrapper, { marginTop: 18 } ]}>
					<Text
						multiline={true}
						numberOfLines={2}
						ellipsizeMode={'tail'}
						style={[ styles.contentTextStyle, styles.title ]}
					>
						{title}
					</Text>
				</View>
				<View style={[ styles.contentWrapper, { marginTop: 18 } ]}>
					<Text multiline={true} style={[ styles.contentTextStyle, styles.description ]}>
						{description}
					</Text>
				</View>

				{/* <View style={styles.contentWrapper}>
					<MapView
						provider={PROVIDER_GOOGLE} // remove if not using Google Maps
						onMapReady={onMapReady}
						style={styles.mapStyle}
						initialRegion={region}
						showsUserLocation={false}
						followUserLocation={false}
						zoomEnabled={true}
						scrollEnabled={false}
					>
						<Marker coordinate={{ latitude: locationLat, longitude: locationLng }} title={locationName} />
					</MapView>
				</View> */}

				<View style={styles.contentWrapper}>
					<Text style={styles.labelStyle}>{Languages.Budget}</Text>
					<Text style={[ styles.contentTextStyle, styles.budget ]}>
						{currency} {budget}
					</Text>
				</View>

				<View style={[ styles.contentWrapper, Styles.Common.RowCenterBetween ]}>
					<Text style={styles.labelStyle}>{Languages.Reviews}</Text>
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
		</ScrollView>
	);
};

export default ActivityDetail;
