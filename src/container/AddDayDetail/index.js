import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Easing, Animated, BackHandler, Modal, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import moment from 'moment';

import { connect } from 'react-redux';
import { updateDayToItineraryRedux, createActivity, getDraftActivityDetails, deleteActivityByID } from '@actions';

import { Languages, Color, Styles, create_UUID, Constants } from '@common';
import { Spinner, Button, ActivityHolder } from '@components';

import styles from './styles';

const { Action } = Constants.Action;

class AddDayDetail extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activities: [],
			days: [],
			publishedDate: '',
			day: '',
			itineraryId: '',
			height: new Animated.Value(0)
		};
		this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
	}

	componentWillMount() {
		const { navigation } = this.props;
		const { token } = this.props.user;
		const { type } = navigation.state.params;

		this.props.onRef(this);

		if (type === Action.ADD) {
			const { day, days, publishedDate, itineraryId } = navigation.state.params;

			this.setState({
				day,
				days,
				itineraryId,
				publishedDate: publishedDate
			});
		} else {
			const { selectedDay, days, itineraryId } = navigation.state.params;
			this.setState({
				day: selectedDay.day,
				days,
				publishedDate: selectedDay.publishedDate,
				itineraryId,
				activities: selectedDay.activities
			});

			this.props.getDraftActivityDetails(token, itineraryId, selectedDay.day);
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
		const { days, day, publishedDate, activities } = this.state;

		let newDay = {
			day: day,
			publishedDate: publishedDate,
			activities: activities
		};

		let hasDay = days.some((d) => {
			return d.day === day;
		});

		if (hasDay) {
			this.setState(
				(state) => {
					const days = state.days.map((d) => {
						if (d.day === newDay.day) {
							return newDay;
						} else {
							return d;
						}
					});
					return {
						days
					};
				},
				() => {
					//TODO: UPDATE ITINERARY
					this.props.updateDayToItineraryRedux(this.state.days, this.state.itineraryId);
				}
			);
		} else {
			this.setState(
				{
					days: [ ...days, newDay ]
				},
				() => {
					//TODO: UPDATE ITINERARY
					this.props.updateDayToItineraryRedux(this.state.days, this.state.itineraryId);
				}
			);
		}
	};
	onAddActivity = async (title, location, photos, description, currency, budget, rate, type, index) => {
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

		const { publishedDate, day, itineraryId } = this.state;
		const { token } = this.props.user;

		try {
			let response = await this.props.createActivity(newActivity, token, itineraryId, publishedDate, day);

			if (response.OK) {
				if (type === 'edit') {
					this.setState(
						(state) => {
							const activities = state.activities.map((activity, position) => {
								if (position === index) {
									return response.newActivity;
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
							activities: [ ...activities, response.newActivity ]
						},
						() => {
							this.onSaveHandle();
						}
					);
				}
			} else {
				//TODO: show failed to create activity
			}
		} catch (error) {
			//TODO: show failed to create activity
		}
	};

	onNavigateToEditActivityDetail = (index) => {
		const { activities } = this.state;
		const { navigation } = this.props;

		let selectedActivity = activities[index];

		navigation.navigate('AddActivityDetail', {
			day: index + 1,
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
			day: activities.length + 1,
			type: 'add',
			onSaved: this.onAddActivity
		});
	};

	onActivityRemove = (index) => {
		Alert.alert(Languages.RemoveConfirmationActivityTitle, Languages.RemoveConfirmationActivity, [
			{
				text: Languages.Remove,
				onPress: async () => {
					let newActivities = this.state.activities;
					let removedActivity = newActivities.splice(index, 1);
					const { token } = this.props.user;
					try {
						let response = await this.props.deleteActivityByID(removedActivity[0].id, token);

						if (response.OK) {
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
						}
					} catch (error) {}
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
		const { day } = this.state;

		this.setState(
			(state) => {
				const days = state.days.filter((d) => {
					return d.day !== day;
				});

				return {
					days
				};
			},
			() => {
				//TODO: REMOVE DAY AND UPDATE ITINERARY
				this.props.updateDayToItineraryRedux(this.state.days, this.state.itineraryId);

				if (needBack) {
					navigation.goBack(null);
				}
			}
		);
	};

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
		const { activities, day } = this.state;

		if (activities.length > 0) {
			return (
				<View key={create_UUID()} style={{ paddingBottom: 30 }}>
					{activities.map((activity, index) => {
						return (
							<View style={{ ...Styles.Common.ColumnCenter }} key={create_UUID()}>
								<ActivityHolder
									key={create_UUID()}
									index={index}
									day={day}
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
					<View style={styles.addMoreButtonWrapper} key={create_UUID()}>
						<Button
							disabled={false}
							text={Languages.AddMoreActivity}
							textStyle={styles.addActivityButtonText}
							containerStyle={styles.addActivityButton}
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
				<View style={styles.removeButtonWrapper}>
					<Button
						text={Languages.Remove}
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
			<View style={Styles.Common.FullFlex}>
				<ScrollView
					scrollEnabled={activities.length > 0}
					bounces={true}
					contentContainerStyle={styles.scrollViewContainer}
				>
					<View style={styles.container}>
						<TouchableOpacity style={[ styles.dateWrapper, { marginTop: 0 } ]}>
							<Text style={styles.titleStyle}>{Languages.Date}</Text>
							<Text style={[ styles.titleStyle, { color: Color.grey1 } ]}>
								{this.state.publishedDate}
							</Text>
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

const mapStateToProps = ({ user }) => ({
	user
});

export default connect(mapStateToProps, {
	updateDayToItineraryRedux,
	createActivity,
	getDraftActivityDetails,
	deleteActivityByID
})(AddDayDetail);
