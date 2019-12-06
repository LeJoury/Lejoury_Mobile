import React from 'react';
import { View, Text, TouchableOpacity, Platform, TouchableNativeFeedback } from 'react-native';
import { Card } from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

import { createImageProgress } from 'react-native-image-progress';
import { Color, getCountryEmoji } from '@common';

import styles from './styles';

const LoadImage = createImageProgress(FastImage);
const Touchable = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;

const CountryHolder = ({ country, onPress }) => {
	if (country.loading) {
		return (
			<ShimmerPlaceHolder
				autoRun={true}
				style={[ styles.container, { height: 130 } ]}
				colorShimmer={[ Color.lightGrey2, Color.lightGrey4, Color.lightGrey6 ]}
			/>
		);
	}
	return (
		<Touchable onPress={onPress} activeOpacity={0.8}>
			<View style={styles.container}>
				<View style={styles.imageWrapper}>
					<LoadImage
						source={{
							uri: country.link
							// cache: 'only-if-cached'
						}}
						style={styles.countryImage}
						resizeMode={FastImage.resizeMode.cover}
					/>
				</View>
				<View style={styles.detailContainer}>
					<Text style={styles.countryNameStyle} numberOfLines={1} ellipsizeMode={'tail'}>
						{country.name}
					</Text>
				</View>
			</View>
		</Touchable>
	);
};

export default CountryHolder;
