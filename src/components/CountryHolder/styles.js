import { StyleSheet, Platform, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import { Color, Constants, Device, Styles } from '@common';

export default StyleSheet.create({
	container: {
		padding: 0,
		marginBottom: 10,
		borderRadius: 3,
		borderWidth: 0,
		width: width / 3,
		...Styles.Common.ShadowBox
	},
	imageWrapper: {
		overflow: 'hidden',
		borderTopRightRadius: 3,
		borderTopLeftRadius: 3
	},
	countryImage: {
		width: '100%',
		height: 80
	},
	separator: {
		borderBottomWidth: 1,
		borderBottomColor: Color.lightGrey4
	},
	countrNameStyle: {
		paddingHorizontal: 10,
		paddingVertical: 8,
		fontSize: 16,
		fontFamily: 'Quicksand-Medium',
		color: Color.darkGrey3
	}
});
