import React, { Component } from 'react';
import { Animated, View, Text, TextInput, Dimensions, ScrollView } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { connect } from 'react-redux';
import { createItinerary } from '@actions';

import { Languages, Color, calculateDays, getMonths, Constants } from '@common';
import { Spinner, Button } from '@components';

import styles from './styles';

const { Action } = Constants.Action;
const { Mode } = Constants.Spinner;

const MONTHS = getMonths();

class AddItinerary extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedStartDate: '',
			selectedEndDate: '',
			title: '',
			isJourneyInputFocus: false,
			greetingTitle: Languages.PastJourneyDesc,
			backgroundAnim: new Animated.Value(0),
			isLoading: false
		};

		this.onDateChange = this.onDateChange.bind(this);
	}

	onNextPressHandle = () => {
		const { selectedStartDate, selectedEndDate, title } = this.state;

		const startDate = moment(new Date(selectedStartDate)).format('DD-MMM-YYYY');
		const endDate = moment(new Date(selectedEndDate)).format('DD-MMM-YYYY');
		const { token, userId } = this.props.user;

		let newItinerary = {
			title: title,
			startDate: startDate,
			endDate: endDate
		};

		this.props
			.createItinerary(newItinerary, token, userId)
			.then((response) => {
				setTimeout(() => {
					this.setState({ isLoading: false });

					if (response.OK) {
						this.props.navigation.navigate('AddItineraryDetail', {
							draftItinerary: newItinerary,
							itineraryId: response.itineraryId,
							action: Action.ADD
						});
					} else {
						// TODO: SELF-DEFINED ERROR
					}
				}, 1000);
			})
			.catch((error) => {
				this.setState({ isLoading: false });

				//TODO: show fail system fail message
				console.log('CREATING IN SERVER', error);
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

	renderNextButton() {
		const { selectedStartDate, selectedEndDate, title } = this.state;

		const disabled = selectedStartDate === '' || selectedEndDate === '' || title === '';

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
					text={Languages.Next}
					textStyle={styles.nextButtonTextStyle}
					containerStyle={styles.nextButton}
					onPress={() => this.setState({ isLoading: true }, () => this.onNextPressHandle())}
				/>
			</Animated.View>
		);
	}

	renderLoading() {
		const { isLoading } = this.state;

		if (!isLoading) {
			return;
		}

		return <Spinner mode={Mode.createItinerary} />;
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
									onChangeText={(text) => this.setState({ title: text })}
									value={this.state.title}
								/>
							</View>
						</View>
					</ScrollView>
					{this.renderLoading()}
				</KeyboardAwareScrollView>
				{this.renderNextButton()}
			</View>
		);
	}
}

const mapStateToProps = ({ user, draft }) => ({
	user,
	draft
});

export default connect(mapStateToProps, {
	createItinerary
})(AddItinerary);
