import React, { Platform, StyleSheet, Dimensions, PixelRatio } from 'react-native';
import { Color, Constants, Styles } from '@common';

const { width, height, scale } = Dimensions.get('window');

export default StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
		paddingVertical: 12
	},
	recentSearchText: {
		marginTop: 12,
		fontSize: 18,
		color: Color.lightGrey3,
		fontFamily: 'Quicksand-Medium'
	},
	flatListStyle: {
		marginTop: 6
	},
	resultRow: {
		...Styles.Common.RowCenterLeft,
		flex: 1,
		paddingVertical: 8,
	},
	resultIconContainer: {
		flex: 1
	},
	resultKeywordContainer: {
		flex: 6
	},
	resultKeywordTextStyle: {
		fontSize: 16,
		paddingHorizontal: 6,
		color: Color.primary,
		fontFamily: 'Quicksand-Regular'
	}
});
