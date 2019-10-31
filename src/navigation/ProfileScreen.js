import React, { PureComponent } from 'react';
import { Settings, Title } from './IconNav';

import { connect } from 'react-redux';

import { Profile } from '@container';

import { Color, Styles } from '@common';

const KEY_USERNAME = 'USERNAME';

class ProfileScreen extends PureComponent {
	static navigationOptions = ({ navigation }) => ({
		headerTitle: Title(navigation.getParam(KEY_USERNAME), Color.headerTitleColor),
		headerRight: Settings(navigation, Color.lightGrey3)
	});

	componentWillMount() {
		this.props.navigation.setParams({ [KEY_USERNAME]: this.props.user.username });
	}

	render() {
		return <Profile navigation={this.props.navigation}/>;
	}
}

const mapStateToProps = ({ user }) => ({
	user
});

export default connect(mapStateToProps, null)(ProfileScreen);
