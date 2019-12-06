import React, { PureComponent } from 'react';
import {
	View,
	Platform,
	StyleSheet,
	TouchableWithoutFeedback,
	Dimensions,
	TouchableNativeFeedback
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import posed from 'react-native-pose';
import { NavigationActions } from 'react-navigation';

import { connect } from 'react-redux';

import { NoInternetNotice } from '@components';
import { Device, Styles, Color } from '@common';

const windowWidth = Dimensions.get('window').width;
const tabWidth = windowWidth / 5;

const styles = StyleSheet.create({
	tabbar: {
		height: Device.isIphoneX ? 70 : 50,
		paddingBottom: Device.isIphoneX ? 26 : 0,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderTopWidth: 1,
		borderTopColor: '#eee',
		backgroundColor: '#fff'
	},
	tab: {
		alignSelf: 'stretch',
		flex: 1,
		alignItems: 'center',
		...Platform.select({
			ios: {
				justifyContent: Device.isIphoneX ? 'flex-start' : 'center',
				paddingTop: Device.isIphoneX ? 12 : 0
			},
			android: {
				justifyContent: 'center',
				borderRadius: 25
			}
		})
	}
});

const Scaler = posed.View({
	active: { scale: 1.05 },
	inactive: { scale: 0.85 }
});

const S = StyleSheet.create({
	container: {
		flexDirection: 'row',
		height: 42,
		// elevation: 2,
		alignItems: 'center'
	},
	tabButton: { flex: 1 },
	spotLight: {
		width: tabWidth,
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		...Styles.Common.ShadowBox
	},
	spotLightInner: {
		width: 40,
		height: 40,
		backgroundColor: Color.primary,
		borderRadius: 24
	},
	scaler: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});

class TabBar extends PureComponent {
	onPress = (name, index, activeRouteIndex) => {
		// this.refs['tabItem' + index].flipInY(900);
		this.refs['tabItem' + index].bounceIn(500);

		if (name === 'AddItinerary') {
			this.props.navigation.navigate('AddItineraryStack');
		} else {
			if (index === activeRouteIndex) {
				if (activeRouteIndex === 0) {
					this.props.navigation.dispatch({
						type: 'Navigation/RESET',
						index: 0,
						key: null,
						actions: [ NavigationActions.navigate({ routeName: 'Main' }) ]
					});
				} else if (activeRouteIndex === 1) {
					this.props.navigation.dispatch({
						type: 'Navigation/RESET',
						index: 0,
						actions: [ NavigationActions.navigate({ routeName: 'BucketList' }) ]
					});
				} else if (activeRouteIndex === 3) {
					this.props.navigation.dispatch({
						type: 'Navigation/RESET',
						index: 0,
						actions: [ NavigationActions.navigate({ routeName: 'Notification' }) ]
					});
				} else if (activeRouteIndex === 4) {
					this.props.navigation.dispatch({
						type: 'Navigation/RESET',
						index: 0,
						actions: [ NavigationActions.navigate({ routeName: 'Profile' }) ]
					});
				}
			} else {
				this.props.navigation.navigate(name);
			}
		}
	};

	render() {
		const { navigation, renderIcon, activeTintColor, inactiveTintColor } = this.props;
		// const { routes } = navigation.state;
		const { routes, index: activeRouteIndex } = navigation.state;

		const ignoreScreen = [];
		return (
			<View>
				<NoInternetNotice hasBottomNavigationBar={true} />
				<View style={styles.tabbar}>
					{routes &&
						routes.map((route, index) => {
							const focused = index === navigation.state.index;
							const tintColor = focused ? activeTintColor : inactiveTintColor;

							if (ignoreScreen.indexOf(route.key) > -1) {
								return <View key={route.key} />;
							}

							if (Platform.OS === 'ios') {
								return (
									<TouchableWithoutFeedback
										key={route.key}
										style={styles.tab}
										onPress={this.onPress.bind(this, route.key, index, activeRouteIndex)}
									>
										<Animatable.View ref={'tabItem' + index} style={styles.tab}>
											<Scaler pose={focused ? 'active' : 'inactive'} style={S.scaler}>
												{renderIcon({
													route,
													index,
													focused,
													tintColor
												})}
											</Scaler>
										</Animatable.View>
									</TouchableWithoutFeedback>
								);
							} else {
								return (
									<TouchableNativeFeedback
										key={route.key}
										onPress={this.onPress.bind(this, route.key, index, activeRouteIndex)}
									>
										<Animatable.View ref={'tabItem' + index} style={styles.tab}>
											<Scaler pose={focused ? 'active' : 'inactive'} style={S.scaler}>
												{renderIcon({
													route,
													index,
													focused,
													tintColor
												})}
											</Scaler>
										</Animatable.View>
									</TouchableNativeFeedback>
								);
							}
						})}
				</View>
			</View>
		);
	}
}

const mapStateToProps = ({ user }) => ({
	user
});
export default connect(mapStateToProps, null)(TabBar);
