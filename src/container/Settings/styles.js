import { Dimensions, StyleSheet } from 'react-native';
import { Color, Styles } from '@common';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5F5F5'
	},
	backButtonWrapper: {
		...Styles.Common.ColumnCenterLeft,
		backgroundColor: Color.transparent,
		paddingTop: 15
	},
	profileSection: {
		backgroundColor: '#FFF',
	},
	headerSection: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		fontSize: 15,
		color: Color.primaryLight,
		fontWeight: '600'
	}
});
