import { Dimensions, StyleSheet } from 'react-native';
import { Color, Styles } from '@common';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
	loginForm: { },
	inputWrap: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 10,
		marginBottom: 10
	},
	input: {
		borderColor: '#9B9B9B',
		alignItems: 'stretch',
		width:'100%',
		height: 40,
		marginTop: 10,
		paddingHorizontal: 6,
		color: Color.white,
		fontFamily: 'Quicksand-Medium',
		borderColor: Color.lightGrey6,
		borderBottomWidth: 1
	},
	buttonWrap: {
		marginTop: 30,
		paddingBottom: 50
	},
	loginButton: {
		borderRadius: 5,
		backgroundColor: Color.white,
		shadowColor: Color.primaryLight,
		shadowOpacity: 0.5,
		elevation: 6,
		shadowRadius: 5,
		shadowOffset: { width: 0, height: 5 }
	}
});
