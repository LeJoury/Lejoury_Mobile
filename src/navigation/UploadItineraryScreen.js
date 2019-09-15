import React, { Component } from 'react';
import { Back, Title } from './IconNav';
import { connect } from 'react-redux';

import { getItineraryDraft } from '@actions';

import { DraftItinerary } from '@container';
import { Color, Languages } from '@common';

class UploadItineraryScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		headerLeft: Back(navigation, Color.primary),
		headerTitle: Title(Languages.Journeys, Color.primary)
	});

	componentDidMount() {
		this.props.getItineraryDraft();
	}

	componentDidUpdate() {}

	componentWillUnmount() {}

	render() {
		const { navigation } = this.props;
		
		return <DraftItinerary navigation={navigation} />;
	}
}

const mapStateToProps = ({ draft }) => ({
	draft
});

export default connect(mapStateToProps, { getItineraryDraft })(UploadItineraryScreen);
