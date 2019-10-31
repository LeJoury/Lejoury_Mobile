import { StyleSheet, Platform, Dimensions } from 'react-native';
import { Color, Config, Constants, Device, Styles } from '@common';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
	container: {
		backgroundColor: 'transparent',
		height: null,
		width: null
	},
	container_center: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		width: width,
		height: height,
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 999999
	},
	container_full_stretch: {
		flexGrow: 1,
		height: null,
		width: null,
		backgroundColor: 'transparent',
		alignItems: 'center',
		justifyContent: 'center'
	},
	container_overlay: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		width: width,
		height: height,
		backgroundColor: 'rgba(0,0,0,0.2)',
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 999999
	},
	container_overlay_login: {
		position: 'absolute',
		top: -100,
		bottom: 0,
		left: 0,
		right: 0,
		width: width,
		height: height + 100,
		backgroundColor: 'rgba(0,0,0,0.2)',
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 999999
	},
	wrapper: {
		backgroundColor: 'transparent',
		zIndex: 1000000
	},
	transparent_Container: {
		position: 'absolute',
		top: -100,
		bottom: 0,
		left: 0,
		right: 0,
		width: width,
		height: height + 100,
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 999999
	},
	centerWrapper: {
		...Styles.Common.ColumnCenterEvenly,
		width: 120,
		height: 120,
	},
	loadingMessage: {
		fontSize: 14,
		paddingBottom: 12,
		color: Color.white,
		fontFamily: 'Quicksand-Medium'
	},
	lottieLoader: {
		width: 120,
		height: 120
	},
	creatingActivityBar: {
		width: width,
		height: 3,
		backgroundColor: Color.black30T
	}
});
