import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

import { createImageProgress } from 'react-native-image-progress';
import { Color, getCountryEmoji } from '@common';

import styles from './styles';

const LoadImage = createImageProgress(FastImage);

const CountryHolder = ({ country, onPress }) => (
	<Card containerStyle={styles.container}>
		<TouchableOpacity onPress={onPress}>
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
		</TouchableOpacity>
	</Card>
);

export default CountryHolder;
