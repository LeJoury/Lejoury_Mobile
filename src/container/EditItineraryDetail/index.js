import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	TextInput,
	ScrollView,
	Alert,
	Easing,
	Animated,
	Dimensions,
	BackHandler,
	TouchableOpacity,
	Platform,
	TouchableNativeFeedback
} from 'react-native';
import { check, request, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';

import DatePicker from 'react-native-datepicker';
import ImagePicker from 'react-native-image-crop-picker';
import Carousel from 'react-native-snap-carousel';
import { Icon } from 'react-native-elements';
import ImageResizer from 'react-native-image-resizer';
import Bugsnag from '@services';
import moment from 'moment';

import { CircleBack } from '../../navigation/IconNav';

import { connect } from 'react-redux';
import {
	addItineraryToRedux,
	uploadCoverPhoto,
	updateItineraryByID,
	getItineraryById,
	deleteItineraryByID,
	unPublishItineraryByID,
	getDraftItineraries
} from '@actions';

import {
	Languages,
	Color,
	calculateDays,
	Images,
	Styles,
	create_UUID,
	Constants,
	showOkAlert,
	showOkCancelAlert
} from '@common';
import { UploadImageBox, Button, Spinner, DayHolder } from '@components';

import styles from './styles';

const Touchable = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;

const { width, height } = Dimensions.get('window');
const { Action } = Constants.Action;
const { Mode, Sizes } = Constants.Spinner;
const TAG = 'EditItineraryDetail';
const STATUS_PUBLISHED = 'PUBLISHED';

function wp(percentage) {
	const value = percentage * width / 100;
	return Math.round(value);
}

const slideWidth = wp(75);
const itemHorizontalMargin = wp(16);

export const sliderWidth = width;
export const itemWidth = slideWidth + itemHorizontalMargin;

const EditItineraryDetail = (props) => {
	const { navigation } = props;
	const { token, userId } = props.user;
	const { itineraryId } = navigation.state.params;

	const [ top ] = useState(new Animated.Value(20));
	const [ isTitleFocus, setIsTitleFocus ] = useState(false);
	const [ isQuoteFocus, setIsQuoteFocus ] = useState(false);

	const [ startDate, setStartDate ] = useState();
	const [ endDate, setEndDate ] = useState();
	const [ title, setTitle ] = useState();
	const [ quote, setQuote ] = useState();
	const [ coverPhoto, setCoverPhoto ] = useState();

	const [ selectedItinerary, setSelectedItinerary ] = useState(null);

	const [ isLoading, setIsLoading ] = useState(false);
	const [ isDirty, setIsDirty ] = useState(false);

	useEffect(
		() => {
			BackHandler.addEventListener('hardwareBackPress', handleBackButtonPressAndroid);

			const getItineraryDetail = async () => {
				setIsLoading(true);
				try {
					let response = await props.getItineraryById(token, itineraryId);

					setIsLoading(false);

					if (response.OK) {
						const { itinerary } = response;

						setSelectedItinerary(itinerary);

						setStartDate(moment(new Date(itinerary.startDate)).format('DD-MMM-YYYY'));
						setEndDate(moment(new Date(itinerary.endDate)).format('DD-MMM-YYYY'));
						setTitle(itinerary.title);
						setQuote(itinerary.quote);
						setCoverPhoto(itinerary.coverPhoto);
					}
				} catch (error) {
					setIsLoading(false);
					console.log(error);
				}
			};

			getItineraryDetail();

			return () => {
				ImagePicker.clean();
				BackHandler.removeEventListener('hardwareBackPress', handleBackButtonPressAndroid);
			};
		},
		[ itineraryId, props, token ]
	);

	const handleBackButtonPressAndroid = () => {
		if (isDirty) {
			Alert.alert(Languages.UnsavedTitle, Languages.UnsavedDescription, [
				{
					text: Languages.Update,
					onPress: () => {
						onUpdateHandle();
						onGoBack();
					}
				},
				{
					text: Languages.Discard,
					onPress: onGoBack,
					style: 'destructive'
				}
			]);
		} else {
			onGoBack();
		}
		return true;
	};

	const refreshItinerary = async () => {
		setIsLoading(true);
		try {
			let response = await props.getItineraryById(token, itineraryId);

			setIsLoading(false);

			if (response.OK) {
				const { itinerary } = response;

				setSelectedItinerary(itinerary);

				setStartDate(moment(new Date(itinerary.startDate)).format('DD-MMM-YYYY'));
				setEndDate(moment(new Date(itinerary.endDate)).format('DD-MMM-YYYY'));
				setTitle(itinerary.title);
				setQuote(itinerary.quote);
				setCoverPhoto(itinerary.coverPhoto);
			}
		} catch (error) {
			setIsLoading(false);
			console.log(error);
		}
	};

	const setBackButtonHide = (hide) => {
		Animated.timing(top, {
			duration: 50,
			toValue: hide ? -100 : 20,
			easing: Easing.linear
		}).start();
	};

	const onAddDayHandle = (day) => {
		if (selectedItinerary === null) return;

		let tmpDays = selectedItinerary.days || [];

		if (isDirty) {
			onUpdateHandle();
		}

		navigation.navigate('EditDayDetail', {
			day: day,
			itineraryId: itineraryId,
			days: tmpDays,
			type: Action.ADD,
			publishedDate: moment(new Date(startDate), 'DD-MMM-YYYY').add(day - 1, 'd').format('DD-MMM-YYYY'),
			refreshItinerary: refreshItinerary
		});
	};

	const onNavigateToEditDayDetail = (selectedDay) => {
		if (selectedItinerary === null) return;

		let tmpDays = selectedItinerary.days || [];
		if (isDirty) {
			onUpdateHandle();
		}

		navigation.navigate('EditDayDetail', {
			day: selectedDay,
			selectedDay: selectedItinerary.days.find((tmpDay) => tmpDay.day === selectedDay),
			itineraryId: itineraryId,
			days: tmpDays,
			type: Action.EDIT,
			refreshItinerary: refreshItinerary,
			publishedDate: moment(new Date(startDate), 'DD-MMM-YYYY').add(selectedDay - 1, 'd').format('DD-MMM-YYYY')
		});
	};

	const onUpdateHandle = () => {
		let newItinerary = {
			startDate: startDate,
			endDate: endDate,
			title: title,
			itineraryId: itineraryId,
			quote: quote
		};

		props.updateItineraryByID(itineraryId, newItinerary, token, userId).then((response) => {
			if (response.OK) {
				showOkAlert(Languages.UpdateSuccessTitle, Languages.UpdateSuccessMessage);
				setIsDirty(false);
			} else {
				showOkAlert(Languages.SomethingWentWrong, Languages.SystemError);
			}
		});
	};

	const onSetToDraft = async () => {
		try {
			let response = await props.unPublishItineraryByID(itineraryId, token);

			if (response.OK) {
				let draftResponse = await props.getDraftItineraries(token, userId);

				if (draftResponse.OK) {
					onGoBack();
				} else {
					showOkAlert(Languages.SomethingWentWrong, Languages.SystemError);
				}
			} else {
				showOkAlert(Languages.SomethingWentWrong, Languages.SystemError);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const onConfirmRemove = async () => {
		try {
			let deleteResponse = await props.deleteItineraryByID(itineraryId, token, STATUS_PUBLISHED);

			if (deleteResponse.OK) {
				showOkAlert(Languages.RemoveItinerarySuccessTitle, Languages.RemoveItinerarySuccessMessage);
				onGoBack();
			} else {
				showOkAlert(Languages.SomethingWentWrong, Languages.SystemError);
			}
		} catch (error) {
			showOkAlert(Languages.SomethingWentWrong, Languages.SystemError);
		}
	};

	const onConfirmRemovePopUp = () => {
		Alert.alert(Languages.RemoveConfirmationItineraryTitle, Languages.RemoveConfirmationItinerary, [
			{
				text: Languages.Confirm,
				onPress: () => {
					onConfirmRemove();
				},
				style: 'destructive'
			},
			{
				text: Languages.Cancel
			}
		]);
	};

	const onUploadCoverPhoto = () => {
		ImagePicker.openPicker({
			includeBase64: true
		}).then((image) => {
			ImageResizer.createResizedImage(image.path, 400, 400, 'JPEG', 100)
				.then(async (response) => {
					let resizedImage = {
						uri: response.uri,
						path: response.path,
						filename: response.name,
						mime: image.mime
					};

					let tmpItinerary = {
						startDate: startDate,
						endDate: endDate,
						title: title,
						itineraryId: itineraryId,
						coverPhoto: resizedImage.path
					};

					let uploadResponse = await props.uploadCoverPhoto(itineraryId, token, resizedImage.path);

					if (uploadResponse.OK) {
						showOkAlert(Languages.UpdateSuccessTitle, Languages.UpdateSuccessMessage);
						setCoverPhoto(resizedImage.path);
						props.addItineraryToRedux(tmpItinerary);
					} else {
						showOkAlert(Languages.SomethingWentWrong, Languages.SystemError);
					}
				})
				.catch((error) => {
					Bugsnag.leaveBreadcrumb(TAG, `RESIZE IMAGE - ${error}`);
					Bugsnag.notify(new Error(error));
				});
		});
	};

	const checkPermission = () => {
		if (Platform.OS === 'ios') {
			check(PERMISSIONS.IOS.PHOTO_LIBRARY).then((result) => {
				switch (result) {
					case RESULTS.UNAVAILABLE:
						break;
					case RESULTS.DENIED:
						console.log('undenied');
						request(PERMISSIONS.IOS.PHOTO_LIBRARY).then((requestResult) => {
							switch (requestResult) {
								case RESULTS.UNAVAILABLE:
									break;
								case RESULTS.DENIED:
									console.log('undenied');
									break;
								case RESULTS.GRANTED:
									onUploadCoverPhoto();
									break;
								case RESULTS.BLOCKED:
									console.log('blocked');
									break;
							}
						});
						break;
					case RESULTS.GRANTED:
						onUploadCoverPhoto();
						break;
					case RESULTS.BLOCKED:
						console.log('blocked');
						showOkCancelAlert(Languages.Settings, Languages.OpenSettings, Languages.Settings, () =>
							openSettings().catch(() => console.warn('cannot open settings'))
						);
						break;
				}
			});
		} else {
			check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then((result) => {
				switch (result) {
					case RESULTS.UNAVAILABLE:
						break;
					case RESULTS.DENIED:
						request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then((requestResult) => {
							switch (requestResult) {
								case RESULTS.UNAVAILABLE:
									break;
								case RESULTS.DENIED:
									console.log('denied');
									break;
								case RESULTS.GRANTED:
									onUploadCoverPhoto();
									break;
								case RESULTS.BLOCKED:
									console.log('blocked');
									break;
							}
						});
						break;
					case RESULTS.GRANTED:
						onUploadCoverPhoto();
						break;
					case RESULTS.BLOCKED:
						console.log('blocked');
						// showOkCancelAlert(Languages.Settings, Languages.OpenSettings, Languages.Settings, () =>
						// 	openSettings().catch(() => console.warn('cannot open settings'))
						// );
						break;
				}
			});
		}
	};

	const onGoBack = () => {
		navigation.goBack(null);
	};

	const onBackHandle = () => {
		if (selectedItinerary.days == null) {
			Alert.alert(Languages.EmptyItinerary, Languages.SetStatusToDraft, [
				{
					text: Languages.SaveAsDraft,
					onPress: () => {
						onSetToDraft();
					}
				},
				{
					text: Languages.Remove,
					onPress: () => {
						onConfirmRemovePopUp();
					},
					style: 'destructive'
				}
			]);
		} else if (isDirty) {
			Alert.alert(Languages.UnsavedTitle, Languages.UnsavedDescription, [
				{
					text: Languages.Update,
					onPress: () => {
						onUpdateHandle();
						onGoBack();
					}
				},
				{
					text: Languages.Discard,
					onPress: onGoBack,
					style: 'destructive'
				}
			]);
		} else {
			onGoBack();
		}
	};

	const onScrollHandle = (event) => {
		var currentOffset = event.nativeEvent.contentOffset.y;
		setBackButtonHide(currentOffset > 64);
	};

	const renderUpdateButton = () => {
		if (selectedItinerary === null) return;

		if (isDirty) {
			return (
				<Animated.View style={styles.buttonWrapper}>
					<Button
						text={Languages.Update}
						textStyle={styles.updateButtonTextStyle}
						containerStyle={styles.updateButton}
						onPress={onUpdateHandle}
					/>
				</Animated.View>
			);
		}
	};

	const renderActivity = ({ item }) => <DayHolder type="draft" key={create_UUID()} activity={item} />;

	const renderDays = () => {
		if (selectedItinerary === null) return;

		let renderDays = [];

		const dateFrom = new Date(startDate);
		const dateTo = new Date(endDate);

		const totalDays = calculateDays(dateFrom, dateTo);

		for (let i = 0; i < totalDays; i++) {
			let label = Languages.AddDay + (i + 1);
			let hasDayMatch = false;

			if (selectedItinerary.days !== null && selectedItinerary.days !== undefined) {
				var sortedDays = selectedItinerary.days.sort((a, b) => (a.day > b.day ? 1 : -1));
				// console.log(sortedDays);
				for (let index = 0; index < sortedDays.length; index++) {
					if (i + 1 === sortedDays[index].day) {
						hasDayMatch = true;
						renderDays.push(
							<View
								key={create_UUID()}
								style={[ Styles.Common.RowCenterBetween, { marginVertical: 12 } ]}
							>
								<View style={styles.dayContainer}>
									<Text style={styles.noOfDayText}>
										{Languages.Day} {sortedDays[index].day}
									</Text>
								</View>

								<View style={styles.editDayContainer}>
									<Touchable
										activeOpacity={0.8}
										onPress={() => onNavigateToEditDayDetail(sortedDays[index].day)}
									>
										<Text style={styles.editDayText}>{Languages.Edit}</Text>
									</Touchable>
								</View>
							</View>
						);

						renderDays.push(
							<View key={create_UUID()} style={{ marginTop: 8 }}>
								<Carousel
									data={sortedDays[index].activities}
									layout={'default'}
									renderItem={renderActivity}
									sliderWidth={sliderWidth}
									itemWidth={itemWidth}
									enableMomentum={true}
									activeSlideAlignment={sortedDays[index].activities.length > 1 ? 'start' : 'center'}
									inactiveSlideScale={1}
									inactiveSlideOpacity={0.8}
								/>
							</View>
						);
					}
				}
			}

			if (!hasDayMatch) {
				renderDays.push(
					<View key={create_UUID()}>
						{i > 0 && (
							<View style={styles.separatorWrapper} key={create_UUID()}>
								<View style={styles.straightSeparator} />
							</View>
						)}
					</View>
				);

				renderDays.push(
					<View style={[ Styles.Common.ColumnCenter, { marginVertical: 12 } ]}>
						<Touchable key={create_UUID()} onPress={() => onAddDayHandle(i + 1)}>
							<View
								style={[
									styles.addDayView,
									{
										width: itemWidth - 24
									}
								]}
							>
								<Text style={styles.addDayText}>{label}</Text>
							</View>
						</Touchable>
					</View>
				);
			}
		}

		return renderDays;
	};

	const renderLoading = () => {
		if (!isLoading) return;

		return <Spinner mode={Mode.overlay} size={Sizes.SMALL} color={Color.lightTextPrimary} />;
	};

	return (
		<View>
			<Animated.View style={[ styles.backButton, { top: top } ]}>
				{CircleBack(navigation, Color.white, onBackHandle)}
			</Animated.View>
			<ScrollView
				scrollEventThrottle={16}
				onScroll={(e) => onScrollHandle(e)}
				contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}
			>
				{coverPhoto === '' || coverPhoto === null || coverPhoto === undefined ? (
					<UploadImageBox background={Images.worldMapBackground} onPress={() => checkPermission()} />
				) : (
					<UploadImageBox background={coverPhoto} onPress={() => checkPermission()} hide={true} />
				)}
				<View style={styles.subContain}>
					<View style={[ Styles.Common.ColumnCenterLeft, Styles.Common.ShadowBox, styles.titleWrapper ]}>
						<Text style={styles.label}>{Languages.Title}</Text>
						<TextInput
							placeholder={Languages.JourneyName}
							underlineColorAndroid="transparent"
							selectionColor={Color.textSelectionColor}
							value={title}
							onFocus={() => setIsTitleFocus(true)}
							onBlur={() => setIsTitleFocus(false)}
							style={[
								styles.inputStyle,
								{
									borderBottomColor: isTitleFocus ? Color.primary : Color.lightGrey6
								}
							]}
							onChangeText={(text) => {
								setTitle(text);
								setIsDirty(true);
							}}
						/>
					</View>
					<View style={[ Styles.Common.ColumnCenterLeft, Styles.Common.ShadowBox, styles.quoteWrapper ]}>
						<Text style={styles.label}>{Languages.Quote}</Text>
						<TextInput
							placeholder={Languages.Quote}
							underlineColorAndroid="transparent"
							selectionColor={Color.textSelectionColor}
							value={quote}
							onFocus={() => setIsQuoteFocus(true)}
							onBlur={() => setIsQuoteFocus(false)}
							style={[
								styles.inputStyle,
								{
									borderBottomColor: isQuoteFocus ? Color.primary : Color.lightGrey6
								}
							]}
							onChangeText={(text) => {
								setQuote(text);
								setIsDirty(true);
							}}
						/>
					</View>
					<View style={styles.rowWrapper}>
						<View style={[ Styles.Common.ColumnCenterLeft, Styles.Common.ShadowBox, styles.dateWrapper ]}>
							<Text style={styles.label}>{Languages.Departure}</Text>
							<DatePicker
								style={styles.datePickerStyle}
								date={startDate}
								mode="date"
								placeholder={Languages.SelectDate}
								format="DD-MMM-YYYY"
								minDate="2016-05-01"
								maxDate="2019-12-31"
								confirmBtnText={Languages.Confirm}
								cancelBtnText={Languages.Cancel}
								showIcon={false}
								customStyles={{
									dateInput: styles.dateText,
									placeholderText: styles.dateText,
									dateText: styles.dateText,
									btnTextConfirm: {
										color: Color.primary,
										fontFamily: 'Quicksand-Bold'
									},
									btnTextCancel: {
										fontFamily: 'Quicksand-Regular'
									}
								}}
								onDateChange={(date) => {
									setStartDate(date);
									setIsDirty(true);
								}}
							/>
						</View>
						<View style={{ padding: 8 }}>
							<Icon
								name="chevron-right"
								type="feather"
								size={Styles.IconSize.Medium}
								color={Color.black1}
							/>
						</View>

						<View style={[ Styles.Common.ColumnCenterLeft, Styles.Common.ShadowBox, styles.dateWrapper ]}>
							<Text style={styles.label}>{Languages.Arrival}</Text>
							<DatePicker
								style={styles.datePickerStyle}
								date={endDate}
								mode="date"
								placeholder={Languages.SelectDate}
								format="DD-MMM-YYYY"
								minDate={startDate || '2016-05-01'}
								maxDate="2019-12-31"
								confirmBtnText={Languages.Confirm}
								cancelBtnText={Languages.Cancel}
								showIcon={false}
								customStyles={{
									dateInput: styles.dateText,
									placeholderText: styles.dateText,
									dateText: styles.dateText,
									btnTextConfirm: {
										color: Color.primary,
										fontFamily: 'Quicksand-Bold'
									},
									btnTextCancel: {
										fontFamily: 'Quicksand-Regular'
									}
								}}
								onDateChange={(date) => {
									setEndDate(date);
									setIsDirty(true);
								}}
							/>
						</View>
					</View>
					{renderDays()}
				</View>
				{renderUpdateButton()}
			</ScrollView>
			{renderLoading()}
		</View>
	);
};

const mapStateToProps = ({ user }) => ({
	user
});

export default connect(mapStateToProps, {
	addItineraryToRedux,
	uploadCoverPhoto,
	updateItineraryByID,
	getItineraryById,
	deleteItineraryByID,
	unPublishItineraryByID,
	getDraftItineraries
})(EditItineraryDetail);
