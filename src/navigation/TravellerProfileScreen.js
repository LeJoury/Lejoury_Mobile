import React, { PureComponent } from 'react';

import { Title, Back } from './IconNav';

import { connect } from 'react-redux';
import { getTravellerProfile } from '@actions';

import { TravellerProfile } from '@container';

import { Color, Styles } from '@common';

class TravellerProfileScreen extends PureComponent {
	// static navigationOptions = ({ navigation }) => ({
	// 	headerTitle: Title(navigation.state.params.user.username, Color.headerTitleColor),
	// 	headerLeft: Back(navigation, Color.primary)
	// });

	// state = {
	// 	selectedUser: this.props.navigation.state.params.user
	// };

	// componentDidMount = async () => {
	// 	try {
	// 		const { userId } = this.props.navigation.state.params.user;
	// 		const { token } = this.props.user;

	// 		let response = await this.props.getTravellerProfile(userId, token);

	// 		if (response.OK) {
	// 			this.setState({
	// 				selectedUser: response.user
	// 			});
	// 		}
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };
	render() {
		return (
			<TravellerProfile navigation={this.props.navigation} selectedUser={ this.props.navigation.state.params.user} isMe={false} />
		);
	}
}

const mapStateToProps = ({ user }) => ({
	user
});

export default connect(mapStateToProps, { getTravellerProfile })(TravellerProfileScreen);
