import { StyleSheet, Platform, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import { Color, Device, Styles } from '@common';

export default StyleSheet.create({
	containerStyle: {
		backgroundColor: Color.white,
		flexGrow: 1,
		paddingBottom: 30
	},
	landingBackground: {
		width,
		top: 0
	},
	backButton: { left: 0, position: 'absolute', zIndex: 99999 },

	headerSection: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		fontSize: 15,
		color: Color.primaryLight,
		fontWeight: '600'
	},
	separator: {
		borderBottomWidth: 8,
		borderColor: Color.lightGrey2
	},

	//No itineraries display
	emptyContainer: {
		...Styles.Common.ColumnCenter,
		paddingVertical: 30
	},
	emptyImage: {
		width: 100,
		height: 100
	},
	emptyBucketListText: {
		marginTop: 12,
		width: width / 2,
		color: Color.lightGrey3,
		textAlign: 'center',
		fontSize: 16,
		fontFamily: 'Quicksand-Bold'
	}
});
