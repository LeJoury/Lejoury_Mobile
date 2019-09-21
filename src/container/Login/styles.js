import { Dimensions, StyleSheet } from 'react-native';
import { Color, Styles } from '@common';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
	loginForm: {},
	inputWrap: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 10,
		marginBottom: 10
	},
	input: {
		alignItems: 'stretch',
		width: '100%',
		height: 40,
		marginTop: 10,
		paddingHorizontal: 6,
		color: Color.primary,
		fontFamily: 'Quicksand-Medium',
		borderColor: Color.lightGrey6,
		borderBottomWidth: 1
	},
	buttonWrap: {
		marginTop: 30,
		paddingBottom: 50
	},
	forgotPasswordContainer: {
		alignItems: 'flex-end',
		justifyContent: 'flex-end',
		paddingHorizontal: 6
	},
	forgotPasswordText: {
		fontFamily: 'Quicksand-Regular',
		color: Color.lightGrey3,
		fontSize: 12
	},
	loginButton: {
		borderRadius: 5,
		backgroundColor: Color.white,
		...Styles.Common.ShadowBox
	}
});
