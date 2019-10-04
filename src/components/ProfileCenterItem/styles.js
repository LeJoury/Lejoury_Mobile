import { StyleSheet, Platform, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import { Color, Config, Constants, Device, Styles } from '@common';

export default StyleSheet.create({
	centerRow: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		borderBottomWidth: 1,
		borderColor: Color.white1,
		backgroundColor: Color.white,
		paddingHorizontal: 20,
		marginTop: 25,
		height: 60
	},
	centerText: {
		fontSize: 15,
		color: Color.logoutText,
		fontFamily: 'Quicksand-Medium',
	}
});
