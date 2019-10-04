import { Dimensions, StyleSheet } from 'react-native';
import { Color, Styles } from '@common';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
	container: {
		flex: 1
	},
	logoWrapper: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	logo: {
		width: width / 1.3,
		height: width / 1.3
	},
	appNameText: {
		marginTop: 12,
		color: Color.white,
		fontSize: 24,
		fontFamily: 'Quicksand-Medium'
	}
});
