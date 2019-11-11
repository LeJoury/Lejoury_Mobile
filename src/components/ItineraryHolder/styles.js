import { StyleSheet, Platform, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import { Color, Constants, Device, Styles } from '@common';

export default StyleSheet.create({
	//profile
	profile_Card: {
		padding: 0,
		marginBottom: 10,
		borderRadius: 10,
		borderWidth: 0,
		flex: 1,
		...Styles.Common.ShadowBox
	},
	profile_ImageBackground: {
		width: undefined,
		height: 240,
		alignSelf: 'stretch',
		borderRadius: 5,
		overflow: 'hidden'
	},
	profile_ContentWrapper: {
		...Styles.Common.RowBetween,
		paddingHorizontal: 16,
		paddingBottom: 14
	},
	profile_DetailsContainer: {
		justifyContent: 'flex-start',
		alignItems: 'flex-start'
	},
	profile_LikesContainer: {
		...Styles.Common.RowCenterRight,
		paddingLeft: 4,
		paddingTop: 4
	},
	profile_noOfLikesText: {
		marginLeft: 8,
		fontSize: 14,
		color: Color.white,
		fontFamily: 'Quicksand-Medium'
	},
	profile_ItineraryContainer: {
		flex: 1,
		justifyContent: 'flex-end',
		width: '100%'
	},
	profile_TitleItinerary: {
		color: Color.white,
		paddingTop: 8,
		fontSize: 22,
		fontFamily: 'Quicksand-Bold'
	},
	profile_QuoteItinerary: {
		color: Color.white,
		marginVertical: 4,
		fontSize: 14,
		fontStyle: 'italic',
		fontWeight: '300'
	},
	profile_ReadMoreContainer: {
		...Styles.Common.ColumnCenterRight,
		justifyContent: 'flex-end'
	},
	profile_ItinerarySettings: {
		position: 'absolute',
		right: 0,
		top: 0,
		padding: 8,
	},

	//draft:
	draft_CardContainer: {
		borderRadius: 8,
		padding: 0,
		margin: 8,
		borderWidth: 1,
		borderColor: Color.primary,
		borderStyle: 'dashed',
		...Styles.Common.ShadowBox
	},
	draft_BgImageContainer: {
		width: '100%',
		aspectRatio: 1,
		borderRadius: 8,
		overflow: 'hidden',
		opacity: 0.8
	},
	draft_SubContain: {
		flex: 1,
		paddingVertical: 10,
		paddingHorizontal: 16,
		justifyContent: 'center',
		alignItems: 'center'
	},
	draft_RowWrapper: {
		...Styles.Common.RowCenterBetween
	},
	draft_DateRowWrapper: {
		...Styles.Common.RowCenterLeft,
		marginTop: 4
	},
	draft_ItineraryTitleText: {
		fontSize: 24,
		color: Color.white,
		fontFamily: 'Quicksand-Bold'
	},
	draft_DateText: {
		fontSize: 13,
		color: Color.white,
		fontFamily: 'Quicksand-Medium'
	},
	draft_DefaultImageBg: {
		width: '100%',
		aspectRatio: 1,
		borderRadius: 8
	},
	draft_ImageBg: {
		width: '100%',
		aspectRatio: 1,
		backgroundColor: Color.black40T,
		borderRadius: 8
	},
	draft_RemoveIconStyle: {
		position: 'absolute',
		top: 15,
		right: 15
	},
	draft_EditButton: {
		height: 40,
		marginTop: 16,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: Color.white,
		width: width / 2.3,
		alignItems: 'center',
		justifyContent: 'center'
	},
	draft_EditButtonText: {
		fontSize: 14,
		color: Color.white,
		textAlign: 'center',
		fontFamily: 'Quicksand-Medium'
	},
	//main
	main_Card: {
		paddingBottom: 5,
		margin: 12,
		...Styles.Common.ShadowBox
	},
	main_Image: {
		width: undefined,
		flex: 1,
		height: undefined,
		alignSelf: 'stretch',
		aspectRatio: 1,
		borderRadius: 10,
		overflow: 'hidden'
	},
	countryRow: {
		flexDirection: 'row',
		flex: 1,
		margin: 8,
		backgroundColor: Color.white
	},
	countryImageContainer: {
		flex: 1
	},
	countryIconContainer: {
		flex: 1,
		alignItems: 'flex-end',
		justifyContent: 'center'
	},
	countryImage: {
		width: '100%',
		aspectRatio: 1
	},
	countryTravellerContainer: {
		flex: 3,
		paddingHorizontal: 12
	},
	countryItineraryNameTextStyle: {
		fontSize: 16,
		color: Color.primary,
		fontFamily: 'Quicksand-Bold'
	},
	countryItineraryTravellerNameTextStyle: {
		fontSize: 14,
		color: Color.lightGrey3,
		fontFamily: 'Quicksand-Medium'
	}
});
