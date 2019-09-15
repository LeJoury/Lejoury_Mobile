import React from 'react';
import { Animated } from 'react-native';
import Navigation from './navigation';

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
			return toast('Cannot navigate');
		}
		navigator.dispatch({ type: 'Navigation/NAVIGATE', routeName, params });
	};

	render() {
		return <Navigation ref={'navigator'} />;
	}
}

export default Router;
