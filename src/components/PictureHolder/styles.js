import { StyleSheet, Platform, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import { Color, Constants, Device, Styles } from '@common';

export default StyleSheet.create({
	container: {
		...Styles.Common.ColumnCenterLeft,
		paddingVertical: 12
	},
	userProfileWrapper: {
		...Styles.Common.RowCenterLeft,
		paddingHorizontal: 12
	},
	userProfilePicture: {
		width: 40,
		height: 40,
		borderRadius: 20
	},
	userProfileName: {
		paddingHorizontal: 12,
		fontFamily: 'Quicksand-Bold',
		color: Color.darkGrey1,
		fontSize: 16
	},
	imageWrapper: {
		paddingVertical: 10
	},
	image: {
		width: '100%',
		height: undefined,
		aspectRatio: 1.5,
		overflow: 'hidden'
	},
	socialWrapper: {
		flex: 1,
		...Styles.Common.RowCenterLeft
	},
	socialIconsWrapper: {
		...Styles.Common.RowCenterLeft
	},
	socialIconWrapper: {
		paddingHorizontal: 12
	},
	descriptionBaseline: {
		paddingHorizontal: 12,
		paddingTop: 8
	},
	descriptionWrapper: {
		...Styles.Common.RowCenterLeft
	},
	descriptionUsername: {
		fontFamily: 'Quicksand-Medium',
		color: Color.darkGrey1
	},
	imageDescription: {
		// fontFamily: 'Quicksand-Regular',
		color: Color.darkGrey1
	},
	commentsWrapper: {
		paddingHorizontal: 12,
		paddingTop: 6
	},
	viewComments:{
		// fontFamily: 'Quicksand-Light',
		color: Color.grey1
	}
});
