import React, { Component } from 'react';
import { Back, Title } from './IconNav';

import { AddQuote } from '@container';

import { Color, Languages } from '@common';

class AddQuoteSreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		headerLeft: Back(navigation, Color.primary),
		headerTitle: Title(navigation.state.params.itineraryName, Color.headerTitleColor)
	});

	componentDidMount() {}

	componentDidUpdate() {}

	componentWillUnmount() {}
	render() {
		return <AddQuote navigation={this.props.container} />;
	}
}
export default AddQuoteSreen;
