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
	logo: {
		width: 120,
		height: 120
	},
	logoWrap: {
		flex: 1,
		flexDirection: 'column'
	},
	logoText: {
		fontSize: 42,
		color: Color.primary,
		letterSpacing: 1.5,
		fontFamily: 'Quicksand-Bold'
	},
	welcomeText: {
		fontSize: 20,
		marginTop: 6,
		color: Color.placeHolderColor,
		fontFamily: 'Quicksand-Regular'
	},
	innerContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		paddingHorizontal: Styles.width * 0.1
	},
	subContainer: {
		flex: 1,
		justifyContent: 'center'
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
		backgroundColor: Color.splashScreenBg5,
		...Styles.Common.ShadowBox
	},
	registerButton: {
		marginTop: 20,
		borderRadius: 5,
		backgroundColor: Color.white,
		...Styles.Common.ShadowBox
	},
	separatorWrap: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	separator: {
		borderBottomWidth: 1,
		flexGrow: 1,
		borderColor: Color.lightGrey4
	},
	separatorText: {
		color: Color.lightGrey4,
		paddingHorizontal: 10
	},
	socialButtonsContainer: {
		marginTop: 4,
		...Styles.Common.RowCenterEvenly
	},
	socialButtonStyle: {
		height: 50,
		width: 50,
		borderRadius: 25,
		...Styles.Common.ShadowBox
	}
});
