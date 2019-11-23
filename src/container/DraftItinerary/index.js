import React, { Component } from 'react';
import { View, FlatList, Text, RefreshControl, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { deleteItineraryByID, getDraftItineraries } from '@actions';

import { ItineraryHolder, Button } from '@components';
import { Color, Styles, Languages, Constants } from '@common';

import styles from './styles';

const { Action } = Constants.Action;

class DraftItinerary extends Component {
	//constructor(props) {
	//super (props)
	//}
	state = {
		pullToRefresh: false,
		page: 1,
		isLastPage: false,
		endReachedCalledDuringMomentum: true
	};

	_keyExtractor = (item, index) => index.toString();

	willFocusSubscription = this.props.navigation.addListener('willFocus', async (payload) => {
		const { token, userId } = this.props.user;

		try {
			let response = await this.props.getDraftItineraries(token, userId, 1);

			if (response.OK) {
				this.setState({
					isLastPage: response.isLastPage
				});
			}
		} catch (error) {}
	});

	componentDidMount() {
		this.props.onRef(this);
	}

	componentDidUpdate() {}

	componentWillUnmount() {
		this.props.onRef(null);
	}

	refreshDraftItineraries = async () => {
		const { userId, token } = this.props.user;
		this.setState({ pullToRefresh: true });

		try {
			let response = await this.props.getDraftItineraries(token, userId, 1);

			if (response.OK) {
				this.setState({
					pullToRefresh: false,
					isLastPage: response.isLastPage
				});
			}
		} catch (error) {
			this.setState({ pullToRefresh: false });
		}
		// console.log(this.props.profile);
	};

	onPressItinerary = (itinerary) => {
		this.props.navigation.navigate('AddItineraryDetail', {
			draftItinerary: itinerary,
			itineraryId: itinerary.itineraryId,
			action: Action.EDIT
		});
	};

	onPressAddNewItinerary = () => {
		this.props.navigation.navigate('AddNewItinerary');
	};

	onRemoveDraft = (itineraryId) => {
		const { token, userId } = this.props.user;

		Alert.alert(Languages.RemoveConfirmationItineraryTitle, Languages.RemoveConfirmationItinerary, [
			{
				text: Languages.Remove,
				onPress: async () => {
					let needUpdate = this.props.draft.itineraries.length >= 10;

					try {
						let response = await this.props.deleteItineraryByID(itineraryId, token);

						if (response.OK) {
							if (needUpdate) {
								let draftResponse = await this.props.getDraftItineraries(token, userId, 1);
								if (draftResponse.OK) {
									this.setState({
										isLastPage: response.isLastPage
									});
								}
							}
						}
					} catch (error) {
						console.log(error);
					}
				},
				style: 'destructive'
			},
			{
				text: Languages.Cancel
			}
		]);
	};

	handleLoadMore = async () => {
		const { token, userId } = this.props.user;
		const { isLastPage } = this.props.draft;


		if (!this.state.endReachedCalledDuringMomentum) {
			if (!isLastPage) {
				try {
					let response = await this.props.getDraftItineraries(token, userId, this.state.page + 1);
					this.setState({ endReachedCalledDuringMomentum: true });
					if (response.OK) {
						this.setState((prevState) => {
							return {
								page: prevState.page + 1
							};
						});
					}
				} catch (error) {}
			} else {
				this.setState({ endReachedCalledDuringMomentum: true });
			}
		}
	};

	renderEndofList() {
		return (
			<View style={styles.separatorWrap}>
				<View style={styles.separator} />
				<Text style={styles.separatorText}>{Languages.End}</Text>
				<View style={styles.separator} />
			</View>
		);
	}

	renderItem = ({ item }) => (
		<ItineraryHolder
			type="draft"
			itinerary={item}
			key={item.itineraryId}
			onPress={() => this.onPressItinerary(item)}
			onRemovePress={() => this.onRemoveDraft(item.itineraryId)}
		/>
	);

	renderEmpty = () => <ItineraryHolder type="emptyDraft" onPress={() => this.onPressAddNewItinerary()} />;

	render() {
		const { itineraries } = this.props.draft;
		return (
			<View style={Styles.Common.FullFlex}>
				<FlatList
					style={{ paddingTop: 6 }}
					data={itineraries}
					extraData={this.props.draft}
					refreshControl={
						<RefreshControl
							refreshing={this.state.pullToRefresh}
							onRefresh={this.refreshDraftItineraries}
						/>
					}
					keyExtractor={this._keyExtractor}
					renderItem={this.renderItem}
					ListEmptyComponent={this.renderEmpty}
					onEndReachedThreshold={0.4}
					onEndReached={() => this.handleLoadMore()}
					onMomentumScrollBegin={() =>
						this.setState({
							endReachedCalledDuringMomentum: false
						})}
				/>
				{/* <Button
					type="floating"
					onPress={() => this._onPressAddNewItinerary()}
					buttonColor={Color.primary}
					icon={<Icon name="plus" type="feather" size={Styles.IconSize.Medium} color={Color.white} />}
				/> */}
			</View>
		);
	}
}

const mapStateToProps = ({ draft, user }) => ({
	draft,
	user
});

export default connect(mapStateToProps, { deleteItineraryByID, getDraftItineraries })(DraftItinerary);
