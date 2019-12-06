import { StyleSheet, Platform, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import { Color, Constants, Device, Styles } from '@common';

export default StyleSheet.create({
	container: {
		padding: 0,
		marginVertical: 10,
		marginLeft: 12,
		borderRadius: 6,
		width: width / 2.2,
		...Styles.Common.ShadowBox,
		elevation: 2
	},
	imageWrapper: {
		flex: 1,
		overflow: 'hidden',
		borderRadius: 6
	},
	countryImage: {
		width: '100%',
		height: 110
	},
	detailContainer: {
		...Styles.Common.ColumnCenter,
		position: 'absolute',
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		borderRadius: 6,
		backgroundColor: Color.black30T,
		flex: 1
	},
	emojiStyle: {},
	countryNameStyle: {
		marginTop: 2,
		fontSize: 18,
		fontFamily: 'Quicksand-Bold',
		letterSpacing: 2,
		color: Color.white
	}
});
