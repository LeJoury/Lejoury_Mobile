import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Easing, Animated, BackHandler, Modal, Alert } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
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

	componentWillMount() {
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
	}

	componentDidMount() {
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
		const { type } = this.props.navigation.state.params;
		const { days, identifier, date, activities } = this.state;

		let newDay = {
			identifier: identifier,
			date: date,
			activities: activities
		};

		if (type === 'add') {
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
		} else {
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

					this.setState({
						activities: newActivities
					});
				},
				style: 'destructive'
			},
			{
				text: Languages.Cancel
			}
		]);
	};

	onDayRemove = () => {
		const { navigation } = this.props;
		const { identifier } = this.state;
		const { draftItinerary } = this.props.draft;

		Alert.alert(Languages.RemoveConfirmationDayTitle, Languages.RemoveConfirmationDay, [
			{
				text: Languages.Remove,
				onPress: () => {
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
							navigation.goBack(null);
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
				<View>
					{activities.map((activity, index) => {
						return (
							<View style={{ ...Styles.Common.ColumnCenter }} key={create_UUID()}>
								<ActivityHolder
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
								<View style={styles.separatorWrapper}>
									<View style={styles.straightSeparator} />
								</View>
							</View>
						);
					})}
					<View style={[ styles.buttonWrapper, { marginTop: 10 } ]}>
						<Button
							textStyle={styles.addActivityButtonText}
							containerStyle={styles.addActivityButton}
							bottomColor={Color.white}
							topColor={Color.white}
							type="gradientBorder"
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
				<TouchableOpacity style={styles.removeButtonContainer} onPress={this.onDayRemove}>
					<Icon name="trash-2" type="feather" size={Styles.IconSize.Small} color={Color.white} />
					<Text style={styles.removeTextStyle}>{Languages.Remove.toUpperCase()}</Text>
				</TouchableOpacity>
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
					contentContainerStyle={{
						flexGrow: 1,
						flexDirection: 'column',
						justifyContent: 'space-between',
						backgroundColor: Color.DirtyBackground
					}}
				>
					<View style={styles.container}>
						<TouchableOpacity style={[ styles.wrapper, { marginTop: 0 } ]}>
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
