import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, Alert, Easing, Animated, Dimensions } from 'react-native';
import DatePicker from 'react-native-datepicker';
import ImagePicker from 'react-native-image-crop-picker';
import Carousel from 'react-native-snap-carousel';
import { Icon } from 'react-native-elements';

import { StackActions } from 'react-navigation';

import { CircleBack } from '../../navigation/IconNav';

import { connect } from 'react-redux';

import { getItineraryDraft, updateItineraryByID, addItineraryToRedux } from '@actions';

import { Languages, Color, calculateDays, Images, Styles, create_UUID, Device } from '@common';
import { Spinner, UploadImageBox, Button, DayHolder } from '@components';

import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

function wp(percentage) {
	const value = percentage * width / 100;
	return Math.round(value);
}

const slideWidth = wp(75);
const itemHorizontalMargin = wp(16);

export const sliderWidth = width;
export const itemWidth = slideWidth + itemHorizontalMargin;

const AddItineraryDetail = (props) => {
	const [ top ] = useState(new Animated.Value(20));
	const [ isTitleFocus, setIsTitleFocus ] = useState(false);

	const [ startDate, setStartDate ] = useState('');
	const [ endDate, setEndDate ] = useState('');
	const [ title, setTitle ] = useState('');
	const [ isDirty, setIsDirty ] = useState(false);

	const { draftItinerary } = props.draft;
	const { navigation } = props;

	useEffect(() => {
		const { startDate, endDate, itineraryName } = draftItinerary;

		setStartDate(startDate);
		setEndDate(endDate);
		setTitle(itineraryName);

		return () => {
			// ImagePicker.clean()
			// 	.then(() => {
			// 		console.log('removed all tmp images from tmp directory');
			// 	})
			// 	.catch((e) => {
			// 		alert(e);
			// 	});
		};
	}, []);

	const setBackButtonHide = (hide) => {
		Animated.timing(top, {
			duration: 50,
			toValue: hide ? -100 : 20,
			easing: Easing.linear
		}).start();
	};

	const onAddDayHandle = (day) => {
		let days = draftItinerary.days || [];

		if (isDirty) {
			let newItinerary = {
				...draftItinerary,
				startDate: startDate,
				endDate: endDate,
				itineraryName: title
			};

			props.addItineraryToRedux(newItinerary);
			props.updateItineraryByID(newItinerary);
			props.getItineraryDraft();

			setIsDirty(false);
		}

		navigation.navigate('AddDayDetail', {
			identifier: day,
			days,
			type: 'add',
			startDate: startDate //itinerary start date
		});
	};

	const onNavigateToEditDayDetail = (selectedDay) => {
		let days = draftItinerary.days || [];

		if (isDirty) {
			let newItinerary = {
				...draftItinerary,
				startDate: startDate,
				endDate: endDate,
				itineraryName: title
			};

			props.addItineraryToRedux(newItinerary);
			props.updateItineraryByID(newItinerary);
			props.getItineraryDraft();

			setIsDirty(false);
		}

		navigation.navigate('AddDayDetail', {
			identifier: draftItinerary.days[selectedDay].identifier,
			selectedDay: draftItinerary.days[selectedDay],
			days,
			type: 'edit' //itinerary start date
		});
	};

	const onPublishHandle = () => {
		navigation.navigate('AddQuote', {
			itineraryName: title
		});
	};

	const onUploadCoverPhoto = () => {
		ImagePicker.openPicker({
			includeBase64: true
		}).then((image) => {
			console.log(image);
			let newItinerary = {
				...draftItinerary,
				// coverPhoto: image.sourceURL
				coverPhoto: image.path
			};

			props.addItineraryToRedux(newItinerary);
			props.updateItineraryByID(newItinerary);
			props.getItineraryDraft();
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
						let newItinerary = {
							...draftItinerary,
							startDate: startDate,
							endDate: endDate,
							itineraryName: title
						};

						props.addItineraryToRedux(newItinerary);
						props.updateItineraryByID(newItinerary);
						props.getItineraryDraft();

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

	const renderPublishButton = () => {
		return (
			<Animated.View style={styles.buttonWrapper}>
				<Button
					text={Languages.Publish.toUpperCase()}
					textStyle={styles.publishButtonTextStyle}
					containerStyle={styles.publishButton}
					onPress={onPublishHandle}
				/>
			</Animated.View>
		);
	};

	const renderActivity = ({ item }) => (
		<DayHolder type="draft" key={create_UUID()} activity={item} onPress={onNavigateToEditDayDetail} />
	);

	const renderDays = () => {
		let renderDays = [];

		const dateFrom = new Date(startDate);
		const dateTo = new Date(endDate);

		console.log(draftItinerary);
		
		const totalDays = calculateDays(dateFrom, dateTo);

		for (let i = 0; i < totalDays; i++) {
			let title = Languages.AddDay + (i + 1);
			let hasDayMatch = false;

			if (draftItinerary.days !== undefined) {
				for (let day = 0; day < draftItinerary.days.length; day++) {
					if (i + 1 === draftItinerary.days[day].identifier) {
						hasDayMatch = true;

						renderDays.push(
							<View
								key={create_UUID()}
								style={[ Styles.Common.RowCenterBetween, { marginVertical: 12 } ]}
							>
								<View style={styles.dayContainer}>
									<Text style={styles.noOfDayText}>
										{Languages.Day} {draftItinerary.days[day].identifier}
									</Text>
								</View>

								<TouchableOpacity
									style={styles.editDayContainer}
									onPress={() => onNavigateToEditDayDetail(day)}
								>
									<Text style={styles.editDayText}>{Languages.Edit}</Text>
								</TouchableOpacity>
							</View>
						);

						renderDays.push(
							<View key={create_UUID()} style={{ marginTop: 8 }}>
								<Carousel
									data={draftItinerary.days[day].activities}
									layout={'default'}
									renderItem={renderActivity}
									sliderWidth={sliderWidth}
									itemWidth={itemWidth}
									enableMomentum={true}
									activeSlideAlignment={'center'}
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
							<Text style={styles.addDayText}>{title}</Text>
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
				{draftItinerary.coverPhoto === '' || draftItinerary.coverPhoto === null ? (
					<UploadImageBox background={Images.worldMapBackground} onPress={() => onUploadCoverPhoto()} />
				) : (
					<UploadImageBox
						background={draftItinerary.coverPhoto}
						onPress={() => onUploadCoverPhoto()}
						hide={true}
					/>
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
				{renderPublishButton()}
			</ScrollView>
		</View>
	);
};

const mapStateToProps = ({ netInfo, draft }) => ({
	netInfo,
	draft
});

export default connect(mapStateToProps, { getItineraryDraft, updateItineraryByID, addItineraryToRedux })(
	AddItineraryDetail
);
