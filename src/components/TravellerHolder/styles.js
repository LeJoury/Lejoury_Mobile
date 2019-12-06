import { StyleSheet, Platform, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import { Color, Constants, Device, Styles } from '@common';

export default StyleSheet.create({
	container: {
		padding: 0,
		marginTop: 16,
		marginHorizontal: 10,
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
		backgroundColor: Color.white,
		...Styles.Common.ColumnCenter
	},
	travellerImage: {
		overflow: 'hidden',
		width: 70,
		height: 70,
		borderRadius: 35
	},
	travellerNameStyle: {
		marginTop: 6,
		fontSize: 12,
		textAlign: 'center',
		fontFamily: 'Quicksand-Bold',
		color: Color.grey1
	},
	shimmeringNameStyle: {
		marginTop: 4,
		width: 65,
		height: 12
	}
});
