import React from 'react';
import { View, Text, Animated, TouchableWithoutFeedback } from 'react-native';
import FastImage from 'react-native-fast-image';
import { createImageProgress } from 'react-native-image-progress';

import Heart from '../Heart';
import { Styles, getCountry } from '@common';

import styles from './styles';

const LoadImage = createImageProgress(FastImage);

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
	travellerWrapperMarginTop = 10
}) => (
	<Animated.View style={[ Styles.Common.ColumnCenter, mainContainer ]}>
		<Animated.View style={[ styles.main_contentContainer, contentContainer ]}>
			<Text style={[ styles.main_Country, { fontSize: countryTextSize } ]} numberOfLines={1}>
				{getCountry(itinerary.country)}
			</Text>
			<Text style={[ styles.main_Title, { fontSize: titleTextSize } ]} numberOfLines={1}>
				{itinerary.title}
			</Text>
			<View style={styles.separator} />
			<View style={[ styles.main_UserProfileWrapper, { marginTop: travellerWrapperMarginTop } ]}>
				<View style={Styles.Common.RowCenterRight}>
					<Heart heartIconSize={heartIconSize} isLike={false}/>
					<Text style={[ styles.noOfLikesText, { fontSize: titleTextSize } ]}>200</Text>
				</View>
				<TouchableWithoutFeedback style={Styles.Common.RowCenterRight}>
					<View style={Styles.Common.RowCenterRight}>
						<View style={[ styles.main_UserProfilePicture ]}>
							<LoadImage
								source={{
									uri: traveller.userProfilePicture
								}}
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
export default TravellerInfo;
