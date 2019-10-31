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
		width: width / 1.3,
		...Styles.Common.ShadowBox
	},
	profile_ImageBackground: {
		width: undefined,
		flex: 1,
		height: undefined,
		alignSelf: 'stretch',
		aspectRatio: 1,
		borderRadius: 10,
		overflow: 'hidden'
	},
	profile_UserContainer: {
		...Styles.Common.RowCenterBetween,
		paddingHorizontal: 18,
		paddingBottom: 8
	},
	profile_DateText: {
		color: Color.white,
		fontSize: 14,
		fontFamily: 'Quicksand-Bold'
	},
	profile_noOfLikesText: {
		marginLeft: 8,
		fontSize: 14,
		color: Color.red1,
		fontFamily: 'Quicksand-Medium'
	},
	profile_ItineraryContainer: {
		flex: 1,
		position: 'absolute',
		width: '100%',
		bottom: 0
	},
	profile_TitleItinerary: {
		color: Color.white,
		paddingHorizontal: 12,
		paddingTop: 8,
		paddingBottom: 4,
		fontSize: 20,
		fontFamily: 'Quicksand-Bold'
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
