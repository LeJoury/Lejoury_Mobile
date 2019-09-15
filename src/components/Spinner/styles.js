import { StyleSheet, Platform, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import { Color, Config, Constants, Device, Styles } from '@common';


export default StyleSheet.create({
	outerContainer: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center'
	},
	container: {
		backgroundColor: 'transparent',
		height: null,
		width: null
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
	}
});
