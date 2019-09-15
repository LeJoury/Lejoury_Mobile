import { StyleSheet, Platform, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import { Color, Config, Constants, Device, Styles } from '@common';

export default StyleSheet.create({
	centerRow: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		borderBottomWidth: 1,
		borderColor: '#F5F5F5',
		backgroundColor: '#FFF',
		paddingHorizontal: 20,
		marginTop: 25,
		height: 60
	},
	leftText: {
		fontSize: 15,
		color: Color.logoutText
	},
	rightText: {
		fontSize: 15,
		color: Color.logoutText,
		fontWeight: '300',
		alignSelf: 'center'
	},
	rightContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row'
	}
});
