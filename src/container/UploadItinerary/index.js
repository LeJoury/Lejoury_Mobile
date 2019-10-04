import React, { Component } from 'react';
import { Animated, View, Text, TextInput, Dimensions, ScrollView } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { connect } from 'react-redux';

import { getItineraryDraft, addItineraryToDraft, addItineraryToRedux } from '@actions';

import { Languages, Color, calculateDays, getMonths } from '@common';
import { Spinner, Button } from '@components';

import styles from './styles';

const { width, height } = Dimensions.get('window');
const MONTHS = getMonths();

class UploadItinerary extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedStartDate: '',
			selectedEndDate: '',
			itineraryName: '',
			isJourneyInputFocus: false,
			greetingTitle: Languages.PastJourneyDesc,
			backgroundAnim: new Animated.Value(0)
		};

		this.onDateChange = this.onDateChange.bind(this);
	}

	componentDidMount() {}

	componentDidUpdate() {}

	componentWillUnmount() {}

	getTotalDays() {
		const { selectedStartDate, selectedEndDate } = this.state;

		if (selectedEndDate === null) {
			return;
		}

		const dateFrom = new Date(selectedStartDate);
		const dateTo = new Date(selectedEndDate);

		return calculateDays(dateFrom, dateTo);
	}

	onNextPressHandle = () => {
		const { selectedStartDate, selectedEndDate, itineraryName } = this.state;

		const startDate = moment(selectedStartDate).format('DD-MMM-YYYY');
		const endDate = moment(selectedEndDate).format('DD-MMM-YYYY');

		this.props
			.addItineraryToDraft(itineraryName, startDate, endDate)
			.then((itinerary) => {
				//added successfully
				this.props.addItineraryToRedux(itinerary);
				this.props.getItineraryDraft();
				this.props.navigation.navigate('AddItineraryDetail');
			})
			.catch((error) => {
				console.log(error);
			});
	};

	onDateChange(date, type) {
		const now = moment();

		if (type === 'END_DATE') {
			this.setState({
				selectedEndDate: date
			});
		} else {
			this.setState(
				{
					selectedStartDate: date,
					selectedEndDate: date
				},
				() => {
					if (this.state.selectedStartDate > now) {
						this.setState({
							greetingTitle: Languages.FutureJourneyDesc
						});
					} else {
						this.setState({
							greetingTitle: Languages.PastJourneyDesc
						});
					}
				}
			);
		}
	}

	renderTotalDays() {
		const days = this.getTotalDays();

		if (days > 0) {
			return (
				<View style={styles.rowWrapper}>
					<Text style={styles.noOfDaysTextStyle}>
						{Languages.TotalDays} : {days}
					</Text>
				</View>
			);
		}

		return null;
	}

	renderNextButton() {
		const { selectedStartDate, selectedEndDate, itineraryName } = this.state;

		const disabled = selectedStartDate === '' || selectedEndDate === '' || itineraryName === '';

		Animated.timing(
			this.state.backgroundAnim, // The value to drive
			{
				toValue: disabled ? 0 : 1,
				duration: 200
			} // Configuration
		).start();

		const backgroundColorInterpolate = this.state.backgroundAnim.interpolate({
			inputRange: [ 0, 1 ],
			outputRange: [ Color.lightGrey4, Color.splashScreenBg5 ]
		});

		return (
			<Animated.View style={[ styles.buttonWrapper, { backgroundColor: backgroundColorInterpolate } ]}>
				<Button
					disabled={disabled}
					text={Languages.Next.toUpperCase()}
					textStyle={styles.nextButtonTextStyle}
					containerStyle={styles.nextButton}
					onPress={this.onNextPressHandle}
				/>
			</Animated.View>
		);
	}

	render() {
		const minDate = new Date(2018, 1, 1); // Today
		const maxDate = new Date(2030, 12, 31);

		return (
			<View style={styles.scrollViewContainer}>
				<KeyboardAwareScrollView
					style={styles.scrollViewContainer}
					behavior="padding"
					enabled
					enableOnAndroid={true}
				>
					<ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}>
						<View style={styles.container}>
							<CalendarPicker
								startFromMonday={true}
								allowRangeSelection={true}
								minDate={minDate}
								maxDate={maxDate}
								months={MONTHS}
								todayBackgroundColor={Color.black40T}
								selectedDayColor={Color.splashScreenBg6}
								selectedDayTextColor={Color.white}
								onDateChange={this.onDateChange}
								textStyle={styles.dateTextStyle}
							/>
							<View style={styles.contentWrapper}>
								<Text style={styles.greetTextStyle}>{this.state.greetingTitle}</Text>
								<TextInput
									placeholder={Languages.JourneyName}
									placeholderTextColor={Color.lightGrey3}
									selectionColor={Color.textSelectionColor}
									underlineColorAndroid="transparent"
									onFocus={() =>
										this.setState({
											isJourneyInputFocus: true
										})}
									onBlur={() =>
										this.setState({
											isJourneyInputFocus: false
										})}
									style={[
										styles.inputStyle,
										{
											borderBottomColor: this.state.isJourneyInputFocus
												? Color.primary
												: Color.lightGrey6
										}
									]}
									onChangeText={(text) => this.setState({ itineraryName: text })}
									value={this.state.itineraryName}
								/>
							</View>
						</View>
					</ScrollView>
				</KeyboardAwareScrollView>
				{this.renderNextButton()}
			</View>
		);
	}
}
export default connect(null, { getItineraryDraft, addItineraryToDraft, addItineraryToRedux })(UploadItinerary);
