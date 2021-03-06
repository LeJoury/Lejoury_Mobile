import { Dimensions, StyleSheet } from 'react-native';
import { Color, Styles, Device } from '@common';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
	backButton: { left: 0, position: 'absolute', zIndex: 99999 },
	separatorWrapper: {
		...Styles.Common.ColumnCenter,
		marginVertical: 18
	},
	straightSeparator: {
		width: 1,
		height: 30,
		borderRadius: 5,
		backgroundColor: Color.lightGrey3
	},
	subContain: {
		paddingTop: 30
	},
	rowWrapper: {
		...Styles.Common.RowCenterBetween,
		width: width,
		marginTop: 30,
		paddingHorizontal: 16,
		paddingBottom: 30
	},
	label: {
		fontFamily: 'Quicksand-Medium',
		fontSize: 14,
		color: Color.labelColor
	},
	titleWrapper: {
		backgroundColor: Color.white,
		padding: 16,
		marginHorizontal: 16,
		flex: 1,
		borderRadius: 8,
		...Styles.Common.ShadowBox
	},
	quoteWrapper: {
		backgroundColor: Color.white,
		padding: 16,
		marginTop: 30,
		marginHorizontal: 16,
		flex: 1,
		borderRadius: 8,
		...Styles.Common.ShadowBox
	},
	inputStyle: {
		flex: 1,
		alignSelf: 'stretch',
		fontSize: 18,
		marginTop: 12,
		paddingHorizontal: 2,
		paddingBottom: 6,
		color: Color.black1,
		fontFamily: 'Quicksand-Bold',
		textAlign: 'right',
		borderBottomWidth: 1
	},
	dateWrapper: {
		backgroundColor: Color.white,
		paddingTop: 16,
		paddingHorizontal: 16,
		paddingBottom: 8,
		flex: 1,
		borderRadius: 8,
		...Styles.Common.ShadowBox
	},
	datePickerStyle: {
		width: '100%',
		marginTop: 16
	},
	dateText: {
		width: '100%',
		fontSize: 18,
		textAlign: 'right',
		color: Color.black,
		fontFamily: 'Quicksand-Bold',
		borderWidth: 0
	},
	buttonWrap: {
		alignItems: 'center'
	},
	noOfDaysTextStyle: {
		flex: 1,
		color: Color.lightGrey3,
		fontFamily: 'Quicksand-Medium',
		fontSize: 14,
		textAlign: 'center'
	},
	addDayView: {
		...Styles.Common.ColumnCenter,
		backgroundColor: Color.white,
		borderWidth: 1.5,
		borderStyle: 'dashed',
		borderColor: Color.primaryLight3,
		borderRadius: 4,
		aspectRatio: 2.5
	},
	addDayText: {
		fontSize: 15,
		color: Color.primaryLight3,
		textAlign: 'center',
		fontFamily: 'Quicksand-Medium'
	},
	buttonWrapper: {
		...Styles.Common.ColumnCenter,
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: Device.isIphoneX ? 60 : 50,
		...Styles.Common.ShadowBox
	},
	dayContainer: {
		width: '35%',
		...Styles.Common.ShadowBox,
		backgroundColor: Color.white,
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderTopRightRadius: 30,
		borderBottomRightRadius: 30
	},
	noOfDayText: {
		fontSize: 15,
		marginLeft: 6,
		fontFamily: 'Quicksand-Medium',
		color: Color.black1
	},
	editDayContainer: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		paddingHorizontal: 16,
		paddingVertical: 8
	},
	editDayText: {
		color: Color.primaryLight3,
		fontSize: 14,
		textAlign: 'center',
		fontFamily: 'Quicksand-Medium'
	},
	publishButtonTextStyle: {
		color: Color.white,
		fontSize: 14,
		paddingBottom: Device.isIphoneX ? 14 : 0,
		textAlign: 'center',
		fontFamily: 'Quicksand-Bold'
	},
	publishButton: {
		width: width,
		height: Device.isIphoneX ? 62 : 50,
		backgroundColor: Color.splashScreenBg5,
		justifyContent: 'center'
	},
	updateButtonTextStyle: {
		color: Color.white,
		fontSize: 14,
		paddingBottom: Device.isIphoneX ? 14 : 0,
		textAlign: 'center',
		fontFamily: 'Quicksand-Bold'
	},
	updateButton: {
		width: width,
		height: Device.isIphoneX ? 62 : 50,
		backgroundColor: Color.green1,
		justifyContent: 'center'
	}
});
