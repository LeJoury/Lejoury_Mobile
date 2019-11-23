import React, { useState, useEffect } from 'react';
import {
	Dimensions,
	ScrollView,
	View,
	Text,
	TouchableOpacity,
	FlatList,
	TextInput,
	Alert,
	Animated,
	TouchableWithoutFeedback
} from 'react-native';
import { Icon } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import StarRating from 'react-native-star-rating';
import ImageResizer from 'react-native-image-resizer';
import Bugsnag from '@services';

import { connect } from 'react-redux';
import { deleteActivityPhoto } from '@actions';

import { QUERY_PLACES, GET_PLACE_DETAILS } from '../../services/GooglePlaceService';
import { Languages, Color, Styles, showOkAlert } from '@common';
import { ImageHolder, Button, CurrencyPicker } from '@components';

import styles from './styles';

const numColumns = 3;
const DEFAULT_RATE = 4;
const { width, height } = Dimensions.get('window');
const TAG = 'EditActivityDetail';

// const GOOGLE_API_KEY = config.GOOGLE_PLACE_API_KEY;

const EditActivityDetail = (props) => {
	const [ isDirty, setIsDirty ] = useState(false);

	const [ title, setTitle ] = useState('');
	const [ isTitleFocus, setTitleFocus ] = useState(false);

	const [ location, setLocation ] = useState({
		name: '',
		types: [],
		url: '',
		alpha2: '',
		fullAddress: '',
		longitude: 0.0,
		latitude: 0.0,
		state: '',
		postcode: '',
		country: ''
	});

	const [ isLocationFocus, setLocationFocus ] = useState(false);
	const [ locationBoxWidth ] = useState(new Animated.Value(width - 36));
	const [ searchLocationView ] = useState(new Animated.Value(0));
	const [ showCancel, setShowCancel ] = useState(false);

	const [ photos, setPhotos ] = useState([ 'empty' ]);

	const [ currency, setCurrency ] = useState('USD');
	const [ budget, setBudget ] = useState('');
	const [ isBudgetFocus, setBudgetFocus ] = useState(false);

	const [ description, setDescription ] = useState('');
	const [ isDescriptionFocus, setDescriptionFocus ] = useState(false);

	const [ rate, setRate ] = useState(DEFAULT_RATE);

	const [ locationResults, setLocationResults ] = useState([]);

	const [ itineraryId, setItineraryId ] = useState();
	const [ activityId, setActivityId ] = useState();

	const [ isLoading, setIsLoading ] = useState(false);

	useEffect(() => {
		const { navigation } = props;
		const { type } = navigation.state.params;

		props.onRef(this);
		this.timer = null;

		if (type === 'edit') {
			const { itineraryId, activityId } = navigation.state.params;
			const { selectedActivity } = navigation.state.params;

			let currentPhotos =
				selectedActivity.photos.length < 6 ? selectedActivity.photos.concat('empty') : selectedActivity.photos;

			setTitle(selectedActivity.title);
			setLocation(selectedActivity.location);
			setPhotos(currentPhotos);
			setBudget(selectedActivity.budget);
			setCurrency(selectedActivity.currency);
			setDescription(selectedActivity.description);
			setRate(selectedActivity.rating);
			setItineraryId(itineraryId);
			setActivityId(activityId);
		}

		return () => {
			props.onRef(undefined);
			ImagePicker.clean();
		};
	}, []);

	const keyExtractor = (_, index) => index.toString();

	const showMax6ImagesAlert = () => {
		Alert.alert(Languages.Sorry, Languages.SorryMax6Images, [ { text: Languages.OK } ]);
	};

	//parent called
	showDiscardAlert = () => {
		const { navigation } = props;

		if (isDirty) {
			Alert.alert(Languages.UnsavedTitle, Languages.UnsavedDescription, [
				{
					text: Languages.SaveAsDraft,
					onPress: onSaveActivity
				},
				{
					text: Languages.Discard,
					onPress: () => {
						navigation.goBack(null);
					},
					style: 'destructive'
				}
			]);
		} else {
			navigation.goBack(null);
		}
	};

	const onPressUploadImages = () => {
		let newPhotos = photos;

		if (newPhotos.length < 7) {
			ImagePicker.openPicker({
				multiple: true,
				maxFiles: 6
			}).then((images) => {
				images.forEach((image) => {
					ImageResizer.createResizedImage(image.path, 600, 400, 'JPEG', 90)
						.then((response) => {
							let newImage = {
								uri: response.uri,
								path: response.path,
								filename: response.name,
								mime: image.mime
							};

							if (newPhotos.length < 7) {
								newPhotos = Array.from(new Set([ newImage ].concat(newPhotos)));
							} else {
								showMax6ImagesAlert();
							}
							setIsDirty(true);
							setPhotos(newPhotos);
						})
						.catch((error) => {
							Bugsnag.leaveBreadcrumb(TAG, `RESIZE IMAGE - ${error}`);
							Bugsnag.notify(new Error(error));
						});
				});
			});
		} else {
			showMax6ImagesAlert();
		}
	};

	const onRemoveImage = async (removedPhoto) => {
		if (photos.length === 2) {
			showOkAlert(Languages.NoPhotos, Languages.Min1Image);
		} else {
			if (removedPhoto.id) {
				try {
					let response = await props.deleteActivityPhoto(
						removedPhoto.id,
						activityId,
						itineraryId,
						props.user.token
					);

					if (response.OK) {
						let currentPhotos = photos.filter((photo) => {
							return photo.id !== removedPhoto.id;
						});

						currentPhotos =
							currentPhotos.length < 6
								? Array.from(new Set(currentPhotos.concat('empty')))
								: currentPhotos;

						setPhotos(currentPhotos);
					}
				} catch (error) {
					console.log(error);
				}
			} else {
				let currentPhotos = photos.filter((photo) => {
					return photo !== removedPhoto;
				});

				currentPhotos =
					currentPhotos.length < 6 ? Array.from(new Set(currentPhotos.concat('empty'))) : currentPhotos;

				setPhotos(currentPhotos);
			}
		}
	};

	const onSaveActivity = () => {
		if (photos.length === 1) {
			showOkAlert(Languages.NoPhotos, Languages.Min1Image);
			return;
		}

		const { navigation } = props;
		const { type, index } = navigation.state.params;

		let activityPhotos = photos.filter((image) => image !== 'empty');

		navigation.state.params.onSaved(
			title,
			location,
			activityPhotos,
			description,
			currency,
			budget,
			rate,
			type,
			index
		);
		navigation.goBack(null);
	};

	const imageHolder = ({ item }) => {
		if (item === 'empty') {
			return (
				<View style={styles.imageHolder}>
					<TouchableOpacity onPress={onPressUploadImages} style={styles.emptyThumbnail}>
						<Icon name="plus" type="feather" size={Styles.IconSize.CenterTab} color={Color.lightGrey3} />
					</TouchableOpacity>
				</View>
			);
		}

		return (
			<ImageHolder
				containerStyle={styles.imageHolder}
				imageStyle={styles.imageThumbnail}
				imageUri={item.link ? item.link : item.path}
				onRemovePress={() => onRemoveImage(item)}
			/>
		);
	};

	const imagesList = () => {
		let images = photos.length === 7 ? photos.filter((image) => image !== 'empty') : photos;

		return (
			<FlatList
				data={images}
				showsHorizontalScrollIndicator={false}
				keyExtractor={keyExtractor}
				numColumns={numColumns}
				renderItem={imageHolder}
				contentContainerStyle={{ marginTop: 8 }}
			/>
		);
	};

	const onSearchLocationFocus = () => {
		Animated.timing(locationBoxWidth, {
			toValue: width - 100,
			duration: 300
		}).start(({ finished }) => {
			if (finished) {
				setLocationFocus(true);
				setShowCancel(true);

				Animated.timing(searchLocationView, {
					toValue: 1,
					duration: 300,
					useNativeDriver: true
				}).start();
			}
		});
	};

	const onSearchLocationBlur = () => {
		Animated.timing(searchLocationView, {
			toValue: 0,
			duration: 300,
			useNativeDriver: true
		}).start(() => {
			Animated.timing(locationBoxWidth, {
				toValue: width - 36,
				duration: 300
			}).start(({ finished }) => {
				if (finished) {
					setLocationFocus(false);
					setShowCancel(false);
				}
			});
		});
	};

	const onSearchTextChanged = (value) => {
		setLocation({ ...location, name: value });
		setIsDirty(true);
		clearTimeout(this.timer);

		this.timer = setTimeout(() => {
			if (value.length >= 3) {
				QUERY_PLACES(value).then((results) => setLocationResults(results)).catch((error) => {
					//TODO: recall search bugsnag this issue
					console.log(error);
				});
			}
		}, 3000);
	};

	const onLocationPress = (place_id) => {
		// const { name, types, address_components, url, geometry, formatted_address } = result.result;
		// const { lng, lat } = geometry.location;
		// let countryComponent = address_components.filter((component) => {
		// 	return component.types.includes('country');
		// });

		// let stateComponent = address_components.filter((component) => {
		// 	return component.types.includes('administrative_area_level_1');
		// });

		// let postcodeComponent = address_components.filter((component) => {
		// 	return component.types.includes('postal_code');
		// });

		// let alpha2 = countryComponent[0].short_name;
		// let country = countryComponent[0].long_name;
		// let state = stateComponent[0].long_name;
		// let postcode = postcodeComponent[0].long_name;

		// let fullAddress = formatted_address.replace([ 'Unnamed Road, ' ], '').replace([ 'Unnamed Road ' ], '');

		// setLocation({
		// 	...location,
		// 	alpha2,
		// 	name,
		// 	fullAddress,
		// 	types,
		// 	url,
		// 	longitude: lng,
		// 	latitude: lat,
		// 	country,
		// 	state,
		// 	postcode
		// });
		// onSearchLocationBlur();

		setIsLoading(true);
		// Production
		GET_PLACE_DETAILS(place_id)
			.then((result) => {
				// console.log(result);
				const { name, types, address_components, url, geometry, formatted_address } = result;
				const { lng, lat } = geometry.location;
				let countryComponent = address_components.filter((component) => {
					return component.types.includes('country');
				});

				let stateComponent = address_components.filter((component) => {
					if (component.types.includes('administrative_area_level_1')) {
						return component.types.includes('administrative_area_level_1');
					} else {
						return component.types.includes('locality');
					}
				});

				let postcodeComponent = address_components.filter((component) => {
					return component.types.includes('postal_code');
				});

				let fullAddress = formatted_address.replace([ 'Unnamed Road, ' ], '').replace([ 'Unnamed Road ' ], '');
				let country = countryComponent[0].long_name;
				let alpha2 = countryComponent[0].short_name;
				let state = stateComponent[0].long_name;
				let postcode = postcodeComponent.length === 0 ? '' : postcodeComponent[0].long_name;
				setLocation({
					...location,
					alpha2,
					name,
					fullAddress,
					types,
					url,
					longitude: lng,
					latitude: lat,
					country,
					state,
					postcode
				});

				setIsLoading(false);
				onSearchLocationBlur();
			})
			.catch((error) => {
				setIsLoading(false);
				console.log(error);
			});
	};

	const renderLocation = ({ item }) => {
		const { structured_formatting, place_id, description } = item;
		const { main_text, secondary_text } = structured_formatting;

		return (
			<TouchableWithoutFeedback onPress={() => onLocationPress(place_id)}>
				<View style={styles.resultRow}>
					<View style={styles.resultIconContainer}>
						<Icon color={Color.splashScreenBg6} type="feather" size={16} name="map-pin" />
					</View>
					<View style={styles.resultKeywordContainer}>
						<Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.resultKeywordMainTextStyle}>
							{main_text}
						</Text>
						<Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.resultKeywordSecondaryTextStyle}>
							{description}
						</Text>
					</View>
				</View>
			</TouchableWithoutFeedback>
		);
	};
	const renderSearchLocation = () => {
		return (
			<View style={styles.flatListContainer}>
				<FlatList
					style={styles.flatListStyle}
					// data={data.predictions}
					data={locationResults} // production
					keyExtractor={keyExtractor}
					renderItem={renderLocation}
				/>
			</View>
		);
	};

	const renderInputView = () => {
		return (
			<View>
				<View style={styles.inputWrapper}>
					<Text style={styles.titleStyle}>{Languages.Title}</Text>
					<TextInput
						underlineColorAndroid="transparent"
						selectionColor={Color.textSelectionColor}
						value={title}
						onFocus={() => setTitleFocus(true)}
						onBlur={() => setTitleFocus(false)}
						style={[
							styles.inputStyle,
							{
								borderBottomColor: isTitleFocus ? Color.primary : Color.lightGrey1
							}
						]}
						onChangeText={(text) => {
							setTitle(text);
							setIsDirty(true);
						}}
					/>
				</View>

				<View style={styles.inputWrapper}>
					<Text style={styles.titleStyle}>{Languages.Photos}</Text>
					<View style={styles.photoContainer}>{imagesList()}</View>
				</View>

				<View style={[ styles.inputWrapper, { backgroundColor: Color.lighGrey6 } ]}>
					<Text style={styles.titleStyle}>{Languages.Budget}</Text>
					<View style={[ styles.rowWrapper, { marginTop: 6 } ]}>
						<CurrencyPicker currency={currency} setCurrency={(value) => setCurrency(value)} />
						<TextInput
							underlineColorAndroid="transparent"
							selectionColor={Color.textSelectionColor}
							value={budget && String(budget)}
							keyboardType={'numeric'}
							onFocus={() => setBudgetFocus(true)}
							onBlur={() => setBudgetFocus(false)}
							style={[
								styles.budgetStyle,
								{
									borderBottomColor: isBudgetFocus ? Color.primary : Color.lightGrey1
								}
							]}
							onChangeText={(text) => {
								setBudget(text);
								setIsDirty(true);
							}}
						/>
					</View>
				</View>

				<View style={styles.inputWrapper}>
					<Text style={styles.titleStyle}>{Languages.IStory}</Text>
					<TextInput
						multiline={true}
						numberOfLines={4}
						value={description}
						selectionColor={Color.textSelectionColor}
						style={[
							styles.inputStyle,
							styles.description,
							{
								borderColor: isDescriptionFocus ? Color.primary : Color.lightGrey1
							}
						]}
						onFocus={() => setDescriptionFocus(true)}
						onBlur={() => setDescriptionFocus(false)}
						onChangeText={(text) => {
							setDescription(text);
							setIsDirty(true);
						}}
					/>
				</View>

				<View style={[ styles.inputWrapper, Styles.Common.RowCenterBetween ]}>
					<Text style={styles.titleStyle}>{Languages.Reviews}</Text>
					<StarRating
						maxStars={5}
						rating={rate}
						starSize={20}
						containerStyle={styles.ratingContainer}
						starStyle={styles.ratingStar}
						fullStarColor={Color.starYellow}
						selectedStar={(rating) => setRate(rating)}
					/>
				</View>
			</View>
		);
	};

	const renderSaveButton = () => {
		return (
			<View style={styles.buttonWrapper}>
				<Button
					text={Languages.Confirm}
					textStyle={styles.doneTextStyle}
					containerStyle={styles.confirmButton}
					onPress={onSaveActivity}
				/>
			</View>
		);
	};

	const searchViewStyle = {
		opacity: searchLocationView.interpolate({
			inputRange: [ 0, 1 ],
			outputRange: [ 0, 1 ]
		}),
		transform: [
			{
				translateY: searchLocationView.interpolate({
					inputRange: [ 0, 1 ],
					outputRange: [ height, 0 ]
				})
			}
		]
	};

	return (
		<KeyboardAwareScrollView style={styles.scrollViewContainer} enableOnAndroid={true} behavior="padding" enabled>
			<ScrollView
				style={styles.scrollViewContainer}
				contentContainerStyle={styles.scrollViewContentContainer}
				backgroundColor={Color.white}
			>
				<View style={styles.subContain}>
					<View style={[ styles.inputWrapper, { marginTop: 0 } ]}>
						<Text style={styles.titleStyle}>{Languages.WhereYouBeen}</Text>
						<View style={Styles.Common.RowCenterBetween}>
							<Animated.View style={[ styles.inputStyle, { width: locationBoxWidth } ]}>
								<TextInput
									underlineColorAndroid="transparent"
									selectionColor={Color.textSelectionColor}
									value={location.name}
									onFocus={() => onSearchLocationFocus()}
									style={[
										styles.inputTextStyle,
										{
											borderBottomColor: isLocationFocus ? Color.primary : Color.lightGrey1
										}
									]}
									onChangeText={(text) => onSearchTextChanged(text)}
								/>
							</Animated.View>

							<Animated.View>
								<TouchableOpacity onPress={() => onSearchLocationBlur()}>
									{showCancel && <Text style={styles.cancelSearchBarText}>Cancel</Text>}
								</TouchableOpacity>
							</Animated.View>
						</View>
					</View>

					{!showCancel && <View style={styles.inputView}>{renderInputView()}</View>}
				</View>
			</ScrollView>
			{showCancel && <Animated.View style={searchViewStyle}>{renderSearchLocation()}</Animated.View>}
			{!showCancel && renderSaveButton()}
		</KeyboardAwareScrollView>
	);
};

const mapStateToProps = ({ user }) => ({
	user
});

export default connect(mapStateToProps, {
	deleteActivityPhoto
})(EditActivityDetail);
