import React, { Component } from 'react';
import { Back, Title, Add } from './IconNav';
import { connect } from 'react-redux';

import { getItineraryDraft } from '@actions';

import { DraftItinerary } from '@container';
import { Color, Languages } from '@common';

class UploadItineraryScreen extends Component {
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
		this.props.getItineraryDraft();
	}

	goToAddItinerary = () => {
		this.child.onPressAddNewItinerary();
	};

	componentDidUpdate() {}

	componentWillUnmount() {}

	render() {
		const { navigation } = this.props;

		return (
			<DraftItinerary
				navigation={navigation}
				onRef={(child) => {
					this.child = child;
				}}
			/>
		);
	}
}

const mapStateToProps = ({ draft }) => ({
	draft
});

export default connect(mapStateToProps, { getItineraryDraft })(UploadItineraryScreen);
