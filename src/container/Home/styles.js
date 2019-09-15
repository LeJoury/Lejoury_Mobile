import { Dimensions, StyleSheet } from 'react-native';
import { Color, Styles } from '@common';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
	container: {
		flex: 1
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
		shadowColor: Color.grey1,
		shadowOffset: { width: 0, height: 4 }
	},
	searchBarInputStyle: {
		fontSize: 15,
		paddingHorizontal: 6,
		fontFamily: 'Quicksand-Medium'
	},
	cancelSearchBarContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1
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
		fontSize: 22,
		paddingHorizontal: 18
	},
	smallSectionTitle: {
		color: Color.lightGrey3,
		fontFamily: 'Quicksand-Medium',
		fontSize: 18,
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
	}
});
