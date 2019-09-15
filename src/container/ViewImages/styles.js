import { Dimensions, StyleSheet } from 'react-native';
import { Color, Styles, Device } from '@common';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
	container: {
		flex: 1
	},
	images: {
		...Styles.Common.ColumnCenter,
		marginHorizontal: 8,
		marginVertical: 10
	}
});
