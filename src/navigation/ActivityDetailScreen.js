import React, { Component } from 'react';

import { ActivityDetail } from '@container';

class ActivityDetailScreen extends Component {
	componentDidMount() {}

	componentDidUpdate() {}

	componentWillUnmount() {}

	render() {
		const { navigation } = this.props;

		return <ActivityDetail navigation={navigation} />;
	}
}
export default ActivityDetailScreen;
