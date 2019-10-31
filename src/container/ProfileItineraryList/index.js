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

class ProfileItineraryList extends Component {
	//constructor(props) {
	//super (props)
	//}

	_keyExtractor = (item, index) => item.itineraryId.toString();

	componentDidMount() {}

	componentDidUpdate() {}

	componentWillUnmount() {}

	onPressItinerary = (itinerary) => {
		// updater functions are preferred for transactional updates
		this.props.navigation.navigate('ItineraryDetails', {
			itinerary: itinerary
		});
	};

	renderItem = ({ item }) => {
		return (
			<ItineraryHolder
				itinerary={item}
				key={item.itineraryId.toString()}
				onPress={(itinerary) => this.onPressItinerary(itinerary)}
				type="profile"
			/>
		);
	};

	renderSeparator = () => <View style={styles.separatorRow} />;

	render() {
		const { itineraries } = this.props;

		return (
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
export default ProfileItineraryList;
