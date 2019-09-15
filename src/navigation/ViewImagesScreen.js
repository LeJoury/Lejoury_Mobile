import React, { Component } from 'react';
import { Back } from './IconNav';

import { ViewImages } from '@container';

import { Color, Languages } from '@common';

class ViewImagesScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		headerLeft: Back(navigation, Color.primary)
	});

	componentDidMount() {}

	componentDidUpdate() {}

	componentWillUnmount() {}
	render() {
		const { navigation } = this.props;
		const images = navigation.getParam('images');

		return <ViewImages navigation={navigation} images={images} />;
	}
}
export default ViewImagesScreen;
