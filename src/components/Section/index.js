import React from 'react';
import { View, Text, FlatList, Dimensions, Platform } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import { Languages } from '@common';

import styles from './styles';

const { width, height } = Dimensions.get('window');

function wp(percentage) {
	const value = percentage * width / 100;
	return Math.round(value);
}

const slideWidth = wp(75);
const itemHorizontalMargin = wp(4);

export const sliderWidth = width;
export const itemWidth = slideWidth + itemHorizontalMargin;

const Section = ({
	containerStyle,
	isHorizontalList = false,
	showHorizontalIndicator = false,
	data,
	keyExtractor,
	renderHolder,
	renderFooter = undefined,
	flatListStyle,
	holderWidth = itemWidth,
	type = 'flatlist',
	children,
	numColumns = undefined
}) => {
	return (
		<View style={containerStyle}>
			{children}
			{type === 'flatlist' ? (
				<FlatList
					contentContainerStyle={flatListStyle}
					horizontal={isHorizontalList}
					showsHorizontalScrollIndicator={showHorizontalIndicator}
					data={data}
					keyExtractor={keyExtractor}
					renderItem={renderHolder}
					numColumns={numColumns}
				/>
			) : (
				<Carousel
					data={data}
					layout={'default'}
					keyExtractor={keyExtractor}
					renderItem={renderHolder}
					sliderWidth={sliderWidth}
					itemWidth={holderWidth}
					enableMomentum={true}
					activeSlideAlignment={'start'}
					inactiveSlideScale={Platform.OS === 'ios' ? 0.9 : 1}
					inactiveSlideOpacity={Platform.OS === 'ios' ? 0.5 : 0.4}
					ListFooterComponent={renderFooter}
					contentContainerCustomStyle={renderFooter && { paddingRight: 100 }}
				/>
			)}
		</View>
	);
};
export default Section;
