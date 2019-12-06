import React, { PureComponent } from 'react';
import { StatusBar, View } from 'react-native';

import { connect } from 'react-redux';

import { Profile } from '@container';
import { Color, Styles } from '@common';

class ProfileScreen extends PureComponent {
	render() {
		return (
			<View style={Styles.Common.FullFlex}>
				<Profile navigation={this.props.navigation} />
			</View>
		);
	}
}

const mapStateToProps = ({ user }) => ({
	user
});

export default connect(mapStateToProps, null)(ProfileScreen);
