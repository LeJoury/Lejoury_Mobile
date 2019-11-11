import React, { PureComponent } from 'react';
import { Back, Title } from './IconNav';

import { EditActivityDetail } from '@container';
import { Color, Languages } from '@common';

class EditActivityDetailScreen extends PureComponent {
	//constructor(props) {
	//super (props)
	//}

	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state;

		return {
			headerLeft: Back(navigation, Color.primary, params.handleOnBack),
			headerTitle: Title(Languages.Activity + ' ' + navigation.state.params.day, Color.headerTitleColor)
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

		return <EditActivityDetail onRef={(ref) => (this.child = ref)} navigation={navigation} />;
	}
}
export default EditActivityDetailScreen;
