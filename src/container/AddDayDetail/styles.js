import { Dimensions, StyleSheet } from 'react-native';
import { Color, Styles, Device } from '@common';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
	container: {
		paddingTop: 8,
		paddingBottom: 60,
		flex: 1,
		backgroundColor: Color.white
	},
	backButton: { top: 20, left: 0, position: 'absolute', zIndex: 99999 },
	wrapper: {
		paddingHorizontal: 12,
		paddingVertical: 10,
		marginVertical: 8,
		borderColor: Color.lightGrey4,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		backgroundColor: Color.white,
		...Styles.Common.RowCenterBetween
	},
	smallSectionTitle: {
		color: Color.grey1,
		fontFamily: 'Quicksand-Regular',
		fontSize: 16,
		paddingHorizontal: 36,
		marginTop: 16
	},
	titleStyle: {
		fontFamily: 'Quicksand-Bold',
		color: Color.darkGrey1,
		fontSize: 16
	},
	buttonWrapper: {
		marginTop: height / 4,
		...Styles.Common.ColumnCenter
	},
	separatorWrapper: {
		...Styles.Common.ColumnCenter
	},
	straightSeparator: {
		width: 2,
		height: 30,
		borderRadius: 5,
		backgroundColor: Color.lightGrey4
	},
	addActivityButton: {
		height: 40,
		borderRadius: 20,
		width: width / 2.3,
		alignItems: 'center',
		justifyContent: 'center',
		...Styles.Common.ShadowBox
	},
	addActivityButtonText: {
		fontSize: 14,
		color: Color.primary,
		textAlign: 'center',
		fontFamily: 'Quicksand-Medium'
	},
	removeButtonContainer: {
		paddingVertical: 16,
		backgroundColor: Color.red1,
		marginTop: 12,
		...Styles.Common.RowCenter
	},
	removeTextStyle: {
		color: Color.white,
		marginHorizontal: 6,
		fontSize: 14,
		textAlign: 'center',
		fontFamily: 'Quicksand-Medium'
	}
});
