import { Dimensions, StyleSheet } from 'react-native';
import { Color, Styles } from '@common';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	//
	mainViewContainer:{
		paddingHorizontal: 12,
		paddingVertical: 4,
		marginTop: 10
	},
	//horizontal section
	sectionContainer: {
		flex: 1,
		paddingVertical: 8,
		marginTop: 10
	},
	seeMoreWrapper: {
		flex: 1,
		...Styles.Common.RowCenterBetween
	},
	sectionTitle: {
		flex: 3,
		color: Color.darkGrey3,
		fontFamily: 'Quicksand-Bold',
		fontSize: 16,
		paddingHorizontal: 18
	},
	seeMoreStyle: {
		flex: 1,
		color: Color.primary,
		fontFamily: 'Quicksand-Regular',
		fontSize: 12,
		paddingHorizontal: 18,
		textAlign: 'right'
	},
	smallSectionTitle: {
		color: Color.lightGrey3,
		fontFamily: 'Quicksand-Bold',
		fontSize: 14,
		paddingHorizontal: 18
	}
});
