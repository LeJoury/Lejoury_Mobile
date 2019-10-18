import { Dimensions, Platform } from 'react-native';
import Device from './Device';
import Color from './Color';

const { height, width, heightWindow } = Dimensions.get('window');
const showStatusBar = false;

let Styles = {
	width: Dimensions.get('window').width,
	height: Platform.OS !== 'ios' ? height : height - 20,
	navBarHeight: Platform !== 'ios' ? height - heightWindow : 0,
	headerHeight: Platform.OS === 'ios' ? 40 : 56,
	IconSize: {
		Small: 15,
		Medium: 18,
		TextInput: 18,
		ToolBar: 18,
		Inline: 20,
		Large: 20,
		xLarge: 22,
		xxLarge: 30,
		CenterView: 80,
		CenterView2: 60,
		CenterTab: 35
	},
	FontSize: {
		tiny: 12,
		small: 14,
		medium: 16,
		big: 18,
		large: 20
	},
	tabStyles: {
		fontSize: 11,
		marginTop: 2,
		marginBottom: 2
	},
	DialogContainer: {
		height: '100%',
		zIndex: 9000000,
		elevation: 10
	},
	DialogContentView: {
		marginVertical: 25,
		paddingHorizontal: 10
	},
	DialogContentTextStyle: {
		textAlign: 'center',
		fontSize: 14
	},
	DialogButtonView: {
		justifyContent: 'space-evenly',
		flexDirection: 'row',
		borderTopWidth: 0.5,
		borderTopColor: Color.lightGrey1
	},
	DialogButtonColumnView: {
		flexDirection: 'column',
		justifyContent: 'center',
		borderTopWidth: 0.5,
		borderTopColor: Color.lightGrey1
	},
	DialogOkTextStyle: {
		color: Color.blue1,
		fontSize: 14
	},
	DialogDestructiveTextStyle: {
		color: Color.red1,
		fontSize: 14
	}
};

Styles.Button = {
	Radius0: {
		borderRadius: 0,
		paddingVertical: 12,
		alignItems: 'center'
	},
	Radius5: {
		borderRadius: 5,
		paddingVertical: 12,
		alignItems: 'center'
	}
};

Styles.Common = {
	FullFlex: { flex: 1 },
	Column: {},
	ColumnCenter: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	ColumnCenterTop: {
		alignItems: 'center'
	},
	ColumnCenterBottom: {
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	ColumnCenterLeft: {
		justifyContent: 'center',
		alignItems: 'flex-start'
	},
	ColumnCenterRight: {
		justifyContent: 'center',
		alignItems: 'flex-end'
	},
	ColumnCenterBetween: {
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	ColumnCenterEvenly: {
		alignItems: 'center',
		justifyContent: 'space-evenly'
	},
	RowCenter: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	RowCenterTop: {
		flexDirection: 'row',
		justifyContent: 'center'
	},
	RowCenterBottom: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'center'
	},
	RowCenterLeft: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	RowCenterRight: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end'
	},
	RowCenterBetween: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	RowBetween: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	RowCenterEvenly: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly'
	},
	RowCenterAround: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly'
	},
	//More traits
	noToolbar: {
		height: 0
	},
	centerToolbar: {
		...Platform.select({
			android: {
				textAlign: 'center'
			}
		})
	},
	toolbar: {
		backgroundColor: Color.navigationBarColor,
		borderBottomWidth: 0,
		...Platform.select({
			ios: {
				height: showStatusBar ? (Device.isIphoneX ? 55 : 55) : Device.isIphoneX ? 55 : 55
			},
			android: {
				height: showStatusBar ? 50 : 50,
				paddingTop: showStatusBar ? 0 : 0,
				marginTop: showStatusBar ? 0 : 0,
				elevation: 0
			}
		}),
		shadowColor: Color.lightGrey3,
		shadowOpacity: 0.2,
		elevation: 6,
		shadowRadius: 2,
		shadowOffset: { width: 0, height: 2 }
	},
	// toolbarNoBorder: {
	// 	backgroundColor: Color.navigationBarColor,
	// 	borderBottomWidth: 0,
	// 	...Platform.select({
	// 		ios: {
	// 			height: showStatusBar ? (Device.isIphoneX ? 55 : 55) : Device.isIphoneX ? 55 : 55
	// 		},
	// 		android: {
	// 			height: showStatusBar ? 50 : 50,
	// 			paddingTop: showStatusBar ? 0 : 0,
	// 			marginTop: showStatusBar ? 0 : 0,
	// 			elevation: 0
	// 		}
	// 	})
	// },
	toolbarPrimaryColor: {
		backgroundColor: Color.primary,
		borderBottomWidth: 0,
		...Platform.select({
			ios: {
				height: showStatusBar ? (Device.isIphoneX ? 55 : 55) : Device.isIphoneX ? 55 : 55
			},
			android: {
				height: showStatusBar ? 50 : 50,
				paddingTop: showStatusBar ? 0 : 0,
				marginTop: showStatusBar ? 0 : 0
			}
		})
	},
	toolbarTitleStyle: {
		alignSelf: 'center',
		textAlign: 'center',
		flex: 1,
		fontSize: 18,
		fontFamily: 'Quicksand-Medium'
	},
	headerStyle: {
		color: Color.primary,
		fontSize: 18,
		textAlign: 'center',
		alignSelf: 'center'
	},
	IconSearchView: {
		backgroundColor: 'rgba(255, 255, 255, 0.9)',
		marginBottom: 10,
		borderRadius: 50,
		shadowOffset: { width: 0, height: -4 },
		shadowColor: 'rgba(0,0,0, .3)',
		shadowOpacity: 0.1,
		elevation: 10,
		zIndex: 9999
	},
	IconSearch: {
		width: 20,
		height: 20,
		margin: 12,
		zIndex: 9999
	},
	logo: {
		width: Platform.OS === 'ios' ? 200 : 200,
		height: Platform.OS === 'ios' ? 30 : 30,
		resizeMode: 'contain',
		...Platform.select({
			ios: {
				marginTop: Device.isIphoneX ? 0 : 0
			},
			android: {
				marginTop: 2,
				marginLeft: 0,
				flex: 1
			}
		})
	},
	headerRight: {
		justifyContent: 'flex-end',
		alignItems: 'center',
		paddingRight: 12,
		flexDirection: 'row'
	},
	FloatCircle: {
		width: 38,
		height: 38,
		marginLeft: 10,
		marginTop: 10,
		borderRadius: 19,
		backgroundColor: Color.black30T,
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: Color.black,
		shadowOpacity: 0.1,
		elevation: 2,
		shadowRadius: 2,
		shadowOffset: { width: 0, height: 2 }
	},
	NoMargin: { margin: 0 },
	NoMarginTop: { marginTop: 0 },
	NoMarginLeft: { marginLeft: 0 },
	NoMarginRight: { marginRight: 0 },
	NoMarginBottom: { marginBottom: 0 },
	NoPadding: { padding: 0 },
	NoPaddingTop: { paddingTop: 0 },
	NoPaddingLeft: { paddingLeft: 0 },
	NoPaddingRight: { paddingRight: 0 },
	NoPaddingBottom: { paddingBottom: 0 },
	NoTopBorder: { borderTopWidth: 0 },
	NoLeftBorder: { borderLeftWidth: 0 },
	NoRightBorder: { borderRightWidth: 0 },
	NoBottomBorder: { borderBottomWidth: 0 },
	NoBorder: { borderWidth: 0 },
	ErrorMessage: { color: Color.red1, fontSize: Styles.FontSize.tiny },
	OverlayBackground: {
		backgroundColor: Color.black30T,
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		alignItems: 'center',
		justifyContent: 'center'
	},
	ShadowBox: {
		shadowColor: Color.lightGrey3,
		shadowOpacity: 0.5,
		elevation: 6,
		shadowRadius: 5,
		shadowOffset: { width: 0, height: 5 }
	}
};

export default Styles;
