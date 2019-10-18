import React from 'react';
import { Animated, View } from 'react-native';

import Navigation from './navigation';

import { Styles } from '@common';

class Router extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			scrollY: new Animated.Value(0)
		};
	}

	goToScreen = (routeName, params) => {
		const { navigator } = this.refs;
		if (!navigator) {
			return;
		}
		navigator.dispatch({ type: 'Navigation/NAVIGATE', routeName, params });
	};

	render() {
		return (
			<View style={Styles.Common.FullFlex}>
				<Navigation ref={'navigator'} />
			</View>
		);
	}
}

export default Router;
