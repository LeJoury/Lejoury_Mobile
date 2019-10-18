import { StyleSheet } from 'react-native';
import { Color, Device, Styles } from '@common';

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
		fontSize: Device.isIphoneX ? 14 : 12,
		fontFamily: 'Quicksand-Bold',
		paddingVertical: Device.isIphoneX ? 10 : 8
	}
});
