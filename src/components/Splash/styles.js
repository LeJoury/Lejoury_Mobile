import { Dimensions, StyleSheet } from 'react-native';
import { Color, Styles } from '@common';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Color.white
	},
	logoWrapper: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	logo: {
		width: 250,
		height: 250
	},
	appNameText: {
		marginTop: 12,
		color: Color.white,
		fontSize: 24,
		fontFamily: 'Quicksand-Medium'
	}
});
