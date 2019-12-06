import { Dimensions, StyleSheet, Platform } from 'react-native';
import { Color, Styles } from '@common';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
	container: {
		flex: 1
	},
	scrollViewContentContainerStyle: {
		flexGrow: 1
	},
	searchBarContainerStyle: {
		backgroundColor: Color.transparent,
		paddingVertical: 12,
		paddingHorizontal: 18
	},
	searchBarInputContainerStyle: {
		backgroundColor: Color.lightGrey6,
		...Platform.select({
			android: {
				borderRadius: 6
			}
		})
	},
	searchBarInputStyle: {
		fontSize: 15,
		paddingHorizontal: 6,
		fontFamily: 'Quicksand-Medium'
	},
	travellerContainer: {
		...Styles.Common.RowCenterLeft,
		paddingVertical: 12,
		paddingHorizontal: 24
	},
	travellerThumbnails: {
		width: 50,
		height: 50,
		borderRadius: 25,
		borderWidth: 0.5,
		borderColor: Color.lightGrey6
	},
	travellerSubcontainer: {
		...Styles.Common.RowCenterBetween,
		paddingLeft: 12,
		flex: 1
	},
	travellerNameContainer: {
		flex: 1,
		justifyContent: 'flex-start'
	},
	travellerUsernameTextStyle: {
		fontSize: 16,
		color: Color.primary,
		fontFamily: 'Quicksand-Bold'
	},
	travellerNameTextStyle: {
		fontSize: 14,
		color: Color.lightGrey3,
		fontFamily: 'Quicksand-Medium'
	},
	travellerFunctionButton: {
		borderRadius: 22,
		paddingHorizontal: 16,
		paddingVertical: 8,
		minWidth: 110
	},
	travellerFunctionTextStyle: {
		fontSize: 14,
		textAlign: 'center',
		fontFamily: 'Quicksand-Bold'
	},
	followingButtonStyle: {
		backgroundColor: Color.white,
		borderColor: Color.lightGrey3,
		borderWidth: 1
	},
	followButtonStyle: {
		backgroundColor: Color.blue5
	}
});
