import { Dimensions, StyleSheet } from 'react-native';
import { Color, Styles } from '@common';

const { width, height } = Dimensions.get('window');

function wp(percentage) {
	const value = percentage * width / 100;
	return Math.round(value);
}

const slideWidth = wp(75);
const itemHorizontalMargin = wp(4);

export const sliderWidth = width;
export const itemWidth = slideWidth + itemHorizontalMargin;

export default StyleSheet.create({
	container: {
		flex: 1
	},
	searchViewOverlayContainer: {
		flex: 1,
		position: 'absolute',
		marginTop: 85,
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		width: width,
		height: height,
		backgroundColor: Color.white,
		zIndex: 999999
	},
	searchViewContainer: {
		backgroundColor: Color.white,
		paddingHorizontal: 8,
		paddingTop: 12,
		flexDirection: 'row'
	},
	searchBarContainerStyle: {
		backgroundColor: Color.white,
		margin: 0,
		padding: 10,
		paddingRight: 6
	},
	searchBarInputContainerStyle: {
		backgroundColor: Color.white,
		borderRadius: 6,
		margin: 0,
		paddingVertical: 6,
		...Styles.Common.ShadowBox,
		shadowRadius: 3,
		shadowOffset: { width: 0, height: 1 }
	},
	searchBarInputStyle: {
		fontSize: 15,
		paddingHorizontal: 6,
		fontFamily: 'Quicksand-Medium'
	},
	cancelSearchBarContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
		paddingHorizontal: 4
	},
	cancelSearchBarText: {
		alignItems: 'center',
		fontSize: 14,
		fontFamily: 'Quicksand-Medium',
		color: Color.grey1
	},
	separator: {
		borderBottomWidth: 8,
		marginTop: 10,
		flexGrow: 1,
		borderColor: Color.lightGrey2
	},
	//horizontal section
	sectionContainer: {
		flex: 1,
		paddingVertical: 8,
		marginTop: 10
	},
	sectionTitle: {
		color: Color.darkGrey3,
		fontFamily: 'Quicksand-Bold',
		fontSize: 18,
		paddingHorizontal: 18
	},
	smallSectionTitle: {
		color: Color.lightGrey3,
		fontFamily: 'Quicksand-Medium',
		fontSize: 16,
		paddingHorizontal: 18
	},
	seeMoreContainer: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		alignContent: 'flex-end',
		alignSelf: 'flex-end',
		marginRight: 6
	},
	seeMoreStyle: {
		color: Color.primary,
		paddingVertical: 5,
		fontFamily: 'Quicksand-Regular',
		fontSize: 14,
		paddingHorizontal: 10
	},
	itinerarySeeMoreContainer: {
		flex: 1,
		marginRight: 18,
		...Styles.Common.ColumnCenter
	},
	itinerarySeeMoreInnerContainer: {
		paddingHorizontal: 18,
		borderRadius: 35,
		height: 70,
		...Styles.Common.ColumnCenter,
		...Styles.Common.ShadowBox,
		backgroundColor: Color.white
	},
	itinerarySeeMoreStyle: {
		color: Color.primary,
		paddingVertical: 5,
		fontFamily: 'Quicksand-Regular',
		fontSize: 14
	}
});
