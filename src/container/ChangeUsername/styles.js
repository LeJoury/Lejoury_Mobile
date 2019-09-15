import { Dimensions, StyleSheet } from 'react-native';
import { Color, Styles } from '@common';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
	scrollContainer: {
		flex: 1,
		backgroundColor: Color.background,
		paddingTop: 30,
		paddingBottom: 50
	},
	title: {
		fontSize: 34,
		fontWeight: '500',
		color: Color.darkGrey1,
		letterSpacing: 0.3,
		paddingHorizontal: Styles.width * 0.1
	},
	subContain: {
		paddingHorizontal: Styles.width * 0.1,
		paddingBottom: 50,
		marginTop: 40
	},
	checkButtonContainer: {
		paddingTop: 20
	},
	inputWrap: {
		flexDirection: 'row',
		alignItems: 'center',
		borderColor: Color.blackDivide,
		borderBottomWidth: 1,
		marginTop: 10
	},
	input: {
		borderColor: Color.grey1,
		height: 40,
		marginTop: 10,
		marginLeft: 10,
		paddingHorizontal: 10,
		paddingTop: 0,
		paddingBottom: 8,
		flex: 1
	},
	buttonWrap: {
		...Styles.Common.RowCenterRight,
		marginTop: height / 30,
		paddingBottom: 50
	},
	disabledButton: {
		marginTop: 20,
		width: width / 3,
		backgroundColor: Color.lightGrey1,
		paddingVertical: 16,
		borderRadius: 5,
		elevation: 1
	},
	submitButton: {
		marginTop: 20,
		width: width / 3,
		backgroundColor: Color.primary,
		paddingVertical: 16,
		borderRadius: 5,
		elevation: 1
	}
});
