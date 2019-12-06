import React, { PureComponent } from 'react';

import { connect } from 'react-redux';
import { getFollower } from '@actions';

import { BucketActivity } from '@container';

class BucketActivityScreen extends PureComponent {
	static navigationOptions = ({ navigation }) => ({
	});

	render() {
		return <BucketActivity navigation={this.props.navigation} />;
	}
}

const mapStateToProps = ({ user }) => ({
	user
});

export default connect(mapStateToProps, { getFollower })(BucketActivityScreen);
