import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image, Platform, TouchableNativeFeedback } from 'react-native';
import { Icon, Card } from 'react-native-elements';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import FastImage from 'react-native-fast-image';
import { createImageProgress } from 'react-native-image-progress';

import { Images, Color, Languages, Styles } from '@common';
import { Button, Heart } from '@components';

import styles from './styles';
const Touchable = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;

const LoadImage = createImageProgress(FastImage);
const travellerPicSize = 20;
const heartIconSize = 16;
const ItineraryHolder = ({
	itinerary,
	type,
	user = undefined,
	onPress = undefined,
	onRemovePress = undefined,
	isMe = false,
	onItineraryOptionPress = undefined
}) => {
	if (type === 'main') {
		return <MainItinerary itinerary={itinerary} onPress={onPress} />;
	} else if (type === 'draft') {
		return <DraftItinerary itinerary={itinerary} onPress={onPress} onRemovePress={onRemovePress} />;
	} else if (type === 'emptyDraft') {
		return <EmptyDraftItinerary onPress={onPress} />;
	} else if (type === 'country') {
		return <CountryItinerary itinerary={itinerary} onPress={onPress} />;
	} else {
		return (
			<ProfileItinerary
				itinerary={itinerary}
				onPress={onPress}
				isMe={isMe}
				onItineraryOptionPress={onItineraryOptionPress}
			/>
		);
	}
};

const EmptyDraftItinerary = ({ onPress }) => {
	const mainContainer = { borderColor: Color.primary };
	const textStyle = {
		color: Color.grey1,
		fontSize: 18,
		fontFamily: 'Quicksand-Medium',
		textAlign: 'center',
		marginTop: 32,
		width: '70%'
	};

	const color = Color.primary;

	return (
		<Touchable activeOpacity={0.8} onPress={() => onPress()}>
			<View style={{ marginHorizontal: 12, marginVertical: 8 }}>
				<Card containerStyle={[ styles.draft_CardContainer, mainContainer ]}>
					<ImageBackground
						source={Images.defaultDraftItineraryBackground}
						style={styles.draft_BgImageContainer}
					>
						<View style={[ styles.draft_DefaultImageBg, Styles.Common.ColumnCenter ]}>
							<Text style={[ styles.draft_ItineraryTitleText, textStyle ]}>{Languages.AddItinerary}</Text>

							<View style={[ { flex: 1, marginTop: 42 } ]}>
								<Touchable onPress={() => onPress()}>
									<Icon name="plus" size={Styles.IconSize.CenterView2} type="feather" color={color} />
								</Touchable>
							</View>
						</View>
					</ImageBackground>
				</Card>
			</View>
		</Touchable>
	);
};

const DraftItinerary = ({ itinerary, onPress, onRemovePress }) => {
	const hasImage = itinerary.coverPhoto !== null && itinerary.coverPhoto !== '';

	const mainContainer = hasImage ? { borderWidth: 0 } : { borderColor: Color.primary };
	const imageSource = hasImage ? { uri: itinerary.coverPhoto } : Images.defaultDraftItineraryBackground;
	const imageBgStyle = hasImage ? styles.draft_ImageBg : styles.draft_DefaultImageBg;
	const textColor = hasImage ? Color.white : Color.primary;

	const startDate = moment(new Date(itinerary.startDate)).format('DD-MMM-YYYY');
	const endDate = moment(new Date(itinerary.endDate)).format('DD-MMM-YYYY');

	const buttonStyle = hasImage
		? {
				borderColor: Color.white,
				backgroundColor: Color.transparent
			}
		: {
				borderColor: Color.primary,
				backgroundColor: Color.white
			};

	return (
		<Touchable onPress={() => onPress(itinerary)} activeOpacity={0.8}>
			<View style={{ margin: 8 }}>
				<Card containerStyle={[ styles.draft_CardContainer, mainContainer ]}>
					<ImageBackground source={imageSource} style={styles.draft_BgImageContainer}>
						<View style={imageBgStyle}>
							<View style={styles.draft_SubContain}>
								<View style={styles.draft_RowWrapper}>
									<Text style={[ styles.draft_ItineraryTitleText, { color: textColor } ]}>
										{itinerary.title}
									</Text>
								</View>
								<View style={styles.draft_DateRowWrapper}>
									<Text style={[ styles.draft_DateText, { color: textColor } ]}>
										{startDate} - {endDate}
									</Text>
								</View>
								<Button
									text={Languages.Edit}
									textStyle={[ styles.draft_EditButtonText, { color: textColor } ]}
									containerStyle={[ styles.draft_EditButton, buttonStyle ]}
									onPress={() => onPress(itinerary)}
								/>
							</View>
						</View>
						<View style={styles.draft_RemoveIconStyle}>
							<Touchable onPress={() => onRemovePress(itinerary.itineraryId)}>
								<View>
									<Icon
										name="trash-2"
										type="feather"
										size={Styles.IconSize.Medium}
										color={textColor}
									/>
								</View>
							</Touchable>
						</View>
					</ImageBackground>
				</Card>
			</View>
		</Touchable>
	);
};

const MainItinerary = ({ itinerary, onPress }) => {
	const { traveller } = itinerary;
	const avatar = traveller && traveller.profilePicture ? { uri: traveller.profilePicture } : Images.defaultAvatar;

	if (itinerary.loading) {
		return (
			<View style={styles.shimmer_MainCard}>
				<ShimmerPlaceHolder
					colorShimmer={[ Color.lightGrey2, Color.lightGrey4, Color.lightGrey6 ]}
					style={styles.shimmer_ImageContainer}
					autoRun={true}
				/>
				<ShimmerPlaceHolder
					colorShimmer={[ Color.lightGrey2, Color.lightGrey4, Color.lightGrey6 ]}
					style={styles.shimmer_LongTextContainer}
					autoRun={true}
				/>
				<ShimmerPlaceHolder
					colorShimmer={[ Color.lightGrey2, Color.lightGrey4, Color.lightGrey6 ]}
					style={styles.shimmer_ShortTextContainer}
					autoRun={true}
				/>
			</View>
		);
	}
	return (
		<View style={styles.main_Card}>
			<Touchable onPress={() => onPress(itinerary)} activeOpacity={0.8}>
				<LoadImage
					source={{
						uri: itinerary.coverPhoto,
						priority: FastImage.priority.high
					}}
					style={styles.main_Image}
					resizeMode={FastImage.resizeMode.cover}
				>
					<View style={styles.main_FrontContainer}>
						<LinearGradient
							style={styles.main_TopContainer}
							colors={[ Color.black60T, Color.black40T, Color.black20T, Color.transparent1 ]}
						>
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
								<Text style={styles.main_TravellerNameStyle}>{itinerary.traveller.username}</Text>
							</View>
						</LinearGradient>
						<LinearGradient
							style={styles.main_BottomContainer}
							colors={[
								Color.transparent1,
								Color.black20T,
								Color.black40T,
								Color.black60T,
								Color.black80T
							]}
						>
							<View style={Styles.Common.RowCenterBetween}>
								<View style={{ flex: 0.7 }}>
									<Text
										style={styles.main_ItineraryTitleStyle}
										numberOfLines={2}
										ellipsizeMode={'tail'}
									>
										{itinerary.title}
									</Text>
									{itinerary.quote && (
										<Text
											style={styles.main_ItineraryQuoteStyle}
											numberOfLines={1}
											ellipsizeMode={'tail'}
										>
											{itinerary.quote}
										</Text>
									)}
								</View>
								<View style={[ Styles.Common.RowCenterRight, { flex: 0.3 } ]}>
									<Heart heartIconSize={heartIconSize} liked={itinerary.liked} color={Color.white} />
									<Text style={styles.main_noOfLikesText}>{itinerary.totalLikes}</Text>
								</View>
							</View>
						</LinearGradient>
					</View>
				</LoadImage>
			</Touchable>
		</View>
	);
};

const CountryItinerary = ({ itinerary, onPress }) => {
	const { traveller } = itinerary;
	const avatar = traveller && traveller.profilePicture ? { uri: traveller.profilePicture } : Images.defaultAvatar;

	if (itinerary.loading) {
		return (
			<View style={styles.shimmer_MainCard}>
				<ShimmerPlaceHolder
					colorShimmer={[ Color.lightGrey2, Color.lightGrey4, Color.lightGrey6 ]}
					style={styles.shimmer_ImageContainer}
					autoRun={true}
				/>
				<ShimmerPlaceHolder
					colorShimmer={[ Color.lightGrey2, Color.lightGrey4, Color.lightGrey6 ]}
					style={styles.shimmer_LongTextContainer}
					autoRun={true}
				/>
				<ShimmerPlaceHolder
					colorShimmer={[ Color.lightGrey2, Color.lightGrey4, Color.lightGrey6 ]}
					style={styles.shimmer_ShortTextContainer}
					autoRun={true}
				/>
			</View>
		);
	}
	return (
		<View style={[ styles.main_Card, { marginLeft: 0 } ]}>
			<Touchable onPress={() => onPress(itinerary)} activeOpacity={0.8}>
				<LoadImage
					source={{
						uri: itinerary.coverPhoto,
						priority: FastImage.priority.high
					}}
					style={styles.main_Image}
					resizeMode={FastImage.resizeMode.cover}
				>
					<View style={styles.main_FrontContainer}>
						<LinearGradient
							style={styles.main_TopContainer}
							colors={[ Color.black60T, Color.black40T, Color.black20T, Color.transparent1 ]}
						>
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
								<Text style={styles.main_TravellerNameStyle}>{itinerary.traveller.username}</Text>
							</View>
						</LinearGradient>
						<LinearGradient
							style={styles.main_BottomContainer}
							colors={[
								Color.transparent1,
								Color.black20T,
								Color.black40T,
								Color.black60T,
								Color.black80T
							]}
						>
							<View style={Styles.Common.RowCenterBetween}>
								<View style={{ flex: 0.7 }}>
									<Text
										style={styles.main_ItineraryTitleStyle}
										numberOfLines={2}
										ellipsizeMode={'tail'}
									>
										{itinerary.title}
									</Text>
									{itinerary.quote && (
										<Text
											style={styles.main_ItineraryQuoteStyle}
											numberOfLines={1}
											ellipsizeMode={'tail'}
										>
											{itinerary.quote}
										</Text>
									)}
								</View>
								<View style={[ Styles.Common.RowCenterRight, { flex: 0.3 } ]}>
									<Heart heartIconSize={heartIconSize} liked={itinerary.liked} color={Color.white} />
									<Text style={styles.main_noOfLikesText}>{itinerary.totalLikes}</Text>
								</View>
							</View>
						</LinearGradient>
					</View>
				</LoadImage>
			</Touchable>
		</View>
	);
};

const ProfileItinerary = ({ itinerary, onPress, isMe, onItineraryOptionPress }) => {
	return (
		<Touchable onPress={() => onPress(itinerary)} activeOpacity={0.8}>
			<Card containerStyle={styles.profile_Card} key={itinerary.itineraryId}>
				<ImageBackground
					source={{ uri: itinerary.coverPhoto }}
					style={styles.profile_ImageBackground}
					resizeMode="cover"
				>
					<LinearGradient
						style={styles.profile_ItineraryContainer}
						colors={[
							Color.transparent1,
							Color.transparent1,
							Color.transparent1,
							Color.transparent1,
							Color.transparent1,
							Color.black10T,
							Color.black30T,
							Color.black50T,
							Color.black70T
						]}
					>
						{isMe && (
							<View style={styles.profile_ItinerarySettings}>
								<Touchable onPress={() => onItineraryOptionPress(itinerary)}>
									<View>
										<Icon color={Color.lightGrey6} type="feather" size={22} name="more-vertical" />
									</View>
								</Touchable>
							</View>
						)}

						<View style={styles.profile_ContentWrapper}>
							<View style={styles.profile_DetailsContainer}>
								<Text style={styles.profile_TitleItinerary} numberOfLines={1} ellipsizeMode={'tail'}>
									{itinerary.title}
								</Text>
								{itinerary.quote !== '' &&
								itinerary.quote && (
									<Text
										style={styles.profile_QuoteItinerary}
										numberOfLines={2}
										ellipsizeMode={'tail'}
									>
										{itinerary.quote}
									</Text>
								)}

								<View style={styles.profile_LikesContainer}>
									<Heart
										heartIconSize={Styles.IconSize.Small}
										liked={itinerary.liked}
										disabled={true}
										color={Color.white}
									/>
									<Text style={styles.profile_noOfLikesText}>{itinerary.totalLikes}</Text>
								</View>
							</View>

							<View style={styles.profile_ReadMoreContainer}>
								<Icon color={Color.white} type="feather" size={22} name="arrow-right" />
							</View>
						</View>
					</LinearGradient>
				</ImageBackground>
			</Card>
		</Touchable>
	);
};

export default ItineraryHolder;
