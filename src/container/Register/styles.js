import { Dimensions, StyleSheet } from 'react-native';
import { Color, Styles } from '@common';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
	loginForm: {},
	inputWrap: {
		flexDirection: 'column',
		marginVertical: 6
	},
	input: {
		alignItems: 'stretch',
		width: '100%',
		height: 40,
		paddingHorizontal: 6,
		color: Color.white,
		fontFamily: 'Quicksand-Medium',
		borderColor: Color.lightGrey6,
		borderBottomWidth: 1
	},
	error: {
		color: Color.red1,
		fontSize: 14,
		paddingTop: 6,
		fontFamily: 'Quicksand-Medium'
	},
	sectionWrapper: {
		...Styles.Common.ColumnCenterLeft,
		marginTop: 24,
		marginBottom: 12,
		borderColor: Color.white,
		borderLeftWidth: 3
	},
	sectionHeaderStyle: {
		color: Color.white,
		fontSize: 20,
		paddingLeft: 8
	},
	buttonWrap: {
		marginTop: 30,
		paddingBottom: 30
	},
	registerButton: {
		marginTop: 20,
		borderRadius: 5,
		shadowColor: Color.primaryLight,
		shadowOpacity: 0.5,
		elevation: 6,
		shadowRadius: 5,
		shadowOffset: { width: 0, height: 5 }
	}
});
