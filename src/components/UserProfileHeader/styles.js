import { StyleSheet, Platform, Dimensions } from 'react-native';
import { Color, Config, Constants, Device, Styles } from '@common';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
	container: {
		paddingVertical: 30,
		borderBottomLeftRadius: 6,
		borderBottomRightRadius: 6,
		flex: 1
	},
	header: {
		...Styles.Common.ColumnCenter,
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
		flex: 2,
		alignItems: 'center',
		justifyContent: 'center',
		...Styles.Common.ColumnCenter
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
		fontFamily: 'Quicksand-Light'
	},
	bio: {
		fontSize: 14,
		color: Color.grey1,
		marginTop: 8,
		paddingHorizontal: 18,
		fontFamily: 'Quicksand-Medium'
	},
	bioMoreLess: {
		color: Color.lightGrey3,
		fontSize: 13,
		marginTop: 6,
		fontFamily: 'Quicksand-Medium'
	},
	editButton: {
		marginTop: 20,
		height: 40,
		borderRadius: 20,
		width: width / 2.3,
		alignItems: 'center',
		justifyContent: 'center',
		...Styles.Common.ShadowBox
	},
	editButtonText: {
		fontSize: 13,
		color: Color.primary,
		textAlign: 'center',
		fontFamily: 'Quicksand-Medium'
	},
	followButton: {
		marginTop: 20,
		height: 40,
		borderRadius: 20,
		width: width / 2.3,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Color.splashScreenBg5,
		...Styles.Common.ShadowBox
	},
	followButtonText: {
		fontSize: 13,
		color: Color.white,
		textAlign: 'center',
		fontFamily: 'Quicksand-Medium'
	},
	unFollowButton: {
		marginTop: 20,
		height: 40,
		borderRadius: 20,
		width: width / 2.3,
		alignItems: 'center',
		justifyContent: 'center',
		...Styles.Common.ShadowBox
	},
	unFollowButtonText: {
		fontSize: 13,
		color: Color.primary,
		textAlign: 'center',
		fontFamily: 'Quicksand-Medium'
	},
	headerColumn: {
		...Styles.Common.RowCenterAround,
		marginTop: 20,
		paddingHorizontal: 4
	}
});
