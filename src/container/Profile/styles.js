import { StyleSheet, Platform, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import { Color, Device, Styles } from '@common';

export default StyleSheet.create({
	container: {
		flex: 1
	},
	landingBackground: {
		width,
		top: 0
	},
	backButtonWrapper: {
		// ...Styles.Common.ColumnCenterRight,
		backgroundColor: Color.transparent,
		paddingTop: 15
	},
	headerSection: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		fontSize: 15,
		color: Color.primaryLight,
		fontWeight: '600'
	},
	separator: {
		borderBottomWidth: 8,
		marginTop: 12,
		borderColor: Color.lightGrey2
	},

	// ScrollView
	scrollableView: {
		paddingBottom: 30
	},
	scrollableTabTextStyle: {
		fontFamily: 'Quicksand-Bold',
		fontSize: 14
	},
	scrollableUnderlineStyle: {
		backgroundColor: Color.primary,
		borderRadius: 2
	},

	//horizontal section
	sectionContainer: {
		flex: 1
	},
	sectionTitle: {
		color: Color.darkGrey3,
		fontFamily: 'Quicksand-Bold',
		fontSize: 28,
		paddingHorizontal: 16,
		paddingTop: 12
	},

	//No itineraries display
	noItinerariesContainer: {
		flex: 1,
		...Styles.Common.ColumnCenter
	},
	noItinerariesImage: {
		width: 120,
		height: 120
	},
	noItinerariesText: {
		fontFamily: 'Quicksand-Medium',
		marginTop: 12,
		fontSize: 14,
		color: Color.lightGrey3
	}
});
