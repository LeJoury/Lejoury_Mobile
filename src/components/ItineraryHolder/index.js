import React from 'react';
import { View, Text, ImageBackground, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { Icon, Card } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

import { Images, Color, Languages, Styles } from '@common';
import { ButtonIndex, TravellerInfoHolder } from '@components';

import styles from './styles';

const ItineraryHolder = ({ itinerary, type, user = undefined, onPress = undefined, onRemovePress = undefined }) => {
	if (type === 'main') {
		return <MainItinerary itinerary={itinerary} onPress={onPress} />;
	} else if (type == 'draft') {
		return <DraftItinerary itinerary={itinerary} onPress={onPress} onRemovePress={onRemovePress} />;
	} else if (type == 'emptyDraft') {
		return <EmptyDraftItinerary onPress={onPress} />;
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
	const textColor = hasImage ? { color: Color.white } : { color: Color.primary };
	const buttonBorderColor = hasImage ? { borderColor: Color.white } : { borderColor: Color.primary };
	const buttonBackground = hasImage ? { backgroundColor: Color.transparent } : { backgroundColor: Color.white };

	const color = hasImage ? Color.white : Color.primary;

	return (
		<TouchableOpacity onPress={() => onPress(itinerary)} style={{ margin: 8 }}>
			<Card containerStyle={[ styles.draft_CardContainer, mainContainer ]}>
				<ImageBackground source={imageSource} style={styles.draft_BgImageContainer}>
					<View style={imageBgStyle}>
						<View style={styles.draft_SubContain}>
							<View style={styles.draft_RowWrapper}>
								<Text style={[ styles.draft_ItineraryTitleText, textColor ]}>
									{itinerary.itineraryName}
								</Text>
							</View>
							<View style={styles.draft_DateRowWrapper}>
								<Text style={[ styles.draft_DateText, textColor ]}>
									{itinerary.startDate} - {itinerary.endDate}
								</Text>
							</View>
							<ButtonIndex
								text={Languages.Edit}
								textColor={color}
								textStyle={[ styles.draft_EditButtonText, textColor ]}
								containerStyle={[ styles.draft_EditButton, buttonBorderColor, buttonBackground ]}
								onPress={() => onPress(itinerary)}
							/>
						</View>
					</View>
					<TouchableOpacity
						style={styles.draft_RemoveIconStyle}
						onPress={() => onRemovePress(itinerary.itineraryID)}
					>
						<Icon name="trash-2" type="feather" size={Styles.IconSize.Medium} color={color} />
					</TouchableOpacity>
				</ImageBackground>
			</Card>
		</TouchableOpacity>
	);
};

const MainItinerary = ({ itinerary, onPress }) => (
	<TouchableOpacity style={styles.main_Card} onPress={() => onPress(itinerary)}>
		<Image
			source={{
				uri: itinerary.coverPhoto,
				// cache: 'only-if-cached'
			}}
			style={styles.main_Image}
			resizeMode="cover"
		/>
		<TravellerInfoHolder itinerary={itinerary} traveller={itinerary.traveller} />
	</TouchableOpacity>
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

export default ItineraryHolder;
