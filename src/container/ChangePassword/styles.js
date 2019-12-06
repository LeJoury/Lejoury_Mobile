import { Dimensions, StyleSheet } from 'react-native';
import { Color, Styles, Device } from '@common';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
	scrollContainer: {
		flexGrow: 1,
		backgroundColor: Color.background,
		paddingTop: 16
	},
	subContain: {
		paddingHorizontal: 24,
		marginTop: 16
	},
	checkButtonContainer: {
		paddingTop: 20
	},
	inputWrap: {
		flexDirection: 'row',
		alignItems: 'center',
		borderColor: Color.blackDivide,
		borderBottomWidth: 1,
		marginTop: 10
	},
	input: {
		borderColor: Color.grey1,
		height: 40,
		marginTop: 10,
		marginLeft: 10,
		paddingHorizontal: 10,
		paddingTop: 0,
		paddingBottom: 8,
		flex: 1,
		fontFamily: 'Quicksand-Regular'
	},
	buttonWrap: {
		position: 'absolute',
		bottom: 0
	},
	buttonTextStyle: {
		color: Color.white,
		fontSize: 14,
		paddingBottom: Device.isIphoneX ? 14 : 0,
		textAlign: 'center',
		fontFamily: 'Quicksand-Bold'
	},
	submitButton: {
		width: width,
		height: Device.isIphoneX ? 62 : 50,
		backgroundColor: Color.green1,
		justifyContent: 'center'
	},
	disabledButton: {
		width: width,
		height: Device.isIphoneX ? 62 : 50,
		backgroundColor: Color.lightGrey1,
		justifyContent: 'center'
	}
});
