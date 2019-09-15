import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Dimensions, Image } from 'react-native';
import Swiper from 'react-native-swiper';

import { Color, Languages } from '@common';
import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

const DayHolder = ({ day, activity, dayNo, date, type = 'main', onPress = undefined }) => {
	if (type === 'draft') {
		return <DraftItineraryDay activity={activity} />;
	}
};

const DraftItineraryDay = ({ activity }) => {
	return (
		<View style={styles.draftContainer}>
			<Image
				source={{ uri: activity.photos[0] }}
				style={styles.draftImageWrapper}
				// loadingIndicatorSource={<ActivityIndicator />}
			/>

			<View style={styles.wrapper}>
				<View style={styles.draftContentContainer}>
					<Text style={styles.draftActivityText}>{activity.title}</Text>

					{activity.description === '' ? (
						<Text style={styles.draftDescription}>{Languages.AddDescription}</Text>
					) : (
						<Text style={styles.draftDescription}>{activity.description}</Text>
					)}
				</View>
			</View>
		</View>
	);
};

export default DayHolder;
