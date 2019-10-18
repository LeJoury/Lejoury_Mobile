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
	scrollViewContainer: {
		flexGrow: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		backgroundColor: Color.DirtyBackground
	},
	backButton: { top: 20, left: 0, position: 'absolute', zIndex: 99999 },
	dateWrapper: {
		paddingHorizontal: 12,
		paddingVertical: 10,
		marginVertical: 8,
		borderColor: Color.lightGrey4,
		borderTopWidth: 0,
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
	separatorWrapper: {
		...Styles.Common.ColumnCenter,
		marginVertical: 18
	},
	straightSeparator: {
		width: 1,
		height: 30,
		borderRadius: 5,
		backgroundColor: Color.lightGrey3
	},
	addMoreButtonWrapper: {
		...Styles.Common.ColumnCenter
	},
	addActivityButton: {
		paddingHorizontal: 12,
		alignItems: 'center',
		justifyContent: 'center'
	},
	addActivityButtonText: {
		fontSize: 14,
		color: Color.primary,
		textAlign: 'center',
		fontFamily: 'Quicksand-Medium'
	},
	removeButtonWrapper: {
		...Styles.Common.ColumnCenter,
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		...Styles.Common.ShadowBox
	},
	removeButton: {
		width: width,
		height: Device.isIphoneX ? 62 : 50,
		backgroundColor: Color.red1,
		justifyContent: 'center'
	},
	removeTextStyle: {
		color: Color.white,
		fontSize: 14,
		paddingBottom: Device.isIphoneX ? 14 : 0,
		textAlign: 'center',
		fontFamily: 'Quicksand-Bold'
	}
});
