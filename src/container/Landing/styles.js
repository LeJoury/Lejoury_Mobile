import { Dimensions, StyleSheet } from 'react-native';
import { Color, Styles } from '@common';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 40,
		backgroundColor: Color.white
	},
	landingBackground: {
		width,
		height
	},
	backButtonWrapper: {
		...Styles.Common.ColumnCenterLeft,
		backgroundColor: Color.transparent,
		marginTop: 15
	},
	innerContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		paddingHorizontal: Styles.width * 0.1
	},
	logoWrapper: {
		flex: 1,
		flexDirection: 'column'
	},
	logo: {
		width: 160,
		height: 160
	},
	logoText: {
		fontSize: 32,
		color: Color.black2,
		fontFamily: 'Quicksand-Bold'
	},
	appNameText: {
		fontSize: 16,
		marginTop: 16,
		color: Color.grey1,
		fontFamily: 'Quicksand-Bold'
	},
	welcomeDescriptionText: {
		fontSize: 16,
		marginTop: 8,
		color: Color.lightGrey3,
		fontFamily: 'Quicksand-Regular'
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
	loginTextStyle: {
		fontSize: 16,
		color: Color.white,
		fontFamily: 'Quicksand-Bold'
	},
	loginButton: {
		marginTop: 20,
		backgroundColor: Color.splashScreenBg5,
		...Styles.Button.Radius5,
		...Styles.Common.ShadowBox
	},
	registerTextStyle: {
		fontSize: 16,
		color: Color.primary,
		fontFamily: 'Quicksand-Bold'
	},
	registerButton: {
		marginTop: 20,
		backgroundColor: Color.white,
		...Styles.Button.Radius5,
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
