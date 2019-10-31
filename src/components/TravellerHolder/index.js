import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { createImageProgress } from 'react-native-image-progress';

import styles from './styles';

import { Images, Color, Languages } from '@common';

const LoadImage = createImageProgress(FastImage);

const TravellerHolder = ({ traveller, onPress }) => (
	<TouchableOpacity style={styles.container} onPress={onPress}>
		<View style={styles.imageWrapper}>
			<LoadImage
				source={traveller.photo ? { uri: traveller.photo } : Images.defaultAvatar}
				style={styles.travellerImage}
				resizeMode={FastImage.resizeMode.cover}
			/>
		</View>
		<Text style={styles.travellerNameStyle}>{traveller.username}</Text>
	</TouchableOpacity>
);

export default TravellerHolder;
