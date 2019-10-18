import { Dimensions, StyleSheet } from 'react-native';
import { Color, Styles, Device } from '@common';

const { width, height } = Dimensions.get('window');
const numColumns = 3;

export default StyleSheet.create({
	scrollViewContainer: {
		flex: 1
	},
	scrollViewContentContainer: {
		flexGrow: 1
	},
	backButton: { top: 0, left: 0, position: 'absolute', zIndex: 99999 },
	subContain: {
		flex: 1,
		paddingTop: 18,
		backgroundColor: Color.white
	},
	flatListContainer: {
		flex: 1,
		paddingVertical: 12,
		zIndex: 9999
	},
	flatListStyle: {
		flex: 1
	},
	resultRow: {
		...Styles.Common.RowCenterLeft,
		height: 60,
		paddingVertical: 14
	},
	resultIconContainer: {
		flex: 1
	},
	resultKeywordContainer: {
		flex: 6,
		...Styles.Common.ColumnCenterLeft,
		paddingRight: 6
	},
	resultKeywordMainTextStyle: {
		fontSize: 16,
		paddingHorizontal: 6,
		color: Color.headerTitleColor,
		fontFamily: 'Quicksand-Bold'
	},
	resultKeywordSecondaryTextStyle: {
		fontSize: 13,
		marginTop: 2,
		paddingHorizontal: 6,
		color: Color.grey1,
		fontFamily: 'Quicksand-Medium'
	},
	titleStyle: {
		marginHorizontal: 18,
		color: Color.black1,
		fontSize: 17,
		flex: 1,
		fontFamily: 'Quicksand-Bold'
	},
	inputView: {
		flex: 1,
		paddingBottom: Device.isIphoneX ? 100 : 90
	},
	inputWrapper: {
		...Styles.Common.ColumnCenterLeft,
		flex: 1,
		marginTop: 24
	},
	inputStyle: {
		alignItems: 'stretch',
		width: width - 36,
		fontSize: 14,
		marginHorizontal: 18,
		marginTop: 10,
		paddingBottom: 8,
		color: Color.black1,
		backgroundColor: Color.white,
		fontFamily: 'Quicksand-Regular',
		borderBottomWidth: 1,
		borderColor: Color.lightGrey1
	},
	inputTextStyle: {
		fontSize: 14,
		color: Color.black1,
		fontFamily: 'Quicksand-Regular'
	},
	cancelSearchBarText: {
		alignItems: 'center',
		fontSize: 14,
		fontFamily: 'Quicksand-Medium',
		color: Color.grey1
	},
	ratingContainer: {
		marginHorizontal: 18,
		marginTop: 10,
		paddingBottom: 8
	},
	ratingStar: {
		marginHorizontal: 4
	},
	photoContainer: {
		width: width - 36,
		marginHorizontal: 18,
		marginTop: 6,
		paddingBottom: 8
	},
	imageThumbnail: {
		width: 100,
		aspectRatio: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	imageHolder: {
		flex: 1 / numColumns,
		aspectRatio: 1,
		marginLeft: 2
	},
	emptyThumbnail: {
		...Styles.Common.ColumnCenter,
		width: 100,
		aspectRatio: 1,
		borderWidth: 1,
		borderStyle: 'dashed',
		borderColor: Color.lightGrey3,
		backgroundColor: Color.white
	},
	budgetStyle: {
		flex: 1,
		fontSize: 14,
		marginLeft: 6,
		paddingBottom: 8,
		color: Color.black1,
		backgroundColor: Color.white,
		fontFamily: 'Quicksand-Regular',
		borderBottomWidth: 1,
		borderColor: Color.lightGrey1
	},
	description: {
		alignItems: 'flex-start',
		height: 100,
		borderWidth: 1,
		borderRadius: 3,
		padding: 8,
		borderColor: Color.lightGrey1
	},
	rowWrapper: {
		...Styles.Common.RowCenterBetween,
		marginHorizontal: 28,
		marginTop: 18,
		paddingLeft: 6
	},
	buttonWrapper: {
		...Styles.Common.ColumnCenter,
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		...Styles.Common.ShadowBox
	},
	confirmButton: {
		width: width,
		height: Device.isIphoneX ? 62 : 50,
		backgroundColor: Color.splashScreenBg5,
		justifyContent: 'center'
	},
	doneTextStyle: {
		color: Color.white,
		fontSize: 14,
		paddingBottom: Device.isIphoneX ? 14 : 0,
		textAlign: 'center',
		fontFamily: 'Quicksand-Bold'
	},
	inputIOS: {
		fontSize: 16,
		paddingVertical: 12,
		paddingHorizontal: 10,
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 4,
		color: Color.lightGrey1,
		paddingRight: 30 // to ensure the text is never behind the icon
	},
	inputAndroid: {
		fontSize: 16,
		paddingHorizontal: 10,
		paddingVertical: 8,
		borderWidth: 0.5,
		borderColor: 'purple',
		borderRadius: 8,
		color: 'black',
		paddingRight: 30 // to ensure the text is never behind the icon
	}
});
