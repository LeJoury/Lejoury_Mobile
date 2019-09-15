import { Dimensions, StyleSheet } from 'react-native';
import { Color, Styles } from '@common';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 50
	},
	landingBackground: {
		width,
		height
	},
	backButtonWrapper: {
		...Styles.Common.ColumnCenterLeft,
		backgroundColor: Color.transparent,
		marginTop: 30
	},
	logoWrap: {
		flex: 1,
		flexDirection: 'column'
	},
	logoText: {
		fontSize: 42,
		color: Color.white,
		letterSpacing: 3,
		fontFamily: 'Quicksand-Bold'
	},
	welcomeText: {
		fontSize: 24,
		fontWeight: '200',
		marginTop: 6,
		color: Color.placeHolderColor,
		fontFamily: 'Quicksand-Light'
	},
	innerContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		paddingHorizontal: Styles.width * 0.1
	},
	subContainer: {
		flex: 1,
		justifyContent: 'flex-end',
	},
	landingContainer: {
		flex: 1,
		justifyContent: 'center'
	},
	login_registerContainer: {
		flex: 1,
		justifyContent: 'center'
	},
	buttonWrap: { marginBottom: 20 },
	loginButton: {
		marginTop: 20,
		borderRadius: 5,
		backgroundColor: Color.white,
		shadowColor: Color.primaryLight,
		shadowOpacity: 0.5,
		elevation: 6,
		shadowRadius: 5,
		shadowOffset: { width: 0, height: 5 }
	},
	registerButton: {
		marginTop: 20,
		backgroundColor: Color.primary,
		borderRadius: 5,
		shadowColor: Color.lightGrey2,
		shadowOpacity: 0.3,
		elevation: 6,
		shadowRadius: 2,
		shadowOffset: { width: 0, height: 2 }
	},
	separatorWrap: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	separator: {
		borderBottomWidth: 1,
		flexGrow: 1,
		borderColor: Color.lightGrey6
	},
	separatorText: {
		color: Color.lightGrey6,
		paddingHorizontal: 10
	},
	socialButtonsContainer: {
		marginTop: 4
	},
	socialButtonWrapper: {
		...Styles.Common.RowCenterLeft,
		borderRadius: 25,
		marginTop: 12,
		paddingLeft: 30
	},
	socialButtonText: {
		color: Color.white,
		textAlign: 'center',
		paddingLeft: 30,
		fontFamily: 'Quicksand-Regular'
	},
	transparentButton: {
		width: 50,
		height: 50,
		backgroundColor: Color.transparent,
		shadowColor: Color.transparent,
		shadowOpacity: 0,
		elevation: 0,
		shadowRadius: 0,
		margin: 0
	}
});
