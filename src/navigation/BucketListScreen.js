import React, { Component } from 'react';
import { Title } from './IconNav';

import { BucketList } from '@container';

import { Color, Languages } from '@common';

class BucketListScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		headerTitle: Title(Languages.BucketList, Color.black2),
	});

	componentDidMount() {}

	componentDidUpdate() {}

    componentWillUnmount() {}
    
	render() {
        const { navigation } = this.props;

		return <BucketList navigation={navigation}/>;
	}
}
export default BucketListScreen;
