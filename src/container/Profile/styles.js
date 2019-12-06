import { StyleSheet, Platform, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import { Color, Device, Styles } from '@common';

export default StyleSheet.create({
	container: {
		backgroundColor: Color.white,
		flexGrow: 1,
		paddingBottom: 60,
		marginTop: Device.isIphoneX ? 45 : 10
	},
	landingBackground: {
		width,
		top: 0
	},
	settingsButton: {
		...Platform.select({
			android: {
				right: -12
			},
			ios: {
				right: -12
			}
		}),
		position: 'absolute',
		zIndex: 99999
	},

	headerContainer: {},
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
