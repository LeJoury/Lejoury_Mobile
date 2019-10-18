import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { Back, Title, Add } from './IconNav';

import { DraftItinerary } from '@container';

import { NoInternetNotice } from '@components';
import { Color, Languages, Styles } from '@common';

class AddItineraryScreen extends PureComponent {
	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state;

		return {
			headerLeft: Back(navigation, Color.primary),
			headerTitle: Title(Languages.Journeys, Color.headerTitleColor),
			headerRight: Add(navigation, Color.primary, params.handleAddItinerary)
		};
	};

	componentDidMount() {
		this.props.navigation.setParams({ handleAddItinerary: this.goToAddItinerary });
	}

	goToAddItinerary = () => {
		this.child.onPressAddNewItinerary();
	};

	componentDidUpdate() {}

	componentWillUnmount() {}

	render() {
		const { navigation } = this.props;

		return (
			<View style={Styles.Common.FullFlex}>
				<DraftItinerary
					navigation={navigation}
					onRef={(child) => {
						this.child = child;
					}}
				/>
				<NoInternetNotice />
			</View>
		);
	}
}

const mapStateToProps = ({ draft }) => ({
	draft
});

export default connect(mapStateToProps)(AddItineraryScreen);
