import React from 'react';
import { View, Text, Animated, TouchableWithoutFeedback, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import { createImageProgress } from 'react-native-image-progress';

import Heart from '../Heart';
import { Images, Styles, getCountry, getCountryEmoji } from '@common';

import styles from './styles';

const TravellerInfo = ({
	itinerary,
	traveller,
	mainContainer = undefined,
	contentContainer = undefined,
	countryTextSize = 16,
	titleTextSize = 13,
	travellerPicSize = 20,
	travellerNameSize = 14,
	heartIconSize = undefined,
	travellerWrapperMarginTop = 10,
	onLikePress = undefined
}) => {
	const avatar = traveller && traveller.profilePicture ? { uri: traveller.profilePicture } : Images.defaultAvatar;

	return (
		<Animated.View style={[ Styles.Common.ColumnCenter, mainContainer ]}>
			<Animated.View style={[ styles.main_contentContainer, contentContainer ]}>
				{itinerary.country && itinerary.country.length > 0 &&
					itinerary.country.map((country, index) => {
						return (
							<Text key={index} style={[ styles.main_Country, { fontSize: countryTextSize } ]} numberOfLines={1}>
								{getCountryEmoji(country.alpha2)}
							</Text>
						);
					})}
				<Text style={[ styles.main_Title, { fontSize: titleTextSize } ]} numberOfLines={1}>
					{itinerary.title}
				</Text>
				<View style={styles.separator} />
				<View style={[ styles.main_UserProfileWrapper, { marginTop: travellerWrapperMarginTop } ]}>
					<View style={Styles.Common.RowCenterRight}>
						<Heart heartIconSize={heartIconSize} liked={itinerary.liked} onPress={() => onLikePress()} />
						<Text style={[ styles.noOfLikesText, { fontSize: titleTextSize } ]}>
							{itinerary.totalLikes}
						</Text>
					</View>
					<TouchableWithoutFeedback style={Styles.Common.RowCenterRight}>
						<View style={Styles.Common.RowCenterRight}>
							<View style={[ styles.main_UserProfilePicture ]}>
								<Image
									source={avatar}
									style={[
										styles.main_UserProfilePicture,
										{ width: travellerPicSize, height: travellerPicSize }
									]}
								/>
							</View>
							<Text style={[ styles.main_UserProfileName, { fontSize: travellerNameSize } ]}>
								{traveller.username}
							</Text>
						</View>
					</TouchableWithoutFeedback>
				</View>
			</Animated.View>
		</Animated.View>
	);
};
export default TravellerInfo;
