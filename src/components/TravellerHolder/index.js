import React from 'react';
import { View, Text, TouchableOpacity, Platform, TouchableNativeFeedback } from 'react-native';
import FastImage from 'react-native-fast-image';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import { createImageProgress } from 'react-native-image-progress';

import styles from './styles';

import { Images, Color, Languages } from '@common';

const LoadImage = createImageProgress(FastImage);

const Touchable = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;

const TravellerHolder = ({ traveller, onPress }) => {
	if (traveller.loading) {
		return (
			<View style={styles.container}>
				<ShimmerPlaceHolder
					colorShimmer={[ Color.lightGrey2, Color.lightGrey4, Color.lightGrey6 ]}
					autoRun={true}
					style={styles.imageWrapper}
				/>
				<ShimmerPlaceHolder
					colorShimmer={[ Color.lightGrey2, Color.lightGrey4, Color.lightGrey6 ]}
					autoRun={true}
					style={styles.shimmeringNameStyle}
				/>
			</View>
		);
	}

	return (
		<Touchable onPress={onPress} activeOpacity={0.8}>
			<View style={styles.container}>
				<View style={styles.imageWrapper}>
					<LoadImage
						source={traveller.photo ? { uri: traveller.photo } : Images.defaultAvatar}
						style={styles.travellerImage}
						resizeMode={FastImage.resizeMode.cover}
					/>
				</View>
				<Text style={styles.travellerNameStyle}>{traveller.username}</Text>
			</View>
		</Touchable>
	);
};

export default TravellerHolder;
