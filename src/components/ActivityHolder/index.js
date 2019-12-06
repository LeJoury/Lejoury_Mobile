import React from 'react';
import {
	View,
	Text,
	Dimensions,
	TouchableOpacity,
	TouchableNativeFeedback,
	Image,
	ActivityIndicator,
	Platform
} from 'react-native';
import Swiper from 'react-native-swiper';
import StarRating from 'react-native-star-rating';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-elements';

import { Color, Languages, Styles } from '@common';
import { Bookmark } from '@components';
const { width, height } = Dimensions.get('window');

import styles from './styles';

const Touchable = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;

const ActivityHolder = ({ index, name, photos, description, currency, budget, rate = 4, onPress, onRemove }) => {
	return (
		<View style={styles.container}>
			<Touchable onPress={() => onPress(index)} activeOpacity={0.8}>
				<View>
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
								<Touchable onPress={() => onRemove(index)} activeOpacity={0.8}>
									<View style={{ paddingHorizontal: 6 }}>
										<Icon
											name="trash-2"
											type="feather"
											size={Styles.IconSize.Medium}
											color={Color.lightGrey2}
										/>
									</View>
								</Touchable>
							</View>
						</LinearGradient>
					</View>
					<View style={styles.contentContainer}>
						{description === '' ? (
							<Text style={styles.activityDescription}>{Languages.AddDescription}</Text>
						) : (
							<Text style={styles.activityDescription} numberOfLines={3} ellipsizeMode={'tail'}>
								{description}
							</Text>
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
				</View>
			</Touchable>
		</View>
	);
};

const BookmarkActivityHolder = ({ activity, onPress = undefined, onBookmark = undefined }) => {
	return (
		<View style={[ styles.bookmarkContainer, { margin: 12 } ]}>
			<Touchable onPress={() => onPress(activity)} activeOpacity={0.8}>
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
			</Touchable>
		</View>
	);
};

export { ActivityHolder, BookmarkActivityHolder };
