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
		fontSize: 16,
		color: Color.lightGrey3,
		fontFamily: 'Quicksand-Medium'
	}
});
