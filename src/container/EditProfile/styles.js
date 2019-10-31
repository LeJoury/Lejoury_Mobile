import { Dimensions, StyleSheet } from 'react-native';
import { Color, Styles, Device } from '@common';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
	container: {
		flex: 1,
		paddingTop:24
	},
	scrollViewContainer: {
		flexGrow: 1,
		paddingBottom: 80
	},
	subContain: {
		paddingBottom: 30,
		backgroundColor: Color.white
	},
	profileImageContainer: {
		...Styles.Common.ColumnCenter
	},
	profileImage: {
		width: 90,
		height: 90,
		borderRadius: 45
	},
	profileImageText: {
		color: Color.blue1,
		fontSize: 14,
		flex: 1,
		marginTop: 16,
		fontFamily: 'Quicksand-Medium'
	},
	inputContainer: {
		paddingVertical: 24,
		marginTop: 16,
		borderTopWidth: 1,
		borderTopColor: Color.lightGrey1
	},
	inputWrapper: {
		flexDirection: 'row',
		flex: 1,
		marginVertical: 24,
		marginHorizontal: 18
	},
	titleStyle: {
		color: Color.black1,
		fontSize: 14,
		flex: 1,
		fontFamily: 'Quicksand-Regular'
	},
	inputStyle: {
		alignItems: 'stretch',
		flex: 3,
		fontSize: 14,
		paddingBottom: 8,
		color: Color.black1,
		backgroundColor: Color.white,
		fontFamily: 'Quicksand-Regular',
		borderBottomWidth: 1,
		borderColor: Color.lightGrey1
	},
	bio: {
		alignItems: 'flex-start',
		height: 120,
		borderRadius: 3,
		padding: 8,
		borderBottomWidth: 1,
		borderColor: Color.lightGrey1
	}
});
