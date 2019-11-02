import React, { PureComponent } from 'react';

import { connect } from 'react-redux';
import { getFollower } from '@actions';

import { BucketActivity } from '@container';

class BucketActivityScreen extends PureComponent {
	static navigationOptions = ({ navigation }) => ({
		// headerLeft: Back(navigation, Color.primary),
		// headerTitle: Title(navigation.state.routeName, Color.headerTitleColor)
	});

	render() {
		return <BucketActivity navigation={this.props.navigation}/>;
	}
}

const mapStateToProps = ({ user }) => ({
	user
});

export default connect(mapStateToProps, { getFollower })(BucketActivityScreen);
