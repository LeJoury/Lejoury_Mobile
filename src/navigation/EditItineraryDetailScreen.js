import React, { PureComponent } from 'react';
import { StatusBar, View } from 'react-native';

import { EditItineraryDetail } from '@container';

import { NoInternetNotice } from '@components';
import { Color, Styles } from '@common';

class EditItineraryDetailScreen extends PureComponent {
	componentDidMount() {}

	componentDidUpdate() {}

	componentWillUnmount() {}

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
				<EditItineraryDetail navigation={navigation} />
				<NoInternetNotice />
			</View>
		);
	}
}
export default EditItineraryDetailScreen;
