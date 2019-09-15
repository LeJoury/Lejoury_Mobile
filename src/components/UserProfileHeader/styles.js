import { StyleSheet, Platform, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import { Color, Config, Constants, Device, Styles } from '@common';

export default StyleSheet.create({
	container: {
		paddingBottom: 10
	},
	header: {
		...Styles.Common.RowCenterAround,
		flex: 1,
		paddingBottom: 6,
		paddingHorizontal: 6
	},
	avatarWrapper: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	avatar: {
		height: width / 3.5,
		width: width / 3.5,
		borderRadius: width / 3.5 / 2,
		borderWidth: 1,
		borderColor: Color.lightGrey1
	},
	userInfoWrapper: {
		flex: 2,
		alignItems: 'center',
		justifyContent: 'center',
		...Styles.Common.ColumnCenter
	},
	textContainer: {
		justifyContent: 'center',
		marginTop: 8
	},
	fullName: {
		color: Color.blackTextPrimary,
		fontSize: 28,
		textAlign: 'center',
		fontFamily: 'Quicksand-Bold'
	},
	bio: {
		fontSize: 14,
		color: Color.lightGrey3,
		textAlign: 'center',
		marginTop: 8,
		paddingHorizontal: 16,
		fontFamily: 'Quicksand-Medium'
	},
	followButton: {
		marginTop: 20,
		height: 40,
		borderRadius: 20,
		width: width / 2.3,
		shadowOffset: { width: 0, height: 4 },
		shadowColor: 'rgba(0,0,0, .3)',
		elevation: 6,
		shadowOpacity: 0.1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	followButtonText: {
		fontSize: 13,
		color: Color.primary,
		textAlign: 'center',
		fontFamily: 'Quicksand-Medium'
	},
	headerColumn: {
		...Styles.Common.RowCenterAround,
		marginTop: 10,
		paddingHorizontal: 4
	}
});
