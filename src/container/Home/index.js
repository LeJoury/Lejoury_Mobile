import React, { Component } from 'react';
import { Animated, Text, Dimensions, ScrollView, View, TouchableOpacity, Platform } from 'react-native';

import { SearchBar } from 'react-native-elements';

import { connect } from 'react-redux';

import {
	getItineraries,
	getDraftItineraries,
	getProfile,
	getUserItineraries,
	getTravellers,
	getCountryList,
	getHome,
	searchItineraries
} from '@actions';

import { ItineraryHolder, CountryHolder, TravellerHolder, Section, Spinner } from '@components';
import { Search } from '@container';
import { Languages, Color, Styles, Constants } from '@common';
import { Bugsnag } from '@services';

import styles from './styles';

const { width, height } = Dimensions.get('window');
const { Mode, Sizes } = Constants.Spinner;
const { Type } = Constants.Itinerary_Type;

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			searchResult: [],
			searchWidth: new Animated.Value(width - 18),
			showCancel: false,
			searchViewOpacity: new Animated.Value(0),
			showSearchView: false,
			isLoading: false
		};
	}
	_keyExtractor_Itinerary = (item) => item.itineraryId.toString();

	_keyExtractor_Country = (item) => item.name.toString();

	_keyExtractor_Traveller = (item) => item.userId.toString();

	componentDidMount = async () => {
		const { token, userId } = this.props.user;

		this.setState({ isLoading: true });

		try {
			let draftResponse = await this.props.getDraftItineraries(token, userId);

			let profileResponse = await this.props.getProfile(userId, token);

			let userPublishItinerariesResponse = await this.props.getUserItineraries(token, userId, true);
			Promise.all([
				// itineraryResponse,
				draftResponse,
				profileResponse,
				userPublishItinerariesResponse
				// travellerResponse,
				// countryResponse
			]).then((values) => {
				this.setState({ isLoading: false });
			});
		} catch (error) {
			console.log(error);
		}
	};

	willFocusSubscription = this.props.navigation.addListener('willFocus', async (payload) => {
		const { token } = this.props.user;

		try {
			let response = await this.props.getHome(token);

			if (response.OK) {
			}
		} catch (error) {
			console.log(error);
		}
	});

	componentWillUnmount() {
		this.willFocusSubscription.remove();
	}

	componentDidUpdate() {}

	updateSearch = (search) => {
		const { token, userId } = this.props.user;

		this.setState(
			{
				search
			},
			() => {
				this.timer = setTimeout(async () => {
					let searchResponse = await this.props.searchItineraries(token, search);

					if (searchResponse.OK) {
						this.setState({
							searchResult: searchResponse.result
						});
					}
				}, 2000);
			}
		);
	};

	onSearchFocus = () => {
		const { searchWidth, searchViewOpacity } = this.state;

		Animated.timing(searchWidth, {
			toValue: width - 70,
			duration: 300
		}).start(({ finished }) => {
			if (finished) {
				this.setState({
					showCancel: true,
					showSearchView: true
				});

				Animated.timing(searchViewOpacity, {
					toValue: 1,
					duration: 300,
					useNativeDriver: true
				}).start();
			}
		});
	};

	onSearchBlur = () => {
		const { searchWidth, searchViewOpacity } = this.state;

		this.searchBar.blur();

		Animated.timing(searchViewOpacity, {
			toValue: 0,
			duration: 300,
			useNativeDriver: true
		}).start(() => {
			this.setState(
				{
					showCancel: false,
					showSearchView: false
				},
				() => {
					Animated.timing(searchWidth, {
						toValue: width - 18,
						duration: 300
					}).start();
				}
			);
		});
	};

	onPressFamous = (itinerary) => {
		this.props.navigation.navigate('ItineraryDetails', {
			itinerary: itinerary
		});
	};

	onPressCountry = (country) => {
		this.props.navigation.navigate('ItineraryList', {
			code: country.alpha2,
			type: Type.COUNTRY_ITINERARY,
			routeTitle: country.name
		});
	};

	onPressMoreItinerary = () => {
		this.props.navigation.navigate('ItineraryList', {
			type: Type.DAILY_ITINERARY,
			routeTitle: ''
		});
	};

	onPressTraveller = (selectedUser) => {
		this.props.navigation.navigate('TravellerProfile', {
			user: selectedUser
		});
	};

	navigateToTravellerList = () => {
		this.props.navigation.navigate('TravellerList');
	};

	renderFamousPlaces = ({ item }) => (
		<ItineraryHolder itinerary={item} onPress={() => this.onPressFamous(item)} type="main" />
	);

	renderFamousPlacesFooter = () => (
		<View style={styles.itinerarySeeMoreContainer}>
			<TouchableOpacity style={styles.itinerarySeeMoreInnerContainer} onPress={this.onPressMoreItinerary}>
				<Text style={styles.itinerarySeeMoreStyle}>{Languages.more}</Text>
			</TouchableOpacity>
		</View>
	);

	renderPopular = ({ item }) => (
		<CountryHolder country={item} onPress={() => this.onPressCountry(item)} type="main" />
	);

	renderTraveller = ({ item }) => (
		<TravellerHolder traveller={item} onPress={() => this.onPressTraveller(item)} type="main" />
	);

	renderSearchBar = () => {
		const { search } = this.state;

		return (
			<View style={styles.searchViewContainer}>
				<Animated.View style={{ width: this.state.searchWidth }}>
					<SearchBar
						ref={(ref) => (this.searchBar = ref)}
						placeholder={Languages.PlaceHolderTryMalaysia}
						onChangeText={this.updateSearch}
						value={search}
						lightTheme={true}
						platform={Platform.OS}
						showCancel={false}
						containerStyle={styles.searchBarContainerStyle}
						inputContainerStyle={styles.searchBarInputContainerStyle}
						inputStyle={styles.searchBarInputStyle}
						leftIconContainerStyle={{ paddingLeft: 6 }}
						onFocus={this.onSearchFocus}
					/>
				</Animated.View>
				<Animated.View style={styles.cancelSearchBarContainer}>
					<TouchableOpacity onPress={this.onSearchBlur}>
						{this.state.showCancel && <Text style={styles.cancelSearchBarText}>{Languages.Cancel}</Text>}
					</TouchableOpacity>
				</Animated.View>
			</View>
		);
	};

	renderMainFeed() {
		return (
			<ScrollView contentContainerStyle={{ flexGrow: 1, paddingTop: 12 }}>
				<Section
					isHorizontalList={true}
					showHorizontalIndicator={false}
					data={this.props.itinerary.itineraries.slice(0, 6)} //render first 8 itineraries
					type="carousel"
					keyExtractor={this._keyExtractor_Itinerary}
					renderHolder={this.renderFamousPlaces}
					renderFooter={this.renderFamousPlacesFooter}
				>
					<Text style={[ styles.sectionTitle, { fontSize: 26, color: Color.primary } ]}>
						{Languages.Destination}
					</Text>
					<Text style={[ styles.smallSectionTitle, { marginTop: 8 } ]}>
						{Languages.Hello}, {this.props.user.username}
					</Text>
					<Text style={[ styles.smallSectionTitle, { marginTop: 4 } ]}>
						{Languages.WhereWouldYouLikeToExplore}
					</Text>
				</Section>
				<Section
					containerStyle={styles.sectionContainer}
					isHorizontalList={true}
					showHorizontalIndicator={false}
					data={this.props.traveller.travellers}
					keyExtractor={this._keyExtractor_Traveller}
					renderHolder={this.renderTraveller}
					flatListStyle={{ paddingLeft: 10 }}
				>
					<View style={[ Styles.Common.RowCenterBetween, { flex: 1 } ]}>
						<View style={{ flex: 2 }}>
							<Text style={styles.sectionTitle}>{Languages.TopTraveller}</Text>
						</View>
						<TouchableOpacity style={styles.seeMoreContainer} onPress={this.navigateToTravellerList}>
							<Text style={styles.seeMoreStyle}>{Languages.seeMore}</Text>
						</TouchableOpacity>
					</View>
				</Section>
				<Section
					containerStyle={[ styles.sectionContainer, { paddingBottom: 50 } ]}
					isHorizontalList={true}
					showHorizontalIndicator={false}
					data={this.props.itinerary.countries}
					keyExtractor={this._keyExtractor_Country}
					renderHolder={this.renderPopular}
				>
					<Text style={styles.sectionTitle}>{Languages.TrendingCountries}</Text>
				</Section>
			</ScrollView>
		);
	}

	renderLoading = () => {
		const { isLoading } = this.state;

		if (!isLoading) {
			return;
		}
		return <Spinner mode={Mode.overlay} size={Sizes.SMALL} color={Color.lightTextPrimary} />;
	};

	render() {
		const { searchViewOpacity, showSearchView } = this.state;

		const searchViewStyle = {
			opacity: searchViewOpacity.interpolate({
				inputRange: [ 0, 1 ],
				outputRange: [ 0, 1 ]
			}),
			transform: [
				{
					translateY: searchViewOpacity.interpolate({
						inputRange: [ 0, 1 ],
						outputRange: [ 200, 0 ]
					})
				}
			]
		};

		return (
			<View style={styles.container}>
				{this.renderSearchBar()}
				{this.renderMainFeed()}

				{showSearchView && (
					<Animated.View style={[ searchViewStyle, styles.searchViewOverlayContainer ]}>
						<Search
							navigation={this.props.navigation}
							data={this.state.searchResult}
							onResultPress={this.onPressFamous}
						/>
					</Animated.View>
				)}
				{this.renderLoading()}
			</View>
		);
	}
}

const mapStateToProps = ({ draft, user, profile, traveller, itinerary }) => ({
	draft,
	user,
	profile,
	traveller,
	itinerary
});

export default connect(mapStateToProps, {
	getItineraries,
	getDraftItineraries,
	getProfile,
	getUserItineraries,
	getTravellers,
	getCountryList,
	getHome,
	searchItineraries
})(Home);
