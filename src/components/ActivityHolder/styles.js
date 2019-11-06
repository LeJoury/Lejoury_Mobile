import { Dimensions, StyleSheet } from 'react-native';
import { Color, Styles, Device } from '@common';

const { width, height } = Dimensions.get('window');

const IMAGE_HEIGHT = 250;

export default StyleSheet.create({
	container: {
		flex: 1,
		borderWidth: 1,
		borderColor: Color.lightGrey2
	},
	gradientContainer: {
		position: 'absolute',
		height: '100%',
		width: '100%'
	},
	rowContainer: {
		...Styles.Common.RowBetween,
		flex: 1,
		paddingVertical: 10,
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0
	},
	imageContainer: {
		flex: 1
	},
	imageWrapper: {
		backgroundColor: Color.white,
		height: IMAGE_HEIGHT
	},
	image: {
		height: '100%',
		width: width
	},
	emptyImageContainer: {
		width: width,
		height: 250,
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
	contentContainer: {
		paddingVertical: 16,
		paddingHorizontal: 12
	},
	activityName: {
		fontSize: 18,
		flex: 1,
		paddingHorizontal: 12,
		color: Color.white,
		fontFamily: 'Quicksand-Medium'
	},
	activityDay: {
		fontSize: 14,
		color: Color.lightGrey3,
		fontFamily: 'Quicksand-Regular'
	},
	activityDescription: {
		fontSize: 14,
		maxHeight: 70,
		color: Color.black1,
		fontFamily: 'Quicksand-Regular'
	},
	activityBudget: {
		fontSize: 14,
		color: Color.lightGrey3,
		textAlign: 'left',
		fontFamily: 'Quicksand-Medium'
	},
	ratingStar: {
		marginHorizontal: 4
	},

	//bookmark activity holder
	bookmarkContainer: {
		flex: 1,
		borderRadius: 6
	},
	bookmarkGradientContainer: {
		position: 'absolute',
		height: '100%',
		width: '100%'
	},
	bookmarkRowContainer: {
		flex: 1,
		bottom: 0,
		left: 0,
		right: 0,
		paddingBottom: 12,
		justifyContent: 'flex-end'
	},
	bookmarkImageContainer: {
		flex: 1,
		overflow: 'hidden',
		borderRadius: 6
	},
	bookmarkImageWrapper: {
		backgroundColor: Color.white,
		height: IMAGE_HEIGHT
	},
	bookmarkImage: {
		height: '100%',
		width: width
	},
	bookmarkActivityName: {
		fontSize: 18,
		paddingHorizontal: 12,
		color: Color.white,
		fontFamily: 'Quicksand-Medium'
	},
	bookmarkActivityDescription: {
		fontSize: 14,
		color: Color.lightGrey6,
		fontFamily: 'Quicksand-Regular',
		marginLeft: 12,
		paddingRight: 24
	},
	bookmarkIconContainer: {
		position: 'absolute',
		right: 12,
		top: 12
	},
	bookmarkReadMoreContainer: {
		...Styles.Common.ColumnCenterRight,
		justifyContent: 'flex-end',
		marginRight: 12
	}
});
