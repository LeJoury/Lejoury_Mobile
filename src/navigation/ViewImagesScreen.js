import React, { PureComponent } from 'react';
import { View } from 'react-native';

import { Back, Title } from './IconNav';

import { ViewImages } from '@container';

import { NoInternetNotice } from '@components';
import { Color, Styles } from '@common';

class ViewImagesScreen extends PureComponent {
	static navigationOptions = ({ navigation }) => ({
		headerLeft: Back(navigation, Color.primary),
		headerTitle: Title(navigation.state.params.title, Color.headerTitleColor)
	});

	render() {
		const { navigation } = this.props;
		const images = navigation.getParam('images');

		return (
			<View style={Styles.Common.FullFlex}>
				<ViewImages navigation={navigation} images={images} />
				<NoInternetNotice />
			</View>
		);
	}
}
export default ViewImagesScreen;
