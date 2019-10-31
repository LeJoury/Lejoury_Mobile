import React, { PureComponent } from 'react';

import { connect } from 'react-redux';
import { getFollowing } from '@actions';

import { Following } from '@container';

class ProfileFollowingScreen extends PureComponent {
	static navigationOptions = ({ navigation }) => ({
		// headerLeft: Back(navigation, Color.primary),
		// headerTitle: Title(navigation.state.routeName, Color.headerTitleColor)
	});

	componentDidMount = async () => {
		try {
			let response = await this.props.getFollowing(this.props.user.token);

			if (response.OK) {
			}
		} catch (error) {
			console.log(error);
		}
	};
	render() {
		return <Following navigation={this.props.navigation} />;
	}
}

const mapStateToProps = ({ user }) => ({
	user
});
export default connect(mapStateToProps, { getFollowing })(ProfileFollowingScreen);
