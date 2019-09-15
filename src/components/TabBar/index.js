import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Platform, StyleSheet, TouchableWithoutFeedback, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import posed from 'react-native-pose';

import { connect } from 'react-redux';
import { Device, Styles, Color } from '@common';

const windowWidth = Dimensions.get('window').width;
const tabWidth = windowWidth / 5;

const styles = StyleSheet.create({
	tabbar: {
		height: Device.isIphoneX ? 70 : 50,
		paddingBottom: Device.isIphoneX ? 30 : 0,
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
				justifyContent: 'center'
			}
		})
	}
});

const SpotLight = posed.View({
	route0: { x: 0 },
	route1: { x: tabWidth },
	route2: { x: tabWidth * 2 },
	route3: { x: tabWidth * 3 },
	route4: { x: tabWidth * 4 }
});

const Scaler = posed.View({
	active: { scale: 1 },
	inactive: { scale: 0.85 }
});

const S = StyleSheet.create({
	container: {
		flexDirection: 'row',
		height: 42,
		elevation: 2,
		alignItems: 'center'
	},
	tabButton: { flex: 1 },
	spotLight: {
		width: tabWidth,
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		shadowOffset: { width: 0, height: 2 },
		shadowColor: 'rgba(0,0,0, .3)',
		shadowOpacity: 1,
	},
	spotLightInner: {
		width: 40,
		height: 40,
		backgroundColor: Color.primary,
		borderRadius: 24
	},
	scaler: { flex: 1, alignItems: 'center', justifyContent: 'center' }
});

class TabBar extends PureComponent {
	onPress(name, index) {
		// this.refs['tabItem' + index].flipInY(900);
		this.refs['tabItem' + index].bounceIn(500);

		// if (name === 'ProfileStack') this.props.navigation.navigate('Landing');
		// else if (name === 'UploadItinerary') this.props.navigation.navigate('UploadItineraryStack');
		// else this.props.navigation.navigate(name);

		if (name === 'UploadItinerary') this.props.navigation.navigate('UploadItineraryStack');
		else this.props.navigation.navigate(name);
	}

	render() {
		const { navigation, renderIcon, activeTintColor, inactiveTintColor } = this.props;
		// console.log(this.props.getLabelText());
		// const { routes } = navigation.state;
		const { routes, index: activeRouteIndex } = navigation.state;

		const ignoreScreen = [];
		return (
			<View style={styles.tabbar}>
				{/* <View style={StyleSheet.absoluteFillObject}>
					<SpotLight style={S.spotLight} pose={`route${activeRouteIndex}`}>
						<View style={S.spotLightInner} />
					</SpotLight>
				</View> */}

				{routes &&
					routes.map((route, index) => {
						const focused = index === navigation.state.index;
						const tintColor = focused ? activeTintColor : inactiveTintColor;

						{
							/* const label = getLabelText({ route, focused: index, index: index }); */
						}

						if (ignoreScreen.indexOf(route.key) > -1) {
							return <View key={route.key} />;
						}

						return (
							<TouchableWithoutFeedback
								key={route.key}
								style={styles.tab}
								onPress={this.onPress.bind(this, route.key, index)}
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

									{/* <Text style={[ Styles.tabStyles, { color: tintColor } ]}>{label}</Text> */}
								</Animatable.View>
							</TouchableWithoutFeedback>
						);
					})}
			</View>
			// Device.isIphoneX && <View key="2" style={Styles.Common.viewCover} />
		);
	}
}

// TabBar.propTypes = {
//     user: PropTypes.object,
// };
// const mapStateToProps = ({ user }) => ({ user: user.user });
// export default connect(mapStateToProps)(TabBar);

export default TabBar;
