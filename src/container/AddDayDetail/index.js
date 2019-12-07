import React, { Component } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	Animated,
	BackHandler,
	Alert,
	Platform,
	TouchableNativeFeedback
} from 'react-native';
import { Icon } from 'react-native-elements';

import { connect } from 'react-redux';
import {
	updateDayToItineraryRedux,
	createActivity,
	updateActivity,
	getDraftActivityDetails,
	deleteActivityByID
} from '@actions';

import { Languages, Color, Styles, create_UUID, Constants, showOkAlert } from '@common';
import { Spinner, Button, ActivityHolder } from '@components';

import styles from './styles';

const Touchable = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;

const { Action } = Constants.Action;
const { Mode } = Constants.Spinner;

class AddDayDetail extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activities: [],
			days: [],
			publishedDate: '',
			day: '',
			itineraryId: '',
			height: new Animated.Value(0),
			isLoading: false
		};
		this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
	}

	_keyExtractor = (item, index) => index.toString();

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
			const { selectedDay, days, itineraryId, publishedDate } = navigation.state.params;
			this.setState({
				day: selectedDay.day,
				days,
				publishedDate: publishedDate,
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

	handleBackButtonClick = () => {
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
						days,
						isLoading: false
					};
				},
				() => {
					this.props.updateDayToItineraryRedux(this.state.days, this.state.itineraryId);
				}
			);
		} else {
			this.setState({ days: [ ...days, newDay ], isLoading: false }, () => {
				this.props.updateDayToItineraryRedux(this.state.days, this.state.itineraryId);
			});
		}
	};

	onAddActivity = async (title, location, photos, description, currency, budget, rating, type, index) => {
		this.setState({ isLoading: true });

		const { activities } = this.state;
		let newActivity = {
			title,
			location,
			photos,
			description,
			currency,
			budget,
			rating
		};

		const { publishedDate, day, itineraryId } = this.state;
		const { token } = this.props.user;

		try {
			let response = await this.props.createActivity(newActivity, token, itineraryId, publishedDate, day);
			if (response.OK) {
				this.setState(
					{
						activities: [ ...activities, response.newActivity ]
					},
					() => {
						this.onSaveHandle();
					}
				);
			} else {
				showOkAlert(Languages.SomethingWentWrong, Languages.SystemError, Languages.OK, () =>
					this.setState({ isLoading: false })
				);
			}
		} catch (error) {
			showOkAlert(Languages.SomethingWentWrong, Languages.SystemError, Languages.OK, () =>
				this.setState({ isLoading: false })
			);
			console.log(error);
			//TODO: show failed to create activity
		}
	};

	onEditActivity = async (title, location, photos, description, currency, budget, rating, type, index) => {
		this.setState({ isLoading: true });

		const { activities } = this.state;
		let newActivity = {
			title,
			location,
			photos,
			description,
			currency,
			budget,
			rating
		};

		const { publishedDate, day, itineraryId } = this.state;
		const { token } = this.props.user;

		let activityId = activities[index].id;

		try {
			let response = await this.props.updateActivity(
				activityId,
				newActivity,
				token,
				itineraryId,
				publishedDate,
				day
			);
			if (response.OK) {
				this.setState({ isLoading: false });

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
				this.setState({ isLoading: false });

				//TODO: show failed to edit activity
			}
		} catch (error) {
			this.setState({ isLoading: false });

			//TODO: show failed to edit activity
		}
	};

	onNavigateToEditActivityDetail = (index) => {
		const { activities, itineraryId } = this.state;
		const { navigation } = this.props;

		let selectedActivity = activities[index];

		navigation.navigate('AddActivityDetail', {
			day: index + 1,
			type: 'edit',
			index,
			selectedActivity,
			itineraryId,
			activityId: selectedActivity.id,
			onSaved: this.onEditActivity
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

	renderActivityHolder = ({ item, index }) => {
		const { day } = this.state;
		return (
			<View style={{ ...Styles.Common.ColumnCenter }}>
				<ActivityHolder
					index={index}
					day={day}
					name={item.title}
					photos={item.photos}
					description={item.description}
					budget={item.budget}
					currency={item.currency}
					rate={item.rating}
					onPress={() => this.onNavigateToEditActivityDetail(index)}
					onRemove={this.onActivityRemove}
				/>
			</View>
		);
	};

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
									rate={activity.rating}
									onPress={this.onNavigateToEditActivityDetail}
									onRemove={this.onActivityRemove}
								/>

								<View style={styles.separatorWrapper}>
									<View style={styles.straightSeparator} />
								</View>
							</View>
						);
					})}
					<View style={styles.addMoreButtonWrapper}>
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
		} else {
			return (
				<View style={[ { flex: 1 }, Styles.Common.ColumnCenter ]}>
					<Touchable onPress={this.onNavigateToActivityDetail} activeOpacity={0.8}>
						<Icon
							name="plus"
							size={Styles.IconSize.CenterView}
							type="feather"
							color={Color.primaryLight3}
						/>
					</Touchable>
					<Text style={styles.smallSectionTitle}>{Languages.AddActivityDesc}</Text>
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

	renderLoading() {
		const { isLoading } = this.state;

		if (!isLoading) {
			return;
		}

		return <Spinner mode={Mode.createActivity} />;
	}

	render() {
		const { activities } = this.state;

		return (
			<View style={Styles.Common.FullFlex}>
				<ScrollView
					ref={(ref) => (this.scrollView = ref)}
					scrollEnabled={activities.length > 0}
					bounces={true}
					contentContainerStyle={styles.scrollViewContainer}
				>
					<View style={styles.container}>
						<Touchable activeOpacity={0.8}>
							<View style={[ styles.dateWrapper, { marginTop: 0 } ]}>
								<Text style={styles.titleStyle}>{Languages.Date}</Text>
								<Text style={[ styles.titleStyle, { color: Color.grey1 } ]}>
									{this.state.publishedDate}
								</Text>
							</View>
						</Touchable>
						{this.renderHolderAndAddButton()}
					</View>

					{this.renderRemoveButton()}
				</ScrollView>
				{this.renderLoading()}
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
	updateActivity,
	getDraftActivityDetails,
	deleteActivityByID
})(AddDayDetail);
