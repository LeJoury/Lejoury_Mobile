import React, { PureComponent } from 'react';
import { View } from 'react-native';

import { Title } from './IconNav';

import { BucketList } from '@container';

import { Color, Languages } from '@common';

class BucketListScreen extends PureComponent {
	static navigationOptions = ({ navigation }) => ({
		headerTitle: Title(Languages.BucketList, Color.headerTitleColor)
	});

	componentDidMount() {}

	componentDidUpdate() {}

	componentWillUnmount() {}

	render() {
		const { navigation } = this.props;

		return <BucketList navigation={navigation} />;
	}
}
export default BucketListScreen;
