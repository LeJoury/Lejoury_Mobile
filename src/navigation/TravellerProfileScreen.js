import React, { PureComponent } from 'react';
import { StatusBar, View } from 'react-native';

import { Title, Back } from './IconNav';

import { connect } from 'react-redux';
import { getTravellerProfile } from '@actions';

import { TravellerProfile } from '@container';

import { Color, Styles } from '@common';

class TravellerProfileScreen extends PureComponent {
	static navigationOptions = ({ navigation }) => ({});

	render() {
		return (
			<View style={Styles.Common.FullFlex}>
				<TravellerProfile
					navigation={this.props.navigation}
					selectedUser={this.props.navigation.state.params.user}
					isMe={false}
				/>
			</View>
		);
	}
}

const mapStateToProps = ({ user }) => ({
	user
});

export default connect(mapStateToProps, { getTravellerProfile })(TravellerProfileScreen);
