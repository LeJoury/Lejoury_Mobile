import { Dimensions, StyleSheet } from 'react-native';
import { Color, Styles } from '@common';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white',
		paddingTop: 50,
		paddingBottom: 100
	},
	logo: {
		width: width - 50
	}
});
