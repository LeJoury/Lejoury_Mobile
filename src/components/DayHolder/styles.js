import { Dimensions, StyleSheet } from 'react-native';
import { Color, Styles } from '@common';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
	draftContainer: {
		padding: 0,
		marginBottom: 12,
		// paddingBottom: 10,
		...Styles.Common.ShadowBox,
		// shadowOffset: { width: 0, height: 2 }
	},
	draftImageWrapper: {
		width: '100%',
		height: 200,
		backgroundColor: Color.white,
		shadowOffset: { width: 0, height: 2 }
	},
	draftContentContainer: {
		flex: 3,
		paddingHorizontal: 12,
		paddingVertical: 8,
		backgroundColor: Color.white
	},
	draftActivityText: {
		fontSize: 16,
		color: Color.black1,
		fontFamily: 'Quicksand-Bold'
	},
	draftDescription: {
		fontSize: 14,
		marginTop: 8,
		color: Color.grey1,
		fontFamily: 'Quicksand-Regular'
	},
	draftBudget: {
		fontSize: 14,
		color: Color.lightGrey3,
		textAlign: 'right',
		fontFamily: 'Quicksand-Regular'
	},
	draftEmptyImageContainer: {
		width: '100%',
		height: 200,
		backgroundColor: Color.lightGrey5,
		...Styles.Common.ColumnCenter
	},
	draftEmptyImageDesc: {
		fontSize: 16,
		color: Color.white,
		fontFamily: 'Quicksand-Bold',
		paddingHorizontal: 24,
		paddingVertical: 18
	},

	//main
	itineraryDetailContainer: {
		marginTop: 16,
		paddingBottom: 10,
		borderColor: Color.lightGrey4,
		backgroundColor: Color.black
	},
	itineraryDescText: {
		paddingHorizontal: 18,
		paddingVertical: 12,
		fontSize: 14,
		color: Color.grey,
		fontFamily: 'Quicksand-Regular'
	},
	imageWrapper: {
		backgroundColor: Color.white,
		height: 200
	},
	image: {
		height: '100%',
		width: width
	},
	wrapper: {
		flex: 1,
		flexDirection: 'row'
	},
	dayContainer: {
		flex: 1,
		aspectRatio: 1,
		backgroundColor: Color.primary,
		...Styles.Common.ColumnCenter,
		...Styles.Common.ShadowBox
	},
	dayWrapper: {},
	dayText: {
		fontSize: 16,
		color: Color.white,
		fontFamily: 'Quicksand-Bold'
	},
	dateText: {
		marginTop: 4,
		fontSize: 13,
		color: Color.lightGrey3,
		fontFamily: 'Quicksand-Medium'
	}
});

// export default StyleSheet.create({
// 	itineraryDetailContainer: {
// 		marginTop: 16,
// 		paddingBottom: 10,
// 		borderColor: Color.lightGrey4,
// 	},
// 	itineraryImageWrapper: {
// 		width: '100%',
// 		aspectRatio: 1
// 	},
// 	itineraryDescText: {
// 		paddingHorizontal: 18,
// 		paddingVertical: 12,
// 		fontSize: 14,
// 		color: Color.grey,
// 		fontFamily: 'Quicksand-Regular'
// 	},
// 	customSlide: {
// 		backgroundColor: Color.white,
// 		width: '100%',
// 		alignItems: 'center',
// 		justifyContent: 'center'
// 	},
// 	wrapper: {
// 		flex: 1,
// 		flexDirection: 'row'
// 	},
// 	dayContainer: {
// 		flex: 1,
// 		aspectRatio: 1,
// 		backgroundColor: Color.primary,
// 		...Styles.Common.ColumnCenter,
// 		shadowOffset: { width: 0, height: 2 },
// 		shadowColor: 'rgba(0,0,0, .3)',
// 		elevation: 6,
// 		shadowOpacity: 0.3
// 	},
// 	dayWrapper: {},
// 	dayText: {
// 		fontSize: 16,
// 		color: Color.white,
// 		fontFamily: 'Quicksand-Bold'
// 	},
// 	dateText: {
// 		marginTop: 4,
// 		fontSize: 13,
// 		color: Color.lightGrey3,
// 		fontFamily: 'Quicksand-Medium'
// 	},
// 	contentContainer: {
// 		flex: 3,
// 		paddingHorizontal: 12,
// 		paddingTop: 8,
// 		backgroundColor: Color.white,
// 		shadowOffset: { width: 0, height: 2 },
// 		shadowColor: 'rgba(0,0,0, .3)',
// 		elevation: 6,
// 		shadowOpacity: 0.3
// 	},
// 	itineraryActivityText: {
// 		fontSize: 16,
// 		color: Color.black1,
// 		fontFamily: 'Quicksand-Bold'
// 	},
// 	itineraryDescription: {
// 		fontSize: 14,
// 		marginTop: 8,
// 		color: Color.grey1,
// 		fontFamily: 'Quicksand-Regular'
// 	},
// 	itineraryBudget: {
// 		fontSize: 14,
// 		color: Color.lightGrey3,
// 		textAlign: 'right',
// 		fontFamily: 'Quicksand-Regular'
// 	}
// });
