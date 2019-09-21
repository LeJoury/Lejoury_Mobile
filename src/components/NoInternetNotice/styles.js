import { StyleSheet, Platform, Dimensions } from 'react-native';
import { Color, Constants, Device, Styles } from '@common';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
	connectionStatus: {
		position: 'absolute',
		bottom: 0,
		width: Styles.width,
		backgroundColor: Color.red1,
		alignItems: 'center'
	},
	connectionText: {
		color: Color.white,
		fontSize: 12,
		fontFamily: 'Quicksand-Bold',
		paddingVertical: 8
	}
});
