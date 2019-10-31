import React, { PureComponent } from 'react';
import { StatusBar, SafeAreaView, View } from 'react-native';

import { connect } from 'react-redux';
import { getItineraryById } from '@actions';

import { ItineraryDetails } from '@container';

import { NoInternetNotice } from '@components';
import { Color, Styles } from '@common';

class ItineraryDetailsScreen extends PureComponent {
	static navigationOptions = ({ navigation }) => ({
		// headerLeft: Back(navigation, Color.primary),
		// title: navigation.state.routeName, // journey name
		// headerTitleStyle: Styles.Common.headerStyle
	});

	render() {
		const { navigation } = this.props;
		const { itinerary } =  this.props.navigation.state.params;

		return (
			<View style={Styles.Common.FullFlex}>
				<ItineraryDetails navigation={navigation} itinerary={itinerary} />
				<NoInternetNotice />
			</View>
		);
	}
}

const mapStateToProps = ({ user }) => ({
	user
});

export default connect(mapStateToProps, { getItineraryById })(ItineraryDetailsScreen);
