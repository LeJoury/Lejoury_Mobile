import { Dimensions, StyleSheet } from 'react-native';
import { Color, Styles, Device } from '@common';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
	container: {
		flex: 1
	},
	subContainer: {
		padding: 18
	},
	input: {
		alignItems: 'stretch',
		width: '100%',
		height: 40,
		marginTop: 6,
		paddingHorizontal: 6,
		color: Color.primary,
		fontFamily: 'Quicksand-Medium',
		borderColor: Color.lightGrey6,
		borderBottomWidth: 1
	},
	finalStepTitleStyle: {
		fontSize: 28,
		color: Color.black2,
		fontFamily: 'Quicksand-Bold'
	},
	finalStepTextStyle: {
		fontSize: 15,
		marginTop: 18,
		paddingHorizontal: 4,
		color: Color.grey1,
		fontFamily: 'Quicksand-Medium'
	},
	buttonWrap: {
		flex: 1,
		justifyContent: 'flex-end'
	},
	confirmTextStyle: {
		fontSize: 16,
		color: Color.white,
		fontFamily: 'Quicksand-Bold'
	},
	confirmButton: {
		marginTop: 12,
		backgroundColor: Color.splashScreenBg5,
		...Styles.Button.Radius0,
		...Styles.Common.ShadowBox
	}
});
