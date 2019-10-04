import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { Icon, Card } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import { createImageProgress } from 'react-native-image-progress';

import { Images, Color, Languages, Styles } from '@common';
import { Button, TravellerInfoHolder } from '@components';

import styles from './styles';

const LoadImage = createImageProgress(FastImage);

const ItineraryHolder = ({ itinerary, type, user = undefined, onPress = undefined, onRemovePress = undefined }) => {
	if (type === 'main') {
		return <MainItinerary itinerary={itinerary} onPress={onPress} />;
	} else if (type === 'draft') {
		return <DraftItinerary itinerary={itinerary} onPress={onPress} onRemovePress={onRemovePress} />;
	} else if (type === 'emptyDraft') {
		return <EmptyDraftItinerary onPress={onPress} />;
	} else if (type === 'country') {
		return <CountryItinerary itinerary={itinerary} onPress={onPress} />;
	} else {
		return <ProfileItinerary itinerary={itinerary} onPress={onPress} />;
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
		<TouchableOpacity onPress={() => onPress()} style={{ marginHorizontal: 12, marginVertical: 8 }}>
			<Card containerStyle={[ styles.draft_CardContainer, mainContainer ]}>
				<ImageBackground source={Images.defaultDraftItineraryBackground} style={styles.draft_BgImageContainer}>
					<View style={[ styles.draft_DefaultImageBg, Styles.Common.ColumnCenter ]}>
						<Text style={[ styles.draft_ItineraryTitleText, textStyle ]}>{Languages.AddItinerary}</Text>

						<View style={[ { flex: 1, marginTop: 42 } ]}>
							<TouchableOpacity onPress={() => onPress()}>
								<Icon name="plus" size={Styles.IconSize.CenterView2} type="feather" color={color} />
							</TouchableOpacity>
						</View>
					</View>
				</ImageBackground>
			</Card>
		</TouchableOpacity>
	);
};

const DraftItinerary = ({ itinerary, onPress, onRemovePress }) => {
	const hasImage = itinerary.coverPhoto !== null && itinerary.coverPhoto !== '';

	const mainContainer = hasImage ? { borderWidth: 0 } : { borderColor: Color.primary };
	const imageSource = hasImage ? { uri: itinerary.coverPhoto } : Images.defaultDraftItineraryBackground;
	const imageBgStyle = hasImage ? styles.draft_ImageBg : styles.draft_DefaultImageBg;
	const textColor = hasImage ? Color.white : Color.primary;

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
		<TouchableOpacity onPress={() => onPress(itinerary)} style={{ margin: 8 }}>
			<Card containerStyle={[ styles.draft_CardContainer, mainContainer ]}>
				<ImageBackground source={imageSource} style={styles.draft_BgImageContainer}>
					<View style={imageBgStyle}>
						<View style={styles.draft_SubContain}>
							<View style={styles.draft_RowWrapper}>
								<Text style={[ styles.draft_ItineraryTitleText, { color: textColor } ]}>
									{itinerary.itineraryName}
								</Text>
							</View>
							<View style={styles.draft_DateRowWrapper}>
								<Text style={[ styles.draft_DateText, { color: textColor } ]}>
									{itinerary.startDate} - {itinerary.endDate}
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
					<TouchableOpacity
						style={styles.draft_RemoveIconStyle}
						onPress={() => onRemovePress(itinerary.itineraryID)}
					>
						<Icon name="trash-2" type="feather" size={Styles.IconSize.Medium} color={textColor} />
					</TouchableOpacity>
				</ImageBackground>
			</Card>
		</TouchableOpacity>
	);
};

const MainItinerary = ({ itinerary, onPress }) => (
	<View style={styles.main_Card}>
		<TouchableOpacity onPress={() => onPress(itinerary)}>
			<LoadImage
				source={{
					uri: itinerary.coverPhoto,
					priority: FastImage.priority.high
				}}
				style={styles.main_Image}
				resizeMode={FastImage.resizeMode.cover}
			/>
		</TouchableOpacity>
		<TravellerInfoHolder itinerary={itinerary} traveller={itinerary.traveller} />
	</View>
);

const ProfileItinerary = ({ itinerary, onPress }) => (
	<Card containerStyle={styles.profile_Card}>
		<TouchableOpacity onPress={() => onPress(itinerary)}>
			<ImageBackground source={itinerary.coverPhoto} style={styles.profile_ImageBackground} resizeMode="stretch">
				<LinearGradient
					style={styles.profile_ItineraryContainer}
					colors={[ Color.transparent1, Color.black50T, Color.black50T, Color.black90T, Color.black ]}
				>
					<Text style={styles.profile_TitleItinerary} numberOfLines={1} ellipsizeMode={'tail'}>
						{itinerary.itineraryName}
					</Text>
					<View style={styles.profile_UserContainer}>
						<Text style={styles.profile_DateText}>
							{itinerary.dateStart} - {itinerary.dateEnd}
						</Text>
					</View>
				</LinearGradient>
			</ImageBackground>
		</TouchableOpacity>
	</Card>
);

const CountryItinerary = ({ itinerary, onPress }) => (
	<TouchableOpacity style={styles.countryRow} onPress={() => onPress(itinerary)}>
		<View style={styles.countryImageContainer}>
			<LoadImage
				source={{
					uri: itinerary.coverPhoto,
					priority: FastImage.priority.high
					// cache: 'only-if-cached'
				}}
				style={styles.countryImage}
				resizeMode={FastImage.resizeMode.cover}
			/>
		</View>
		<View style={styles.countryTravellerContainer}>
			<Text style={styles.countryItineraryNameTextStyle}>{itinerary.itineraryName}</Text>
			<Text style={styles.countryItineraryTravellerNameTextStyle}>{itinerary.traveller.username}</Text>
		</View>
		<View style={styles.countryIconContainer}>
			<Icon color={Color.lightGrey4} type="feather" size={22} name="more-vertical" />
		</View>
	</TouchableOpacity>
);

export default ItineraryHolder;
