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
		color: Color.primary,
		fontFamily: 'Quicksand-Medium',
		borderColor: Color.lightGrey6,
		borderBottomWidth: 1
	},
	error: {
		color: Color.red1,
		fontSize: 12,
		paddingTop: 6,
		paddingHorizontal: 6,
		fontFamily: 'Quicksand-Regular'
	},
	sectionWrapper: {
		...Styles.Common.ColumnCenterLeft,
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
		marginTop: 20,
		paddingBottom: 20
	},
	registerTextStyle: {
		fontSize: 16,
		color: Color.white,
		fontFamily: 'Quicksand-Bold'
	},
	registerButton: {
		marginTop: 12,
		backgroundColor: Color.splashScreenBg5,
		...Styles.Button.Radius5,
		...Styles.Common.ShadowBox
	}
});
