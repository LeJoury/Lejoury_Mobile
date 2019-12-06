import { Dimensions, StyleSheet, Platform } from 'react-native';
import { Color, Styles } from '@common';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Color.white,
		paddingTop: Platform.OS === 'ios' ? 10 : 0
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
		marginTop: Platform.OS === 'ios' ? 20 : 40,
		paddingHorizontal: 6,
		color: Color.primary,
		fontFamily: 'Quicksand-Medium',
		borderColor: Color.lightGrey6,
		borderBottomWidth: 1
	},
	forgotPasswordButton: {
		marginTop: Platform.OS === 'ios' ? 20 : 40,
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
