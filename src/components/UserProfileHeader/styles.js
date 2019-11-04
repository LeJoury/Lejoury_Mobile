import { StyleSheet, Platform, Dimensions } from 'react-native';
import { Color, Config, Constants, Device, Styles } from '@common';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
	container: {
		paddingTop: 30,
		paddingBottom: 16,
		borderBottomLeftRadius: 6,
		borderBottomRightRadius: 6,
		flex: 1
	},
	header: {
		padding: 16,
		paddingBottom: 20,
		marginHorizontal: 32,
		marginTop: 50,
		borderRadius: 6,
		backgroundColor: Color.white,
		...Styles.Common.ShadowBox,
		shadowColor: Color.black20T
	},
	avatarWrapper: {
		flex: 1,
		marginTop: -60,
		alignItems: 'center',
		justifyContent: 'center',
		...Styles.Common.ShadowBox,
		shadowOpacity: 0.2,
		shadowRadius: 3,
		shadowOffset: { width: 0, height: 3 }
	},
	avatar: {
		height: width / 3.5,
		width: width / 3.5,
		borderRadius: width / 3.5 / 2
	},
	userInfoWrapper: {
		flex: 2
	},
	textContainer: {
		justifyContent: 'center',
		marginTop: 12
	},
	fullName: {
		color: Color.darkGrey2,
		fontSize: 28,
		textAlign: 'center',
		fontFamily: 'Quicksand-Bold'
	},
	name: {
		color: Color.darkGrey3,
		fontSize: 12,
		textAlign: 'center',
		marginTop: 4,
		fontFamily: 'Quicksand-Regular'
	},
	bioContainer: {
		flex: 1,
		justifyContent: 'flex-start',
		paddingHorizontal: 32,
		paddingBottom: 16
	},
	bioAbout: {
		marginBottom: 6,
		fontSize: 15,
		color: Color.darkGrey2,
		fontFamily: 'Quicksand-Medium'
	},
	bio: {
		fontSize: 14,
		color: Color.grey1,
		fontFamily: 'Quicksand-Regular'
	},
	bioMoreLess: {
		color: Color.lightGrey3,
		fontSize: 13,
		marginTop: 6,
		fontFamily: 'Quicksand-Medium'
	},
	buttonWrapper: {
		justifyContent: 'center',
		marginTop: 20,
		alignItems: 'center'
	},
	editButtonWrapper: {
		position: 'absolute',
		top: 12,
		right: 12
	},
	editButton: {
		borderRadius: 6,
		backgroundColor: Color.white,
		borderColor: Color.lightGrey4,
		borderWidth: 1
	},
	editButtonText: {
		fontSize: 12,
		color: Color.darkGrey3,
		textAlign: 'center',
		fontFamily: 'Quicksand-Medium'
	},
	followButton: {
		borderRadius: 20,
		flex: 1,
		width: width / 2,
		paddingVertical: 8,
		paddingHorizontal: 32,
		borderColor: Color.lightGrey3,
		borderWidth: 1
	},
	followButtonText: {
		fontSize: 13,
		color: Color.grey3,
		textAlign: 'center',
		fontFamily: 'Quicksand-Medium'
	},
	followingButton: {
		borderRadius: 20,
		flex: 1,
		width: width / 2,
		paddingVertical: 8,
		paddingHorizontal: 32,
		backgroundColor: Color.splashScreenBg3,
		borderColor: Color.splashScreenBg3,
		borderWidth: 1,
		...Styles.Common.ShadowBox
	},
	followingButtonText: {
		fontSize: 13,
		color: Color.white,
		textAlign: 'center',
		fontFamily: 'Quicksand-Medium'
	},
	headerColumn: {
		...Styles.Common.RowCenterBetween,
		marginTop: 16,
		paddingHorizontal: 8
	}
});
