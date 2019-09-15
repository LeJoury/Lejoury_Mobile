import { Dimensions, StyleSheet } from 'react-native';
import { Color, Styles } from '@common';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
	seeMoreWrapper: {
		flex: 1,
		...Styles.Common.RowCenterBetween
	}
});