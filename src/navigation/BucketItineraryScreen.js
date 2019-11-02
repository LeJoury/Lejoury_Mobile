import React, { PureComponent } from 'react';

import { connect } from 'react-redux';
import { getFollowing } from '@actions';

import { BucketItinerary } from '@container';

class BucketItineraryScreen extends PureComponent {
	static navigationOptions = ({ navigation }) => ({
		// headerLeft: Back(navigation, Color.primary),
		// headerTitle: Title(navigation.state.routeName, Color.headerTitleColor)
	});


	render() {
		return <BucketItinerary navigation={this.props.navigation} />;
	}
}

const mapStateToProps = ({ user }) => ({
	user
});
export default connect(mapStateToProps, { getFollowing })(BucketItineraryScreen);
