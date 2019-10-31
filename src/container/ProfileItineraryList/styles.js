import { Dimensions, StyleSheet } from 'react-native';
import { Color, Styles } from '@common';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
	separator: {
		borderBottomWidth: 0.5,
		flexGrow: 1,
		borderColor: Color.lightGrey1
	},
	separatorRow: {
		backgroundColor: Color.lightGrey4,
		height: 0.5
	}
});
