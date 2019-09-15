import { StyleSheet, Platform, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import { Color, Constants, Device, Styles } from '@common';

export default StyleSheet.create({
	bgImageContainer: {
		width: width,
		height: width
	},
	container: {
		width: width,
		height: width,
		backgroundColor: Color.black10T,
		alignItems: 'center',
		justifyContent: 'center'
	},
	uploadContainer: {
		backgroundColor: Color.black70T,
		borderRadius: 8,
		paddingVertical: 16,
		paddingHorizontal: 16
	},
	uploadTextStyle: {
		paddingHorizontal: 16,
		color: Color.white,
		fontSize: 20,
		textAlign: 'center',
		fontFamily: 'Quicksand-Medium'
	},
	uploadDescriptionTextStyle: {
		paddingHorizontal: 16,
		marginTop: 6,
		color: Color.white,
		fontSize: 13,
		textAlign: 'center',
		fontFamily: 'Quicksand-Regular'
	}
});
