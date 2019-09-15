import { StyleSheet, Platform, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import { Color, Config, Constants, Device, Styles } from '@common';

export default StyleSheet.create({
	container: {
		...Styles.Common.ColumnCenter
		// paddingVertical: 16
		// borderLeftWidth: 1,
		// borderLeftColor: Color.lightGrey1,
		// borderRightWidth: 1,
		// borderRightColor: Color.lightGrey1
	},
	titleStyle: {
		paddingHorizontal: 4,
		fontSize: 14,
		fontFamily: 'Quicksand-Light',
		color: Color.darkGrey1
	},
	numberStyle: {
		paddingHorizontal: 4,
		marginTop: 6,
		fontSize: 18,
		fontFamily: 'Quicksand-Bold',
		color: Color.primary
	}
});
