import React, { PureComponent } from 'react';
import { View } from 'react-native';

import { ActivityDetail } from '@container';

import { NoInternetNotice } from '@components';

import { Styles } from '@common';

class ActivityDetailScreen extends PureComponent {
	render() {
		const { navigation } = this.props;

		return (
			<View style={Styles.Common.FullFlex}>
				<ActivityDetail navigation={navigation} />
				<NoInternetNotice />
			</View>
		);
	}
}

export default ActivityDetailScreen;
