import React, { PureComponent } from 'react';
import { View, StatusBar } from 'react-native';

import { ActivityDetail } from '@container';

import { NoInternetNotice } from '@components';

import { Styles, Color } from '@common';

class ActivityDetailScreen extends PureComponent {
	render() {
		const { navigation } = this.props;

		return (
			<View style={Styles.Common.FullFlex}>
				<StatusBar
					backgroundColor={Color.transparent1}
					translucent={true}
					barStyle="dark-content"
					showHideTransition="fade"
				/>
				<ActivityDetail navigation={navigation} />
				<NoInternetNotice />
			</View>
		);
	}
}

export default ActivityDetailScreen;
