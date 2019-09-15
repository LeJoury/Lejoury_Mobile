import React, { Component } from 'react';
import { StatusBar, SafeAreaView, View } from 'react-native';

import { Title } from './IconNav';

import { Home } from '@container';
import { Color, Languages } from '@common';

class HomeScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		headerTitle: Title(navigation.state.routeName, Color.black2)
	});

	constructor(props) {
		super(props);
	}
	componentDidMount() {}

	componentDidUpdate() {}

	componentWillUnmount() {}

	render() {
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<StatusBar
					backgroundColor={Color.white}
					translucent={false}
					barStyle="dark-content"
					showHideTransition="fade"
				/>
				<Home navigation={this.props.navigation} />
			</SafeAreaView>
		);
	}
}
export default HomeScreen;
