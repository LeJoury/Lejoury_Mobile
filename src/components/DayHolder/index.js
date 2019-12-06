import React from 'react';
import { View, Text, ActivityIndicator, Dimensions, Image } from 'react-native';
import { Card } from 'react-native-elements';

import { Color, Languages } from '@common';
import styles from './styles';

const DayHolder = ({ day, activity, dayNo, date, type = 'main', onPress = undefined }) => {
	if (type === 'draft') {
		return <DraftItineraryDay activity={activity} />;
	}
};

const DraftItineraryDay = ({ activity }) => {
	return (
		<Card containerStyle={styles.draftContainer}>
			{activity.photos.length > 0 ? (
				<Image
					source={{ uri: activity.photos[0].link ? activity.photos[0].link : activity.photos[0] }}
					style={styles.draftImageWrapper}
					// loadingIndicatorSource={<ActivityIndicator />}
				/>
			) : (
				<View style={styles.draftEmptyImageContainer}>
					<Text style={styles.draftEmptyImageDesc}>{Languages.ShareYourPhotos}</Text>
				</View>
			)}

			<View style={styles.wrapper}>
				<View style={styles.draftContentContainer}>
					<Text style={styles.draftActivityText} numberOfLines={1}>
						{activity.title}
					</Text>

					{activity.description === '' ? (
						<Text style={styles.draftDescription}>{Languages.AddDescription}</Text>
					) : (
						<Text style={styles.draftDescription} numberOfLines={2} ellipsizeMode={'tail'}>
							{activity.description}
						</Text>
					)}
				</View>
			</View>
		</Card>
	);
};

export default DayHolder;
