import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Back, Title } from './IconNav';

import { AddActivityDetail } from '@container';
import { Color, Languages } from '@common';

class AddActivityDetailScreen extends Component {
	//constructor(props) {
	//super (props)
	//}

	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state;

		return {
			headerLeft: Back(navigation, Color.primary, params.handleOnBack),
			headerTitle: Title(Languages.Activity + ' ' + navigation.state.params.identifier, Color.headerTitleColor)
		};
	};

	componentDidMount() {
		this.props.navigation.setParams({ handleOnBack: this._onBackAlert });
	}

	_onBackAlert = () => {
		this.child.showDiscardAlert();
	};

	componentDidUpdate() {}

	componentWillUnmount() {}

	render() {
		const { navigation } = this.props;

		return <AddActivityDetail onRef={(ref) => (this.child = ref)} navigation={navigation} />;
	}
}
export default AddActivityDetailScreen;
