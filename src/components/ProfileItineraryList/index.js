import React, { useState, useEffect } from 'react';
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

const ProfileItineraryList = (props) => {
	const { itineraries } = props;

	const _keyExtractor = (item, index) => item.itineraryId.toString();

	const onPressItinerary = (itinerary) => {
		props.navigation.navigate('ItineraryDetails', {
			itinerary: itinerary
		});
	};

	const renderItem = ({ item }) => {
		return (
			<ItineraryHolder
				itinerary={item}
				key={item.itineraryId.toString()}
				onPress={(itinerary) => onPressItinerary(itinerary)}
				type="profile"
			/>
		);
	};

	return (
		<FlatList
			data={itineraries}
			keyExtractor={_keyExtractor}
			renderItem={renderItem}
		/>
	);
};

export default ProfileItineraryList;