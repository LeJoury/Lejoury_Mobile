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
	getCountryList
} from '@actions';

import { ItineraryHolder, CountryHolder, TravellerHolder, Section, Spinner } from '@components';
import { Search } from '@container';
import { Images, Languages, Device, Color, Styles, Constants } from '@common';
import { Bugsnag } from '@services';

import styles from './styles';

const { width, height } = Dimensions.get('window');
const { Mode, Sizes } = Constants.Spinner;

const countries = [
	{
		countryID: 'country_1',
		countryName: 'Malaysia',
		thumbnails:
			'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/Countries%2FMalaysia.jpg?alt=media&token=9f1a40b2-4429-4562-9409-5faeac822e91'
	},
	{
		countryID: 'country_2',
		countryName: 'Brunei',
		thumbnails:
			'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/Countries%2FBrunei.jpeg?alt=media&token=541930d6-e212-4c27-b93e-9099c157fcb5'
	},
	{
		countryID: 'country_3',
		countryName: 'Cambodia',
		thumbnails:
			'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/Countries%2FCambodia.jpg?alt=media&token=19eec492-827b-46e3-8cd9-926ceef6bd20'
	},
	{
		countryID: 'country_4',
		countryName: 'Laos',
		thumbnails:
			'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/Countries%2FLaos.jpeg?alt=media&token=0ad2ce9a-bcac-4bb5-b060-0c817fda09a3'
	},
	{
		countryID: 'country_5',
		countryName: 'Myanmar',
		thumbnails:
			'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/Countries%2FMyanmar.jpg?alt=media&token=c8f9341f-8b32-47f1-9aac-ff9c5103af92'
	},
	{
		countryID: 'country_6',
		countryName: 'Philippines',
		thumbnails:
			'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/Countries%2FPhilippines.jpg?alt=media&token=195d88ab-236e-4e37-b301-d44011dc9da4'
	},
	{
		countryID: 'country_7',
		countryName: 'Singapore',
		thumbnails:
			'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/Countries%2FSingapore.jpg?alt=media&token=53423a33-fcf1-4e83-979e-85cefc1f22e2'
	},
	{
		countryID: 'country_8',
		countryName: 'Thailand',
		thumbnails:
			'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/Countries%2FThailand.jpeg?alt=media&token=0e5c0250-611f-4c42-88b3-277bfb1ae42b'
	},
	{
		countryID: 'country_9',
		countryName: 'Vietnam',
		thumbnails:
			'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/Countries%2FVietnam.jpg?alt=media&token=534fbb86-c4ef-4b0a-b34d-257dff55d6d7'
	}
];

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			searchWidth: new Animated.Value(width - 18),
			showCancel: false,
			searchViewOpacity: new Animated.Value(0),
			showSearchView: false,
			isLoading: false
		};
	}
	_keyExtractor_Itinerary = (item) => item.itineraryId.toString();

	_keyExtractor_Country = (item) => item.countryID.toString();

	_keyExtractor_Traveller = (item) => item.userId.toString();

	componentDidMount = async () => {
		const { token, userId } = this.props.user;

		this.setState({ isLoading: true });

		try {
			let itineraryResponse = await this.props.getItineraries(token);

			let draftResponse = await this.props.getDraftItineraries(token, userId);

			let profileResponse = await this.props.getProfile(userId, token);

			let userPublishItinerariesResponse = await this.props.getUserItineraries(token, userId, true);

			let travellerResponse = await this.props.getTravellers(token);

			let countryResponse = await this.props.getCountryList(token);

			Promise.all([
				itineraryResponse,
				draftResponse,
				profileResponse,
				userPublishItinerariesResponse,
				travellerResponse,
				countryResponse
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
			let itineraryResponse = await this.props.getItineraries(token);

			let travellerResponse = await this.props.getTravellers(token);

			let countryResponse = await this.props.getCountryList(token);

			Promise.all([
				itineraryResponse,
				travellerResponse,
				countryResponse
			]).then((values) => {
			});
		} catch (error) {
			console.log(error);
		}
	});

	componentWillUnmount() {
		this.willFocusSubscription.remove();
	}


	componentDidUpdate() {}

	updateSearch = (search) => {
		this.setState({
			search
		});
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
			countryID: country.countryID
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
		<ItineraryHolder itinerary={item} key={item.itineraryId} onPress={() => this.onPressFamous(item)} type="main" />
	);

	renderPopular = ({ item }) => (
		<CountryHolder country={item} key={item.countryID} onPress={() => this.onPressCountry(item)} type="main" />
	);

	renderTraveller = ({ item }) => (
		<TravellerHolder traveller={item} key={item.userId} onPress={() => this.onPressTraveller(item)} type="main" />
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
						{this.state.showCancel && <Text style={styles.cancelSearchBarText}>Cancel</Text>}
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
					data={this.props.itinerary.itineraries.slice(0, 8)} //render first 8 itineraries
					type="carousel"
					keyExtractor={this._keyExtractor_Itinerary}
					renderHolder={this.renderFamousPlaces}
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
					data={countries}
					keyExtractor={this._keyExtractor_Country}
					renderHolder={this.renderPopular}
				>
					<Text style={styles.smallSectionTitle}>{Languages.TrendingCountries}</Text>
				</Section>
				<Section
					containerStyle={[ styles.sectionContainer, { paddingBottom: 50 } ]}
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
						<Search navigation={this.props.navigation} />
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
	getCountryList
})(Home);
