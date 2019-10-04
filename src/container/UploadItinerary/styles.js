import { Dimensions, StyleSheet } from 'react-native';
import { Color, Styles, Device } from '@common';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
	scrollViewContainer: {
		flex: 1
	},
	container: {
		flex: 1,
		paddingTop: 6
	},
	wrapper: {
		paddingBottom: 6,
		paddingHorizontal: 6
	},
	contentWrapper: {
		...Styles.Common.ColumnCenterLeft,
		marginTop: 12,
		borderTopWidth: 1,
		borderTopColor: Color.lightGrey6
	},
	greetTextStyle: {
		color: Color.darkGrey3,
		fontFamily: 'Quicksand-Regular',
		fontSize: 14,
		paddingHorizontal: 18,
		textAlign: 'center',
		marginTop: 16,
		marginBottom: 8
	},
	inputStyle: {
		alignItems: 'stretch',
		width: width - 36,
		fontSize: 14,
		paddingHorizontal: 6,
		marginHorizontal: 18,
		marginTop: 18,
		paddingBottom: 12,
		color: Color.black1,
		backgroundColor: Color.white,
		fontFamily: 'Quicksand-Medium',
		borderBottomWidth: 1,
		borderColor: Color.lightGrey6
	},
	dateTextStyle: {
		fontFamily: 'Quicksand-Regular',
		color: Color.black3
	},
	buttonWrapper: {
		width,
		position: 'absolute',
		left: 0,
		bottom: 0,
		right: 0,
		height: Device.isIphoneX ? 60 : 50
	},
	nextButton: {
		width: width,
		height: Device.isIphoneX ? 60 : 50,
		backgroundColor: Color.transparent,
		justifyContent: 'center'
	},
	nextButtonTextStyle: {
		color: Color.white,
		fontSize: 14,
		textAlign: 'center',
		fontFamily: 'Quicksand-Bold'
	},
});
