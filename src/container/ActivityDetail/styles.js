import { Dimensions, StyleSheet, Platform } from 'react-native';
import { Color, Styles, Device } from '@common';

const { width, height } = Dimensions.get('window');

const IMAGE_HEIGHT = Device.isIphoneX ? 320 : 300;
export default StyleSheet.create({
	scrollViewContainer: {
		flex: 1
	},
	item: {
		width: width,
		height: IMAGE_HEIGHT
	},
	imageContainer: {
		flex: 1,
		marginBottom: Platform.select({ ios: 0, android: 1 }),
		backgroundColor: 'white'
	},
	image: {
		...StyleSheet.absoluteFillObject,
		resizeMode: 'cover'
	},
	navButtonWrapper: {
		flexDirection: 'row',
		flex: 1,
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		zIndex: 99999
	},
	paginationWrapper: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: Color.transparent
	},
	dotStyle: {
		width: 10,
		height: 10,
		borderRadius: 5,
		backgroundColor: Color.white90T
	},
	backButton: { top: 0, left: 0, position: 'absolute', zIndex: 99999 },
	bucketButton: { top: 0, right: 12, position: 'absolute', zIndex: 99999 },
	subContain: {
		backgroundColor: Color.white,
		borderTopRightRadius: 6,
		borderTopLeftRadius: 6,
		minHeight: height / 1.2,
		paddingBottom: 30,
		marginTop: -15,
		...Styles.Common.ShadowBox,
		shadowOffset: { width: 0, height: -10 },
		shadowColor: Color.black20T
	},
	contentWrapper: {
		marginTop: 18,
		marginHorizontal: 18
	},
	budgetRateContainer: {
		marginTop: 12,
		paddingHorizontal: 2,
		...Styles.Common.RowCenterBetween
	},
	budgetContainer: {
		...Styles.Common.RowCenter
	},
	budgetTextStyle: {
		fontSize: 16,
		alignItems: 'flex-start',
		marginLeft: 12,
		color: Color.grey1,
		fontFamily: 'Quicksand-Medium'
	},
	ratingStar: {
		marginLeft: 6
	},
	titleTextStyle: {
		fontSize: 22,
		color: Color.darkGrey3,
		fontFamily: 'Quicksand-Bold'
	},
	separator: {
		marginTop: 16,
		borderBottomWidth: 0.5,
		borderBottomColor: Color.lightGrey5
	},
	descriptionContainer: {
		marginTop: 16
	},
	descriptionLabelStyle: {
		fontSize: 18,
		marginBottom: 12,
		color: Color.darkGrey2,
		fontFamily: 'Quicksand-Bold'
	},
	descriptionTextStyle: {
		alignItems: 'flex-start',
		fontSize: 14,
		color: Color.grey1,
		fontFamily: 'Quicksand-Regular'
	},
	descriptionMoreLess: {
		color: Color.lightGrey3,
		fontSize: 13,
		marginTop: 6,
		fontFamily: 'Quicksand-Medium'
	},
	locationMapContainer: {
		marginTop: 16,
		marginHorizontal: 18,
		flexDirection: 'row'
	},
	locationContainer: {
		flex: 1,
		...Styles.Common.ColumnLeft
	},
	locationNameTextStyle: {
		fontSize: 18,
		marginTop: 16,
		color: Color.darkGrey2,
		fontFamily: 'Quicksand-Bold'
	},
	locationTextStyle: {
		fontSize: 14,
		color: Color.grey1,
		fontFamily: 'Quicksand-Regular',
		paddingLeft: 12
	},
	directionTextStyle: {
		fontSize: 13,
		color: Color.blue1,
		fontFamily: 'Quicksand-Medium',
		marginTop: 12,
		marginLeft: 12
	},
	mapStyle: {
		flex: 1,
		width: width - 36
	}
});
