import React, { Component } from 'react';
import { View, Text, RefreshControl, Dimensions, FlatList } from 'react-native';

import { connect } from 'react-redux';
import { getItineraries, getItineraryByCountryId } from '@actions';

import { ItineraryHolder } from '@components';
import { Languages, Color, Constants } from '@common';

import styles from './styles';

const { width, height } = Dimensions.get('window');
const { Type } = Constants.Itinerary_Type;

class ItineraryList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			type: this.props.navigation.state.params.type,
			code: this.props.navigation.state.params.code || '',
			page: 1,
			isLastPage: false,
			itineraries: [],
			endReachedCalledDuringMomentum: true,
			pullToRefresh: false
		};
	}

	_keyExtractor = (item, index) => item.itineraryId.toString();

	componentDidMount = async () => {
		const { code, type } = this.state;
		const { token } = this.props.user;

		if (type === Type.COUNTRY_ITINERARY) {
			try {
				let response = await this.props.getItineraryByCountryId(token, code);

				if (response.OK) {
					this.setState((prevState) => {
						return {
							isLastPage: response.isLastPage,
							itineraries: response.itineraries
						};
					});
				} else {
				}
			} catch (error) {}
		}
	};

	componentDidUpdate() {}

	componentWillUnmount() {}

	refreshItineraries = async () => {
		const { code, type } = this.state;
		const { token } = this.props.user;

		if (type === Type.COUNTRY_ITINERARY) {
			this.setState({ pullToRefresh: true });

			try {
				let response = await this.props.getItineraryByCountryId(token, code);

				if (response.OK) {
					this.setState({
						isLastPage: response.isLastPage,
						itineraries: response.itineraries,
						page: 1
					});
				} else {
				}
			} catch (error) {}
		}
		// console.log(this.props.profile);
	};

	onPressItinerary = (selectedItinerary) => {
		this.props.navigation.navigate('ItineraryDetails', {
			itinerary: selectedItinerary
		});
	};

	handleLoadMore = async () => {
		const { token } = this.props.user;
		const { code, page, type } = this.state;

		if (!this.state.endReachedCalledDuringMomentum) {
			if (type === Type.DAILY_ITINERARY) {
				if (!this.props.itinerary.isItineraryLastPage) {
					try {
						let response = await this.props.getItineraries(token, page + 1);

						if (response.OK) {
							this.setState((prevState) => {
								return {
									page: prevState.page + 1,
									endReachedCalledDuringMomentum: true
								};
							});
						}
					} catch (error) {
						console.log(error);
					}
				} else {
					this.setState({
						endReachedCalledDuringMomentum: true
					});
				}
			} else {
				if (!this.state.isLastPage) {
					try {
						let response = await this.props.getItineraryByCountryId(token, code, page + 1);

						if (response.OK) {
							this.setState((prevState) => {
								return {
									page: prevState.page + 1,
									isLastPage: response.isLastPage,
									itineraries: prevState.itineraries.concat(response.itineraries)
								};
							});
						} else {
						}
					} catch (error) {
						console.log(error);
					}
				}
			}
		}
	};

	renderEndofList() {
		return (
			<View style={styles.separatorWrap}>
				<View style={styles.separator} />
				<Text style={styles.separatorText}>End</Text>
				<View style={styles.separator} />
			</View>
		);
	}

	renderItinerary = ({ item }) => (
		<ItineraryHolder
			itinerary={item}
			key={item.itineraryId}
			onPress={() => this.onPressItinerary(item)}
			type="main"
		/>
	);

	render() {
		const { itineraries } = this.state.type === Type.DAILY_ITINERARY ? this.props.itinerary : this.state;

		return (
			<FlatList
				data={itineraries}
				extraData={[ this.props.itinerary, this.state ]}
				refreshControl={
					<RefreshControl refreshing={this.state.pullToRefresh} onRefresh={this.refreshItineraries} />
				}
				style={styles.container}
				contentContainerStyle={styles.scrollViewContentContainerStyle}
				keyExtractor={this._keyExtractor}
				renderItem={this.renderItinerary}
				onEndReachedThreshold={0.2}
				onEndReached={() => this.handleLoadMore()}
				onMomentumScrollBegin={() => {
					this.setState({
						endReachedCalledDuringMomentum: false
					});
				}}
			/>
		);
	}
}

const mapStateToProps = ({ user, itinerary }) => ({
	user,
	itinerary
});

export default connect(mapStateToProps, {
	getItineraries,
	getItineraryByCountryId
})(ItineraryList);
