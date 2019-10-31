import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Image, ActivityIndicator, Animated } from 'react-native';
import Swiper from 'react-native-swiper';
import StarRating from 'react-native-star-rating';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-elements';

import { Color, Languages, Styles } from '@common';
const { width, height } = Dimensions.get('window');

import styles from './styles';

const ActivityHolder = ({ index, name, photos, description, currency, budget, rate = 4, onPress, onRemove }) => {
	const [ imageIndex, setImageIndex ] = useState(0);
	const [ fadeAnim ] = useState(new Animated.Value(0)); // Initial value for opacity: 0

	useEffect(() => {
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 1000
		}).start();
	}, []);

	return (
		<Animated.View style={[ styles.container, { opacity: fadeAnim } ]}>
			<TouchableOpacity onPress={() => onPress(index)}>
				<View style={styles.imageContainer}>
					{photos.length > 0 ? (
						<Swiper
							style={styles.imageWrapper}
							showsButtons={false}
							loop={false}
							activeDotColor={Color.white}
							loadMinimalLoader={<ActivityIndicator />}
							loadMinimal={true}
						>
							{photos.map((photo, index) => {
								return (
									<Image
										source={{ uri: photo.link ? photo.link : photo }}
										style={styles.image}
										resizeMode="cover"
									/>
								);
							})}
						</Swiper>
					) : (
						<View style={styles.emptyImageContainer}>
							<Text style={styles.emptyImageDesc}>{Languages.ShareYourPhotos}</Text>
						</View>
					)}
					<LinearGradient
						colors={[ Color.black50T, Color.black30T, Color.transparent1, Color.transparent1 ]}
						style={styles.gradientContainer}
					>
						<View style={styles.rowContainer}>
							<Text style={styles.activityName} ellipsizeMode="tail" numberOfLines={1}>
								{name}
							</Text>
							<TouchableOpacity style={{ paddingHorizontal: 6 }} onPress={() => onRemove(index)}>
								<Icon
									name="trash-2"
									type="feather"
									size={Styles.IconSize.Medium}
									color={Color.lightGrey2}
								/>
							</TouchableOpacity>
						</View>
					</LinearGradient>
				</View>
				<View style={styles.contentContainer}>
					{description === '' ? (
						<Text style={styles.activityDescription}>{Languages.AddDescription}</Text>
					) : (
						<Text style={styles.activityDescription}>{description}</Text>
					)}

					<View style={[ Styles.Common.RowCenterBetween, { marginTop: 8 } ]}>
						{budget === '' ? (
							<Text style={styles.activityBudget}>{Languages.AddBudget}</Text>
						) : (
							<Text style={styles.activityBudget}>
								<Text style={{ fontFamily: 'Quicksand-Regular' }}>{Languages.Budget} : </Text>
								{currency} {budget}
							</Text>
						)}
						<StarRating
							maxStars={5}
							rating={rate}
							starSize={16}
							starStyle={styles.ratingStar}
							fullStarColor={Color.starYellow}
							disabled
						/>
					</View>
				</View>
			</TouchableOpacity>
		</Animated.View>
	);
};

export default ActivityHolder;
