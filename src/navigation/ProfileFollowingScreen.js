import React, { PureComponent } from 'react';

import { connect } from 'react-redux';

import { Following } from '@container';

class ProfileFollowingScreen extends PureComponent {
	static navigationOptions = ({ navigation }) => ({
		// headerLeft: Back(navigation, Color.primary),
		// headerTitle: Title(navigation.state.routeName, Color.headerTitleColor)
	});

	render() {
		return <Following navigation={this.props.navigation} />;
	}
}

const mapStateToProps = ({ user }) => ({
	user
});
export default connect(mapStateToProps)(ProfileFollowingScreen);
