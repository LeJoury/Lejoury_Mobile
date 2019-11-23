import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, Alert, Easing, Animated, Dimensions } from 'react-native';
import DatePicker from 'react-native-datepicker';
import ImagePicker from 'react-native-image-crop-picker';
import Carousel from 'react-native-snap-carousel';
import { Icon } from 'react-native-elements';
import ImageResizer from 'react-native-image-resizer';
import Bugsnag from '@services';
import moment from 'moment';

import { StackActions } from 'react-navigation';

import { CircleBack } from '../../navigation/IconNav';

import { connect } from 'react-redux';
import { addItineraryToRedux, uploadCoverPhoto, updateItineraryByID, getDraftItineraryDetails } from '@actions';

import { Languages, Color, calculateDays, Images, Styles, create_UUID, Constants, showOkAlert } from '@common';
import { UploadImageBox, Button, DayHolder } from '@components';

import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');
const { Action } = Constants.Action;
const TAG = 'AddItineraryDetail';

function wp(percentage) {
	const value = percentage * width / 100;
	return Math.round(value);
}

const slideWidth = wp(75);
const itemHorizontalMargin = wp(16);

export const sliderWidth = width;
export const itemWidth = slideWidth + itemHorizontalMargin;

const AddItineraryDetail = (props) => {
	const { navigation } = props;
	const { token, userId } = props.user;
	const { draftItinerary, itineraryId } = navigation.state.params;

	const [ top ] = useState(new Animated.Value(20));
	const [ isTitleFocus, setIsTitleFocus ] = useState(false);

	const [ startDate, setStartDate ] = useState(moment(new Date(draftItinerary.startDate)).format('DD-MMM-YYYY'));
	const [ endDate, setEndDate ] = useState(moment(new Date(draftItinerary.endDate)).format('DD-MMM-YYYY'));
	const [ title, setTitle ] = useState(draftItinerary.title);

	const [ coverPhoto, setCoverPhoto ] = useState(draftItinerary.coverPhoto);

	const [ selectedItinerary, setSelectedItinerary ] = useState(
		props.draft.itineraries.find((itinerary) => itinerary.itineraryId === itineraryId)
	);

	const [ isDirty, setIsDirty ] = useState(false);

	useEffect(
		() => {
			setSelectedItinerary(props.draft.itineraries.find((itinerary) => itinerary.itineraryId === itineraryId));

			return () => {
				ImagePicker.clean();
			};
		},
		[ props.draft.itineraries.find((itinerary) => itinerary.itineraryId === itineraryId) ]
	);

	const setBackButtonHide = (hide) => {
		Animated.timing(top, {
			duration: 50,
			toValue: hide ? -100 : 20,
			easing: Easing.linear
		}).start();
	};

	const onAddDayHandle = (day) => {
		let tmpDays = selectedItinerary.days || [];

		if (isDirty) {
			onUpdateHandle();
		}

		navigation.navigate('AddDayDetail', {
			day: day,
			itineraryId: itineraryId,
			days: tmpDays,
			type: Action.ADD,
			publishedDate: moment(new Date(startDate), 'DD-MMM-YYYY').add(day - 1, 'd').format('DD-MMM-YYYY')
		});
	};

	const onNavigateToEditDayDetail = (selectedDay) => {
		let tmpDays = selectedItinerary.days || [];
		if (isDirty) {
			onUpdateHandle();
		}

		navigation.navigate('AddDayDetail', {
			day: selectedDay,
			selectedDay: selectedItinerary.days.find((tmpDay) => tmpDay.day === selectedDay),
			itineraryId: itineraryId,
			days: tmpDays,
			type: Action.EDIT
		});
	};

	const onPublishHandle = () => {
		if (selectedItinerary.coverPhoto === null) {
			showOkAlert(Languages.CoverPhotoNeededTitle, Languages.CoverPhotoNeededMessage);
			return;
		} else {
			navigation.navigate('AddQuote', {
				title: title,
				itineraryId: itineraryId,
				quote: selectedItinerary.quote !== null && selectedItinerary.quote !== '' ? selectedItinerary.quote : ''
			});
		}
	};

	const onUpdateHandle = () => {
		let newItinerary = {
			startDate: startDate,
			endDate: endDate,
			title: title,
			itineraryId: itineraryId
		};

		props.updateItineraryByID(itineraryId, newItinerary, token, userId).then((response) => {
			if (response.OK) {
				setIsDirty(false);
			}
		});
	};

	const onUploadCoverPhoto = () => {
		ImagePicker.openPicker({
			includeBase64: true
		}).then((image) => {
			ImageResizer.createResizedImage(image.path, 400, 400, 'JPEG', 90)
				.then((response) => {
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

					props.uploadCoverPhoto(itineraryId, token, resizedImage.path).then(() => {
						setCoverPhoto(resizedImage.path);
						props.addItineraryToRedux(tmpItinerary);
					});
				})
				.catch((error) => {
					Bugsnag.leaveBreadcrumb(TAG, `RESIZE IMAGE - ${error}`);
					Bugsnag.notify(new Error(error));
				});
		});
	};

	const onGoBack = () => {
		const { draft } = props;

		if (draft.itineraries.length > 0) {
			navigation.dispatch(StackActions.popToTop());
		} else {
			navigation.goBack(null);
		}
	};

	const onBackHandle = () => {
		if (isDirty) {
			Alert.alert(Languages.UnsavedTitle, Languages.UnsavedDescription, [
				{
					text: Languages.SaveAsDraft,
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

	const renderUpdateOrPublishButton = () => {
		const dateFrom = new Date(startDate);
		const dateTo = new Date(endDate);

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

		if (selectedItinerary.days != null && selectedItinerary.days.length === calculateDays(dateFrom, dateTo)) {
			return (
				<Animated.View style={styles.buttonWrapper}>
					<Button
						text={Languages.Publish}
						textStyle={styles.publishButtonTextStyle}
						containerStyle={styles.publishButton}
						onPress={onPublishHandle}
					/>
				</Animated.View>
			);
		} else {
			return (
				<Animated.View style={styles.buttonWrapper}>
					<Button
						disabled={true}
						text={Languages.Publish}
						textStyle={styles.disabledPublishButtonTextStyle}
						containerStyle={styles.disabledPublishButton}
					/>
				</Animated.View>
			);
		}
	};

	const renderActivity = ({ item }) => <DayHolder type="draft" key={create_UUID()} activity={item} />;

	const renderDays = () => {
		let renderDays = [];

		const dateFrom = new Date(startDate);
		const dateTo = new Date(endDate);

		const totalDays = calculateDays(dateFrom, dateTo);

		for (let i = 0; i < totalDays; i++) {
			let label = Languages.AddDay + (i + 1);
			let hasDayMatch = false;

			if (selectedItinerary.days !== null && selectedItinerary.days !== undefined) {
				var sortedDays = selectedItinerary.days.sort((a, b) => (a.day > b.day ? 1 : -1));
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

								<TouchableOpacity
									style={styles.editDayContainer}
									onPress={() => onNavigateToEditDayDetail(sortedDays[index].day)}
								>
									<Text style={styles.editDayText}>{Languages.Edit}</Text>
								</TouchableOpacity>
							</View>
						);

						renderDays.push(
							<View key={create_UUID()} style={{ marginTop: 8 }}>
								<Carousel
									data={sortedDays[index].activities}
									layout={'default'}
									renderItem={renderActivity}
									sliderWidth={sliderWidth}
									itemWidth={sortedDays[index].activities.length > 1 ? itemWidth : itemWidth + wp(8)}
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
					<TouchableOpacity
						key={create_UUID()}
						style={[ Styles.Common.ColumnCenter, { marginVertical: 12 } ]}
						onPress={() => onAddDayHandle(i + 1)}
					>
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
					</TouchableOpacity>
				);
			}
		}

		return renderDays;
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
					<UploadImageBox background={Images.worldMapBackground} onPress={() => onUploadCoverPhoto()} />
				) : (
					<UploadImageBox background={coverPhoto} onPress={() => onUploadCoverPhoto()} hide={true} />
				)}
				<View style={styles.subContain}>
					<View style={[ Styles.Common.ColumnCenterLeft, Styles.Common.ShadowBox, styles.titleWrapper ]}>
						<Text style={styles.label}>{Languages.Title}</Text>
						{/* <View style={[ Styles.Common.ColumnCenterRight, { flex: 1 } ]}> */}
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
						{/* </View> */}
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
				{renderUpdateOrPublishButton()}
			</ScrollView>
		</View>
	);
};

const mapStateToProps = ({ draft, user }) => ({
	draft,
	user
});

export default connect(mapStateToProps, {
	addItineraryToRedux,
	uploadCoverPhoto,
	updateItineraryByID,
	getDraftItineraryDetails
})(AddItineraryDetail);
