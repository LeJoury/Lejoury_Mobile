import React, { PureComponent } from 'react';
import { Title, Back } from './IconNav';

import { Color, Styles, Languages } from '@common';
import { ChangePassword } from '@container';

class ChangePasswordScreen extends PureComponent {
	static navigationOptions = ({ navigation }) => ({
		headerTitle: Title(Languages.ChangePassword),
		headerLeft: Back(navigation, Color.black2)
	});

	componentDidMount() {}

	componentDidUpdate() {}

	componentWillUnmount() {}

	render() {
		return <ChangePassword navigation={this.props.navigation}/>;
	}
}
export default ChangePasswordScreen;
