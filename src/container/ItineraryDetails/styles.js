import { Dimensions, StyleSheet } from 'react-native';
import { Color, Styles, Device } from '@common';

const { width, height } = Dimensions.get('window');

const PARALLAX_HEADER_HEIGHT = Device.isIphoneX ? 450 : 350;

export default StyleSheet.create({
	scrollViewContainer: {
		backgroundColor: Color.black
	},
	imageWrapper: {
		backgroundColor: Color.white,
		justifyContent: 'center',
		alignItems: 'center'
	},
	foregroundWrapper: {
		flex: 0.8,
		justifyContent: 'center'
	},
	quoteWrapper: {
		...Styles.Common.ColumnCenterLeft,
		borderRadius: 6,
		backgroundColor: Color.black20T,
		marginHorizontal: 16,
		padding: 16
	},
	quoteTextStyle: {
		color: Color.lightGrey6,
		fontSize: 16,
		fontFamily: 'Quicksand-Medium'
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
	viewImageWrapper: {
		...Styles.Common.RowCenterEvenly,
		position: 'absolute',
		width: width / 3.2,
		top: PARALLAX_HEADER_HEIGHT / 1.4,
		right: 12,
		zIndex: 99999,
		backgroundColor: Color.black50T,
		borderRadius: 6,
		borderWidth: 0.5,
		borderColor: Color.lightGrey3,
		paddingHorizontal: 10,
		paddingVertical: 8
	},
	viewImageButton: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	viewImageTextStyle: {
		color: Color.lightGrey6,
		fontSize: 14,
		textAlign: 'center',
		fontFamily: 'Quicksand-Bold'
	},
	backButton: { top: 0, left: 0, position: 'absolute', zIndex: 99999 },
	bookmarkButton: { top: 0, right: 12, position: 'absolute', zIndex: 99999 },
	image: {
		height: PARALLAX_HEADER_HEIGHT,
		width: width
	},
	subContain: {
		marginTop: -10,
		backgroundColor: Color.white,
		borderTopRightRadius: 6,
		borderTopLeftRadius: 6,
		paddingTop: 40,
		flexShrink: 0,
		minHeight: height,
		...Styles.Common.ShadowBox
	},
	travellerMainContainer: {
		width: width - 32,
		...Styles.Common.ShadowBox
	},
	travellerContentContainer: {
		height: 120,
		marginTop: -80,
		paddingHorizontal: 8,
		paddingTop: 12,
		borderRadius: 6
	},
	timelineContainer: {
		marginTop: 20,
		paddingBottom: Device.isIphoneX ? 50 : 30
	},
	dayContainer: {
		width: '50%',
		marginTop: 8
	},
	dayTextStyle: {
		paddingVertical: 1,
		marginHorizontal: 12,
		color: Color.darkGrey2,
		fontSize: 16,
		fontFamily: 'Quicksand-Medium'
	}
});
