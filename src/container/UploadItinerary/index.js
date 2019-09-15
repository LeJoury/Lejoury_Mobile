import React, { Component } from 'react';
import {
	KeyboardAvoidingView,
	Animated,
	View,
	Text,
	TextInput,
	Dimensions,
	ScrollView,
	TouchableOpacity
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';

import { connect } from 'react-redux';

import { getItineraryDraft, addItineraryToDraft, addItineraryToRedux } from '@actions';

import { Languages, Color, calculateDays, getMonths } from '@common';
import { ButtonIndex, Spinner, Button } from '@components';

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
			fadeAnim: new Animated.Value(0)
		};

		this.onDateChange = this.onDateChange.bind(this);
	}

	componentDidMount() {}

	componentDidUpdate() {}

	componentWillUnmount() {}

	getTotalDays() {
		const { selectedStartDate, selectedEndDate } = this.state;

		if (selectedEndDate === null) return;

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
					selectedEndDate: null
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
			this.state.fadeAnim, // The value to drive
			{ toValue: disabled ? 0 : 1, duration: 150 } // Configuration
		).start();

		if (!disabled) {
			return (
				<Animated.View style={{ opacity: this.state.fadeAnim }}>
					<TouchableOpacity style={styles.buttonWrapper} onPress={this.onNextPressHandle}>
						<LinearGradient
							style={styles.gradientWrapper}
							colors={[ Color.primary, Color.bottom ]}
							start={{ x: 0.0, y: 0.0 }}
							end={{ x: 0.5, y: 1.0 }}
						>
							<Text style={styles.nextButtonTextStyle}>{Languages.Next.toUpperCase()}</Text>
						</LinearGradient>
					</TouchableOpacity>
				</Animated.View>
			);
		}

		return (
			<TouchableOpacity
				disabled={disabled}
				style={[ styles.buttonWrapper, styles.disabledButtonStyle, { opacity: disabled ? 1 : 0 } ]}
				onPress={this.onNextPressHandle}
			>
				<Text style={styles.nextButtonTextStyle}>{Languages.Next.toUpperCase()}</Text>
			</TouchableOpacity>
		);
	}

	render() {
		const minDate = new Date(2018, 1, 1); // Today
		const maxDate = new Date(2030, 12, 31);

		return (
			<KeyboardAvoidingView style={styles.scrollViewContainer} behavior="padding" enabled>
				<ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}>
					<View style={styles.container}>
						<CalendarPicker
							startFromMonday={true}
							allowRangeSelection={true}
							minDate={minDate}
							maxDate={maxDate}
							months={MONTHS}
							todayBackgroundColor={Color.primaryLight2}
							selectedDayColor={Color.primary}
							selectedDayTextColor={Color.white}
							onDateChange={this.onDateChange}
							textStyle={styles.dateTextStyle}
						/>
						<View style={styles.contentWrapper}>
							{/* {this.renderTotalDays()} */}
							<Text style={styles.greetTextStyle}>{this.state.greetingTitle}</Text>
							{/* <Text style={styles.headerTitleStyle}>{Languages.JourneyName}</Text> */}
							<TextInput
								placeholder={Languages.JourneyName}
								underlineColorAndroid="transparent"
								value={this.state.itineraryName}
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
								// onSubmitEditing={this.startNewSearch.bind(this)}
							/>
						</View>
					</View>
				</ScrollView>
				{this.renderNextButton()}
			</KeyboardAvoidingView>
		);
	}
}
export default connect(null, { getItineraryDraft, addItineraryToDraft, addItineraryToRedux })(UploadItinerary);
