import { Dimensions, StyleSheet } from 'react-native';
import { Color, Styles } from '@common';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Color.white
	},
	form: {
		flex: 1,
		paddingVertical: 10,
		paddingHorizontal: 16
	},
	forgotPasswordText: {
		fontSize: 14,
		color: Color.darkGrey1,
		paddingHorizontal: 6,
		fontFamily: 'Quicksand-Regular'
	},
	input: {
		alignItems: 'stretch',
		width: '100%',
		height: 40,
		marginTop: 16,
		paddingHorizontal: 6,
		color: Color.primary,
		fontFamily: 'Quicksand-Medium',
		borderColor: Color.lightGrey6,
		borderBottomWidth: 1
	},
	forgotPasswordButton: {
		marginTop: 20,
		backgroundColor: Color.splashScreenBg5,
		...Styles.Button.Radius5,
		...Styles.Common.ShadowBox
	},
	forgotPasswordTextStyle: {
		fontSize: 16,
		color: Color.white,
		fontFamily: 'Quicksand-Bold'
	}
});
