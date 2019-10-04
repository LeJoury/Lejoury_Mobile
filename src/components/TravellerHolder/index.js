import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { createImageProgress } from 'react-native-image-progress';

import styles from './styles';

const LoadImage = createImageProgress(FastImage);

const TravellerHolder = ({ traveller, onPress }) => (
	<TouchableOpacity style={styles.container} onPress={onPress}>
		<View style={styles.imageWrapper}>
			<LoadImage
				source={{
					uri: traveller.thumbnails
					// cache: 'only-if-cached'
				}}
				style={styles.travellerImage}
				resizeMode={FastImage.resizeMode.cover}
			/>
		</View>
		<Text style={styles.travellerNameStyle}>{traveller.travellerName}</Text>
	</TouchableOpacity>
);

export default TravellerHolder;
