import { Dimensions, StyleSheet } from 'react-native';
import { Color, Styles, Device } from '@common';

const { width, height } = Dimensions.get('window');

const IMAGE_HEIGHT = Device.isIphoneX ? 350 : 320;

export default StyleSheet.create({
	scrollViewContainer: {
		flex: 1
	},
	imageWrapper: {
		backgroundColor: Color.white,
		height: IMAGE_HEIGHT
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
	backButton: { top: 0, left: 0, position: 'absolute', zIndex: 99999 },
	bucketButton: { top: 0, right: 6, position: 'absolute', zIndex: 99999 },
	image: {
		height: '100%',
		width: width,
	},
	subContain: {
		backgroundColor: Color.white,
		borderTopRightRadius: 6,
		borderTopLeftRadius: 6,
		height: height + 50,
		paddingBottom: 30,
		...Styles.Common.ShadowBox,
		shadowOffset: { width: 0, height: -5 }
	},
	contentWrapper: {
		...Styles.Common.ColumnCenterLeft,
		marginTop: 24,
		marginHorizontal: 18
	},
	contentTextStyle: {
		fontSize: 14,
		color: Color.black1,
		fontFamily: 'Quicksand-Regular'
	},
	title: {
		fontSize: 18,
		color: Color.black1,
		fontFamily: 'Quicksand-Bold'
	},
	description: {
		alignItems: 'flex-start',
		color: Color.darkGrey2,
		paddingVertical: 8
	},
	budget: {
		alignItems: 'flex-start',
		color: Color.darkGrey2,
		paddingVertical: 8
	},
	labelStyle: {
		color: Color.black1,
		fontSize: 17,
		fontFamily: 'Quicksand-Bold'
	},
	ratingStar: {
		marginHorizontal: 4
	},
	mapStyle: {
		width: width - 36,
		aspectRatio: 1
	}
});
