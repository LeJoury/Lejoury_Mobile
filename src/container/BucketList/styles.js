import { Dimensions, StyleSheet } from 'react-native';
import { Color, Styles, Device } from '@common';

const { width, height } = Dimensions.get('window');

const IMAGE_HEIGHT = Device.isIphoneX ? 350 : 320;

export default StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	emptyBucketListText: {
		marginTop: 12,
		width: width / 2,
		color: Color.lightGrey5,
		textAlign: 'center',
		fontSize: 16,
		fontFamily: 'Quicksand-Regular'
	}
});
