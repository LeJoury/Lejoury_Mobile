import React, { PureComponent } from 'react';
import { View, Platform, StyleSheet, TouchableWithoutFeedback, Dimensions, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { connect } from 'react-redux';
import { Device, Styles, Color } from '@common';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
	labelText: {
		fontSize: 14,
		fontFamily: 'Quicksand-Medium',
		paddingBottom: 10
	},
	tabbar: {
		height: 40,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	tab: {
		alignSelf: 'stretch',
		flex: 1,
		alignItems: 'center',
		...Platform.select({
			ios: {
				justifyContent: Device.isIphoneX ? 'flex-start' : 'center'
			},
			android: {
				justifyContent: 'center'
			}
		})
	},
	focusedTab: {
		borderBottomColor: Color.tabbarTint,
		borderBottomWidth: 1
	},
	normalTab: {
		borderBottomWidth: 0
	}
});

class TopTabBar extends PureComponent {
	onPress(name, index) {
		this.refs['tabItem' + index].bounceIn(100);
		this.props.navigation.navigate(name);
	}

	render() {
		const { navigation, activeTintColor, inactiveTintColor } = this.props;
		// console.log(this.props.getLabelText());
		const { routes } = navigation.state;

		return (
			<View style={styles.tabbar}>
				{routes &&
					routes.map((route, index) => {
						const focused = index === navigation.state.index;
						const tintColor = focused ? activeTintColor : inactiveTintColor;
						const focusedTab = focused ? styles.focusedTab : styles.normalTab;

						const label = route.routeName;

						return (
							<TouchableWithoutFeedback
								key={route.key}
								style={[ styles.tab, focusedTab ]}
								onPress={this.onPress.bind(this, route.key, index)}
							>
								<Animatable.View ref={'tabItem' + index} style={[ styles.tab, focusedTab ]}>
									<Text style={[ styles.labelText, { color: tintColor } ]}>{label}</Text>
								</Animatable.View>
							</TouchableWithoutFeedback>
						);
					})}
			</View>
		);
	}
}

// TabBar.propTypes = {
//     user: PropTypes.object,
// };
// const mapStateToProps = ({ user }) => ({ user: user.user });
// export default connect(mapStateToProps)(TabBar);

export default TopTabBar;
