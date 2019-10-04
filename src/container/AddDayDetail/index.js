import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Easing, Animated, BackHandler, Modal, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import moment from 'moment';

import { getItineraryDraft, updateItineraryByID, addDayToItineraryRedux } from '@actions';

import { Languages, Color, Styles, create_UUID, formatImages, Device } from '@common';
import { Spinner, Button, ActivityHolder } from '@components';

import styles from './styles';

class AddDayDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activities: [],
			days: [],
			date: '',
			identifier: '',
			height: new Animated.Value(0)
		};
		this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
	}

	componentDidMount() {
		const { navigation } = this.props;
		const { type } = navigation.state.params;

		this.props.onRef(this);

		if (type === 'add') {
			const { identifier, days, startDate } = navigation.state.params;

			let thisDate = moment(startDate, 'DD-MMM-YYYY').add(identifier - 1, 'd').format('DD-MMM-YYYY');

			this.setState({
				identifier,
				days,
				date: thisDate
			});
		} else {
			const { selectedDay, days } = navigation.state.params;

			this.setState({
				identifier: selectedDay.identifier,
				days,
				date: selectedDay.date,
				activities: selectedDay.activities
			});
		}
		BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

		this.props.navigation.setParams({ handleGoToAddActivity: this.onNavigateToActivityDetail });
	}

	componentDidUpdate() {}

	componentWillUnmount() {
		this.props.onRef(null);
		BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
	}

	handleBackButtonClick() {
		this.props.navigation.goBack(null);
		return true;
	}

	onSaveHandle = () => {
		const { draftItinerary } = this.props.draft;
		const { days, identifier, date, activities } = this.state;

		let newDay = {
			identifier: identifier,
			date: date,
			activities: activities
		};

		let hasDay = days.some((day) => {
			return day.identifier === identifier;
		});

		if (hasDay) {
			this.setState(
				(state) => {
					const days = state.days.map((day) => {
						if (day.identifier === newDay.identifier) {
							return newDay;
						} else {
							return day;
						}
					});

					return {
						days
					};
				},
				() => {
					let newItinerary = {
						...draftItinerary,
						days: this.state.days
					};

					this.props.updateItineraryByID(newItinerary);
					this.props.addDayToItineraryRedux(this.state.days);
					this.props.getItineraryDraft();
				}
			);
		} else {
			this.setState(
				{
					days: [ ...days, newDay ]
				},
				() => {
					let newItinerary = {
						...draftItinerary,
						days: this.state.days
					};

					this.props.updateItineraryByID(newItinerary);
					this.props.addDayToItineraryRedux(this.state.days);
					this.props.getItineraryDraft();
				}
			);
		}
	};
	onAddActivity = (title, location, photos, description, currency, budget, rate, type, index) => {
		const { activities } = this.state;

		let newActivity = {
			title,
			location,
			photos,
			description,
			currency,
			budget,
			rate
		};

		if (type === 'edit') {
			this.setState(
				(state) => {
					const activities = state.activities.map((activity, position) => {
						if (position === index) {
							return newActivity;
						} else {
							return activity;
						}
					});

					return {
						activities
					};
				},
				() => {
					this.onSaveHandle();
				}
			);
		} else {
			this.setState(
				{
					activities: [ ...activities, newActivity ]
				},
				() => {
					this.onSaveHandle();
				}
			);
		}
	};

	onNavigateToEditActivityDetail = (index) => {
		const { activities } = this.state;
		const { navigation } = this.props;

		let selectedActivity = activities[index];

		navigation.navigate('AddActivityDetail', {
			identifier: index + 1,
			type: 'edit',
			index,
			selectedActivity,
			onSaved: this.onAddActivity
		});
	};

	onNavigateToActivityDetail = () => {
		const { activities } = this.state;
		const { navigation } = this.props;

		navigation.navigate('AddActivityDetail', {
			identifier: activities.length + 1,
			type: 'add',
			onSaved: this.onAddActivity
		});
	};

	onActivityRemove = (index) => {
		Alert.alert(Languages.RemoveConfirmationActivityTitle, Languages.RemoveConfirmationActivity, [
			{
				text: Languages.Remove,
				onPress: () => {
					let newActivities = this.state.activities;
					newActivities.splice(index, 1);

					this.setState(
						{
							activities: newActivities
						},
						() => {
							if (this.state.activities.length > 0) {
								this.onSaveHandle();
							} else {
								this.onDayRemove(false);
							}
						}
					);
				},
				style: 'destructive'
			},
			{
				text: Languages.Cancel
			}
		]);
	};

	onDayRemove = (needBack = true) => {
		const { navigation } = this.props;
		const { identifier } = this.state;
		const { draftItinerary } = this.props.draft;

		this.setState(
			(state) => {
				const days = state.days.filter((day) => {
					return day.identifier !== identifier;
				});

				return {
					days
				};
			},
			() => {
				let newItinerary = {
					...draftItinerary,
					days: this.state.days
				};

				this.props.updateItineraryByID(newItinerary);
				this.props.addDayToItineraryRedux(this.state.days);
				this.props.getItineraryDraft();

				if (needBack) {
					navigation.goBack(null);
				}
			}
		);
	}
	onDayRemovePress = () => {

		Alert.alert(Languages.RemoveConfirmationDayTitle, Languages.RemoveConfirmationDay, [
			{
				text: Languages.Remove,
				onPress: () => this.onDayRemove(),
				style: 'destructive'
			},
			{
				text: Languages.Cancel
			}
		]);
	};

	// ------------------------------------------------ render add activities ---------------------
	renderAddActivityView() {
		const { activities } = this.state;

		if (activities.length === 0) {
			return (
				<View style={[ { flex: 1 }, Styles.Common.ColumnCenter ]}>
					<TouchableOpacity onPress={this.onNavigateToActivityDetail}>
						<Icon
							name="plus"
							size={Styles.IconSize.CenterView}
							type="feather"
							color={Color.primaryLight3}
						/>
					</TouchableOpacity>
					<Text style={styles.smallSectionTitle}>{Languages.AddActivityDesc}</Text>
				</View>
			);
		}
	}

	renderHolderAndAddButton() {
		const { activities, identifier } = this.state;

		if (activities.length > 0) {
			return (
				<View key={create_UUID()} style={{ paddingBottom: 30 }}>
					{activities.map((activity, index) => {
						return (
							<View style={{ ...Styles.Common.ColumnCenter }} key={create_UUID()}>
								<ActivityHolder
									key={create_UUID()}
									index={index}
									identifier={identifier}
									name={activity.title}
									photos={activity.photos}
									description={activity.description}
									budget={activity.budget}
									currency={activity.currency}
									rate={activity.rate}
									onPress={this.onNavigateToEditActivityDetail}
									onRemove={this.onActivityRemove}
								/>
								<View style={styles.separatorWrapper} key={create_UUID()}>
									<View style={styles.straightSeparator} />
								</View>
							</View>
						);
					})}
					<View style={[ styles.buttonWrapper, { marginTop: 10 } ]} key={create_UUID()}>
						<Button
							textStyle={styles.addActivityButtonText}
							containerStyle={styles.addActivityButton}
							type="gradientBorder"
							gradientColors={[ Color.white, Color.white ]}
							text={Languages.AddMoreActivity}
							disabled={false}
							onPress={this.onNavigateToActivityDetail}
						/>
					</View>
				</View>
			);
		}
	}

	renderRemoveButton = () => {
		const { activities } = this.state;

		if (activities.length > 0) {
			return (
				// <TouchableOpacity style={styles.removeButtonContainer} onPress={this.onDayRemovePress}>
				// 	<Text style={styles.removeTextStyle}>{Languages.Remove.toUpperCase()}</Text>
				// </TouchableOpacity>

				<View style={styles.removeButtonWrapper}>
					<Button
						text={Languages.Remove.toUpperCase()}
						textStyle={styles.removeTextStyle}
						containerStyle={styles.removeButton}
						onPress={this.onDayRemovePress}
					/>
				</View>
			);
		}
	};

	render() {
		const { activities } = this.state;

		return (
			<View style={{ flex: 1 }}>
				<ScrollView
					scrollEnabled={activities.length > 0}
					bounces={true}
					contentContainerStyle={styles.scrollViewContainer}
				>
					<View style={styles.container}>
						<TouchableOpacity style={[ styles.dateWrapper, { marginTop: 0 } ]}>
							<Text style={styles.titleStyle}>{Languages.Date}</Text>
							<Text style={[ styles.titleStyle, { color: Color.grey1 } ]}>{this.state.date}</Text>
						</TouchableOpacity>

						{this.renderAddActivityView()}
						{this.renderHolderAndAddButton()}
					</View>

					{this.renderRemoveButton()}
				</ScrollView>
			</View>
		);
	}
}

const mapStateToProps = ({ netInfo, draft }) => ({
	netInfo,
	draft
});

export default connect(mapStateToProps, { getItineraryDraft, updateItineraryByID, addDayToItineraryRedux })(
	AddDayDetail
);
