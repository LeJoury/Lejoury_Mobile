import React, { Component } from 'react';
import { View, Text, Dimensions, FlatList } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import { ItineraryHolder } from '@components';
import { Languages, Color } from '@common';

import styles from './styles';

const { width, height } = Dimensions.get('window');

function wp(percentage) {
	const value = percentage * width / 100;
	return Math.round(value);
}

const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = width;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

class ItineraryList extends Component {
	//constructor(props) {
	//super (props)
	//}

	_keyExtractor = (item, index) => item.itineraryID;

	componentDidMount() {}

	componentDidUpdate() {}

	componentWillUnmount() {}

	onPressItinerary = (itinerary) => {
		// updater functions are preferred for transactional updates
		this.props.navigation.navigate('ProfileItineraryDetails', {
			itinerary
		});
	};

	onPressCountryItinerary = (itinerary) => {
		this.props.navigation.navigate('ItineraryDetails', {
			itinerary
		});
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

	renderItem = ({ item }) => (
		<ItineraryHolder itinerary={item} key={item.itineraryID} onPress={() => this.onPressItinerary(item)} />
	);

	renderItineraryBasedOnCountry = ({ item }) => (
		<ItineraryHolder
			itinerary={item}
			key={item.itineraryID}
			onPress={() => this.onPressCountryItinerary(item)}
			type="country"
		/>
	);

	renderSeparator = () => <View style={styles.separatorRow} />;

	renderEmpty = () => <Text>{Languages.Empty}</Text>;

	render() {
		const { itineraries, type } = this.props;

		return type === 'flatlist' ? (
			<FlatList
				data={itineraries}
				style={{ paddingTop: 6 }}
				keyExtractor={this._keyExtractor}
				ItemSeparatorComponent={this.renderSeparator}
				renderItem={this.renderItineraryBasedOnCountry}
				ListEmptyComponent={this.renderEmpty}
			/>
		) : (
			<Carousel
				data={itineraries}
				layout={'default'}
				keyExtractor={this._keyExtractor}
				renderItem={this.renderItem}
				sliderWidth={sliderWidth}
				itemWidth={itemWidth}
				enableMomentum={true}
				activeSlideAlignment={'start'}
				inactiveSlideScale={0.9}
				inactiveSlideOpacity={0.5}
			/>
		);
	}
}
export default ItineraryList;
