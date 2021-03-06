import { StyleSheet } from 'react-native';

import { Color, Styles } from '@common';

export default StyleSheet.create({
	main_UserProfileWrapper: {
		...Styles.Common.RowCenterBetween,
		marginTop: 10,
		paddingHorizontal: 6
	},
	main_UserProfilePicture: {
		width: 20,
		height: 20,
		borderRadius: 10,
		overflow: 'hidden'
	},
	main_UserProfileName: {
		paddingLeft: 12,
		fontFamily: 'Quicksand-Medium',
		color: Color.black,
		fontSize: 14
	},
	main_Title: {
		color: Color.darkGrey2,
		paddingHorizontal: 12,
		marginTop: 8,
		fontFamily: 'Quicksand-Bold'
	},
	main_Country: {
		flexDirection: 'row',
		paddingHorizontal: 12
	},
	main_contentContainer: {
		backgroundColor: Color.white,
		height: 100,
		width: '90%',
		overflow: 'hidden',
		marginTop: -60,
		paddingHorizontal: 8,
		paddingTop: 8,
		borderRadius: 6
	},
	separator: {
		width: '100%',
		height: 1,
		marginTop: 8,
		backgroundColor: Color.lightGrey2
	},
	noOfLikesText: {
		marginLeft: 8,
		fontSize: 13,
		color: Color.grey1,
		fontFamily: 'Quicksand-Regular'
	}
});
