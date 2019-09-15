import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import { Images } from '@common';

import styles from './styles';

const TravellerHolder = ({ traveller, onPress }) => (
	<TouchableOpacity style={styles.container} onPress={onPress}>
		<View style={styles.imageWrapper}>
			<Image
				source={{
					uri: traveller.thumbnails
					// cache: 'only-if-cached'
				}}
				style={styles.travellerImage}
				resizeMode={'cover'}
			/>
		</View>
		<Text style={styles.travellerNameStyle}>{traveller.travellerName}</Text>
	</TouchableOpacity>
);

export default TravellerHolder;
