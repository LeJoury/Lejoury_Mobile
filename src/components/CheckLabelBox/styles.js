import { StyleSheet, Platform, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import { Color, Config, Constants, Device, Styles } from '@common';

export default StyleSheet.create({
	container: {
		...Styles.Common.RowCenterLeft,
		marginTop: 10
	},
	circleContainer: {
		width: 18,
		height: 18,
		borderRadius: 10,
		borderWidth: 1,
		padding: 2
	},
	labelContainer: {
		paddingVertical: 5,
		paddingHorizontal: 10,
		marginLeft: 5,
		fontWeight: '500'
	}
});
