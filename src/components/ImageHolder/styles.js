import { StyleSheet, Platform, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import { Color, Constants, Device, Styles } from '@common';

export default StyleSheet.create({
	removeContainer: {
		top: 0,
		position: 'absolute',
		backgroundColor: Color.lightGrey6,
		...Styles.Common.ColumnCenter
	}
});
