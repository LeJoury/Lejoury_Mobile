import React, { useState, useEffect } from 'react';
import {
	KeyboardAvoidingView,
	ScrollView,
	View,
	Text,
	TouchableOpacity,
	FlatList,
	TextInput,
	Alert,
	Animated
} from 'react-native';
import { Icon } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import RNPickerSelect from 'react-native-picker-select';
import LinearGradient from 'react-native-linear-gradient';
import StarRating from 'react-native-star-rating';

import { Languages, Color, Styles, Device } from '@common';
import { ImageHolder } from '@components';

import styles from './styles';

const numColumns = 3;
const defaultRate = 4;

const AddActivityDetail = (props) => {
	const [ isDirty, setIsDirty ] = useState(false);

	const [ title, setTitle ] = useState('');
	const [ isTitleFocus, setTitleFocus ] = useState(false);

	const [ locationName, setLocationName ] = useState();
	const [ isLocationNameFocus, setLocationNameFocus ] = useState(false);

	const [ photos, setPhotos ] = useState([ 'empty' ]);

	const [ currency, setCurrency ] = useState('USD');
	const [ budget, setBudget ] = useState('');
	const [ isBudgetFocus, setBudgetFocus ] = useState(false);

	const [ description, setDescription ] = useState('');
	const [ isDescriptionFocus, setDescriptionFocus ] = useState(false);

	const [ rate, setRate ] = useState(defaultRate);

	useEffect(() => {
		const { navigation } = props;
		const { type } = navigation.state.params;

		props.onRef(this);
		if (type === 'edit') {
			const {
				title,
				location,
				photos,
				description,
				currency,
				budget,
				rate
			} = navigation.state.params.selectedActivity;

			let currentPhotos = photos.length < 6 ? photos.concat('empty') : photos;

			setTitle(title);
			setLocation(location);
			setPhotos(currentPhotos);
			setBudget(budget);
			setCurrency(currency);
			setDescription(description);
			setRate(rate);
		}

		return () => {
			props.onRef(undefined);
			ImagePicker.clean()
				.then(() => {
					console.log('removed all tmp images from tmp directory');
				})
				.catch((e) => {
					alert(e);
				});
		};
	}, []);

	keyExtractor = (_, index) => index;

	showMax6ImagesAlert = () => {
		Alert.alert(Languages.Sorry, Languages.SorryMax6Images, [ { text: Languages.OK } ]);
	};

	showAlert = () => {
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

	onPressUploadImages = () => {
		let newPhotos = photos;

		if (newPhotos.length < 7) {
			ImagePicker.openPicker({
				multiple: true,
				includeBase64: true,
				maxFiles: 6
			}).then((images) => {
				images.forEach((image) => {
					if (newPhotos.length < 7) {
						newPhotos = Array.from(new Set([ image.sourceURL ].concat(newPhotos)));
					} else {
						showMax6ImagesAlert();
					}

					setIsDirty(true);
					setPhotos(newPhotos);
				});
			});
		} else {
			showMax6ImagesAlert();
		}
	};

	onRemoveImage = (removedPhoto) => {
		let currentPhotos = photos.filter((photo) => {
			return photo !== removedPhoto;
		});

		currentPhotos = currentPhotos.length < 6 ? Array.from(new Set(currentPhotos.concat('empty'))) : currentPhotos;

		setPhotos(currentPhotos);
	};

	onSaveActivity = () => {
		const { navigation } = props;
		const { type, index } = navigation.state.params;

		let newlocation = {
			name: 'Location Name',
			lat: 2.813602,
			lng: 101.733435,
			country: 'Malaysia'
		};

		let activityPhotos = photos.filter((image) => image !== 'empty');

		navigation.state.params.onSaved(
			title,
			newlocation,
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

	currencyPicker = () => {
		return (
			<RNPickerSelect
				onValueChange={(value) => setCurrency(value)}
				doneText={Languages.Done}
				value={currency}
				style={{
					viewContainer: styles.pickerContainer
				}}
				items={[
					{ label: 'USD', value: 'USD' },
					{ label: 'MYR', value: 'MYR' },
					{ label: 'SGD', value: 'SGD' }
				]}
			/>
		);
	};

	imageHolder = ({ item }) => {
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
				imageUri={item}
				onRemovePress={onRemoveImage}
			/>
		);
	};

	imagesList = () => {
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

	renderSaveButton = () => {
		return (
			<TouchableOpacity style={styles.buttonWrapper} onPress={onSaveActivity}>
				<LinearGradient
					style={styles.gradientWrapper}
					colors={[ Color.primary, Color.bottom ]}
					start={{ x: 0.0, y: 0.0 }}
					end={{ x: 0.5, y: 1.0 }}
				>
					<Text style={styles.doneTextStyle}>{Languages.Confirm.toUpperCase()}</Text>
				</LinearGradient>
			</TouchableOpacity>
		);
	};

	return (
		<KeyboardAvoidingView style={styles.scrollViewContainer} behavior="padding" enabled>
			<ScrollView
				style={styles.scrollViewContainer}
				contentContainerStyle={{
					flexGrow: 1,
					paddingBottom: 80
				}}
				backgroundColor={Color.white}
			>
				<View style={styles.subContain}>
					<View style={[ styles.inputWrapper, { marginTop: 0 } ]}>
						<Text style={styles.titleStyle}>{Languages.Title}</Text>
						<TextInput
							underlineColorAndroid="transparent"
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
						<Text style={styles.titleStyle}>{Languages.WhereYouBeen}</Text>
						<TextInput
							underlineColorAndroid="transparent"
							value={locationName}
							onFocus={() => setLocationNameFocus(true)}
							onBlur={() => setLocationNameFocus(false)}
							style={[
								styles.inputStyle,
								{
									borderBottomColor: isLocationNameFocus ? Color.primary : Color.lightGrey1
								}
							]}
							onChangeText={(text) => {
								setLocationName(text);
								setIsDirty(true);
							}}
						/>
					</View>

					<View style={styles.inputWrapper}>
						<Text style={styles.titleStyle}>{Languages.Photos}</Text>
						<View style={styles.photoContainer}>{imagesList()}</View>
					</View>

					<View style={styles.inputWrapper}>
						<Text style={styles.titleStyle}>{Languages.Budget}</Text>
						<View
							style={[
								styles.rowWrapper,
								{
									marginHorizontal: 10,
									marginTop: 12
								}
							]}
						>
							{currencyPicker()}
							<TextInput
								underlineColorAndroid="transparent"
								value={budget}
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
						<Text style={styles.titleStyle}>{Languages.Memories}</Text>
						<TextInput
							multiline={true}
							numberOfLines={4}
							value={description}
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
			</ScrollView>
			{renderSaveButton()}
		</KeyboardAvoidingView>
	);
};

export default AddActivityDetail;
