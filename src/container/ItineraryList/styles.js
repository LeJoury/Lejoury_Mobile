import { Dimensions, StyleSheet } from 'react-native';
import { Color, Styles } from '@common';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
	container: {
		flex: 1
	},
	scrollViewContentContainerStyle:{
		flexGrow: 1
	},
	separatorWrap: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 12,
		paddingVertical: 16,
		marginTop: 16
	},
	separator: {
		borderBottomWidth: 0.5,
		flexGrow: 1,
		borderColor: Color.lightGrey1
	},
	separatorText: {
		color: Color.grey1,
		paddingHorizontal: 10,
		fontFamily: 'Quicksand-Regular',
		fontSize: 14,
		letterSpacing: 1.0
	},
	emptyView: {
		flex: 1,
		justifyContent: 'center',
		height: height / 2
	},
	emptyText: {
		color: Color.grey1,
		paddingHorizontal: 10,
		textAlign: 'center',
		fontFamily: 'Quicksand-Regular'
	},
	separatorRow: {
		backgroundColor: Color.lightGrey4,
		height: 0.5
	}
});
