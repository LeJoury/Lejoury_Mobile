import React, { PureComponent } from 'react';

import { connect } from 'react-redux';
import { getFollower } from '@actions';

import { Follower } from '@container';

class ProfileFollowScreen extends PureComponent {
	static navigationOptions = ({ navigation }) => ({
		// headerLeft: Back(navigation, Color.primary),
		// headerTitle: Title(navigation.state.routeName, Color.headerTitleColor)
	});

	render() {
		return <Follower navigation={this.props.navigation}/>;
	}
}

const mapStateToProps = ({ user }) => ({
	user
});

export default connect(mapStateToProps, { getFollower })(ProfileFollowScreen);
