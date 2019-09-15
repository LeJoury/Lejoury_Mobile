import React, { Component } from 'react';
import { View, Text, Dimensions, FlatList } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import { ItineraryHolder } from '@components';
import { Languages } from '@common';

import styles from './styles';

const { width, height } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * width) / 100;
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

	_keyExtractor = (item, index) => item.itineraryId;

	componentDidMount() {}

	componentDidUpdate() {}

	componentWillUnmount() {}

	onPressItinerary = (itinerary) => {
		// updater functions are preferred for transactional updates
		this.props.navigation.navigate('ProfileItineraryDetails', {
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

	_renderItem = ({ item }) => (
		<ItineraryHolder itinerary={item} key={item.itineraryId} onPress={() => this.onPressItinerary(item)} />
	);

	_renderEmpty = () => <Text>{Languages.Empty}</Text>;

	render() {
		const { itineraries, type } = this.props;

		return type === 'flatlist' ? (
			<FlatList
				data={itineraries}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				keyExtractor={this._keyExtractor}
				renderItem={this._renderItem}
				ListEmptyComponent={this._renderEmpty}
			/>
		) : (
			<Carousel
				data={itineraries}
				layout={'default'}
				keyExtractor={this._keyExtractor}
				renderItem={this._renderItem}
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
