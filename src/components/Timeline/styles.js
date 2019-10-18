import { Dimensions, StyleSheet } from 'react-native';
import { Color, Styles, Device } from '@common';

const { width, height } = Dimensions.get('window');

const IMAGE_HEIGHT = 250;

export default StyleSheet.create({
	container: {
		flex: 1,
		borderRadius: 8
	},
	listview: {
		flex: 1
	},
	sectionHeader: {
		marginBottom: 15,
		backgroundColor: Color.primary,
		height: 30,
		justifyContent: 'center'
	},
	sectionHeaderText: {
		color: Color.white,
		fontSize: 18,
		alignSelf: 'center'
	},
	rowContainer: {
		flexDirection: 'row',
		flex: 1,
		//alignItems: 'stretch',
		justifyContent: 'center'
	},
	circle: {
		width: 16,
		height: 16,
		borderRadius: 10,
		position: 'absolute',
		left: -8,
		alignItems: 'center',
		justifyContent: 'center'
	},
	dot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: Color.white
	},
	// imageWrapper: {
	// 	marginTop: 16,
	// 	height: 100,
	// 	width: 120,
	// 	backgroundColor: Color.black
	// },

	imageContainer: {
		width: '100%',
		borderRadius: 8,
		overflow: 'hidden'
	},

	emptyImageContainer: {
		width: '100%',
		height: 200,
		backgroundColor: Color.lightGrey5,
		...Styles.Common.ColumnCenter
	},
	emptyImageDesc: {
		fontSize: 16,
		color: Color.white,
		fontFamily: 'Quicksand-Bold',
		paddingHorizontal: 24,
		paddingVertical: 18
	},
	imageWrapper: {
		backgroundColor: Color.white,
		height: IMAGE_HEIGHT
	},
	image: {
		height: '100%',
		width: width
	},
	gradientContainer: {
		flex: 1,
		position: 'absolute',
		height: '100%',
		width: '100%',
		borderRadius: 8
	},
	titleContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		padding: 14
	},
	title: {
		fontSize: 16,
		fontFamily: 'Quicksand-Bold',
		color: Color.white
	},
	details: {
		borderLeftWidth: 2,
		flexDirection: 'column',
		flex: 1
	},
	detail: { paddingBottom: 10 },
	description: {
		marginTop: 16,
		fontFamily: 'Quicksand-Regular',
		color: Color.grey1
	},
	readMoreWrapper: {
		...Styles.Common.RowCenterRight,
		marginTop: 6,
		marginBottom: 6,
		paddingHorizontal: 6
	},
	readMore: {
		color: Color.lightGrey3,
		fontSize: 12,
		fontFamily: 'Quicksand-Regular'
	},
	addToBookmark: {
		color: Color.lightGrey3,
		fontSize: 12,
		fontFamily: 'Quicksand-Regular',
		marginLeft: 6
	},
	separator: {
		height: 1,
		backgroundColor: Color.lightGrey6,
		marginBottom: 10
	}
});
