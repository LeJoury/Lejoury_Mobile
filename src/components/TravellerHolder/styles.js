import { StyleSheet, Platform, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import { Color, Constants, Device, Styles } from '@common';

export default StyleSheet.create({
	container: {
		padding: 0,
		marginTop: 16,
		marginHorizontal: 10,
		flex: 1,
		width: width / 4.5,
		...Styles.Common.ColumnCenter
	},
	imageWrapper: {
		overflow: 'hidden',
		width: 70,
		height: 70,
		borderRadius: 35,
		borderWidth: 1,
		borderColor: Color.lightGrey6,
		...Styles.Common.ColumnCenter,
		...Styles.Common.ShadowBox
	},
	travellerImage: {
		width: 80,
		height: 80,
		borderRadius: 40,
		borderWidth: 1,
		borderColor: Color.lightGrey2
	},
	travellerNameStyle: {
		marginTop: 2,
		fontSize: 12,
		textAlign: 'center',
		fontFamily: 'Quicksand-Bold',
		color: Color.grey1
	}
});
