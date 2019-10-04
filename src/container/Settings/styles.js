import { Dimensions, StyleSheet } from 'react-native';
import { Color, Styles } from '@common';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Color.white1
	},
	backButtonWrapper: {
		...Styles.Common.ColumnCenterLeft,
		backgroundColor: Color.transparent,
		paddingTop: 15
	},
	profileSection: {
		backgroundColor: Color.white
	},
	headerSection: {
		paddingHorizontal: 20,
		marginTop: 18,
		fontSize: 16,
		color: Color.headerTitleColor,
		fontFamily: 'Quicksand-Medium',
	}
});
