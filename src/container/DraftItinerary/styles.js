import { Dimensions, StyleSheet } from 'react-native';
import { Color, Styles } from '@common';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
	scrollViewContentContainerStyle: {
		flexGrow: 1,
		paddingBottom: 30
	}
});
