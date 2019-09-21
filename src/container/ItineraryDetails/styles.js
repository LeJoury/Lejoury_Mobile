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
	imageButton: { top: 0, right: 12, position: 'absolute', zIndex: 99999 },
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
		paddingTop: 8,
		borderRadius: 6
	},
	timelineContainer: {
		marginTop: 20,
		paddingBottom: Device.isIphoneX ? 50 : 30
	},
	dayContainer: {
		...Styles.Common.ShadowBox
	},
	dayGradientContainer: {
		width: '50%',
		borderTopRightRadius: 30,
		borderBottomRightRadius: 30,
		paddingVertical: 2
	},
	dayTextStyle: {
		paddingVertical: 6,
		marginHorizontal: 16,
		color: Color.white,
		fontSize: 16,
		fontFamily: 'Quicksand-Bold'
	}
});
