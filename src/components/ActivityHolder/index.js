import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Image, ActivityIndicator, Animated } from 'react-native';
import Swiper from 'react-native-swiper';
import StarRating from 'react-native-star-rating';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-elements';

import { Color, Languages, Styles } from '@common';
import { Bookmark } from '@components';
const { width, height } = Dimensions.get('window');

import styles from './styles';

const ActivityHolder = ({ index, name, photos, description, currency, budget, rate = 4, onPress, onRemove }) => {
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
										key={index.toString()}
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

const BookmarkActivityHolder = ({ activity, onPress = undefined, onBookmark = undefined }) => {
	const [ fadeAnim ] = useState(new Animated.Value(0)); // Initial value for opacity: 0

	useEffect(() => {
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 1000
		}).start();
	}, []);

	return (
		<Animated.View style={[ styles.bookmarkContainer, { opacity: fadeAnim, margin: 12 } ]}>
			<TouchableOpacity onPress={() => onPress(activity)}>
				<View style={styles.bookmarkImageContainer}>
					<Swiper
						style={styles.bookmarkImageWrapper}
						showsButtons={false}
						loop={false}
						activeDotColor={Color.white}
						loadMinimalLoader={<ActivityIndicator />}
						loadMinimal={true}
					>
						{activity.photos.map((photo, index) => {
							return (
								<Image
									key={index.toString()}
									source={{ uri: photo.link ? photo.link : photo }}
									style={styles.bookmarkImage}
									resizeMode="cover"
								/>
							);
						})}
					</Swiper>
					{/* <TouchableOpacity style={styles.bookmarkIconContainer} onPress={() => onBookmark(activity.id)}>
						<Bookmark isBookmark={activity.bookmarked} />
					</TouchableOpacity> */}
					<LinearGradient
						colors={[ Color.transparent1, Color.transparent1, Color.black30T, Color.black50T ]}
						style={styles.bookmarkGradientContainer}
					>
						<View style={styles.bookmarkRowContainer}>
							<Text style={styles.bookmarkActivityName} ellipsizeMode="tail" numberOfLines={1}>
								{activity.title}
							</Text>
							<View style={Styles.Common.RowCenterBetween}>
								<Text style={styles.bookmarkActivityDescription}>{activity.description}</Text>
								<View style={styles.bookmarkReadMoreContainer}>
									<Icon color={Color.white} type="feather" size={22} name="arrow-right" />
								</View>
							</View>
						</View>
					</LinearGradient>
				</View>
			</TouchableOpacity>
		</Animated.View>
	);
};

export { ActivityHolder, BookmarkActivityHolder };
