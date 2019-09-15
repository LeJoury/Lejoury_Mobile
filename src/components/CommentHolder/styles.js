import { StyleSheet, Platform, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import { Color, Constants, Device, Styles } from '@common';

export default StyleSheet.create({
	wrapper: {
		flex: 1,
		flexDirection: 'row',
		paddingHorizontal: 16,
		paddingTop: 16,
		paddingBottom: 12
	},
	avatarWrapper: {},
	avatar: {
		width: 50,
		height: 50,
		borderRadius: 25
	},
	contentWrapper: {
		paddingHorizontal: 25,
		marginRight: 26
	},
	contentUsername: {
		fontSize: 16,
		fontWeight: '600',
		color: Color.black
	},
	contentCreated: {
		fontSize: 12,
		fontWeight: '400',
		color: Color.lightGrey3
	},
	contentDescription: {
		fontSize: 12,
		fontWeight: '400',
		color: Color.lightGrey3,
		paddingVertical: 8
	}
});
