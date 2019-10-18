import React, { PureComponent } from 'react';

import { Back, Title, Add } from './IconNav';

import { AddDayDetail } from '@container';
import { Color, Languages } from '@common';

class AddDayDetailScreen extends PureComponent {
	//constructor(props) {
	//super (props)
	//}
	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state;

		return {
			headerLeft: Back(navigation, Color.primary),
			headerTitle: Title(Languages.Day + ' ' + navigation.state.params.day, Color.headerTitleColor),
			headerRight: Add(navigation, Color.primary, params.handleAddActivity)
		};
	};

	componentDidMount() {
		this.props.navigation.setParams({ handleAddActivity: this.goToAddActivity });
	}

	goToAddActivity = () => {
		this.child.onNavigateToActivityDetail();
	};

	componentDidUpdate() {}

	componentWillUnmount() {}

	render() {
		const { navigation } = this.props;

		return (
			<AddDayDetail
				navigation={navigation}
				onRef={(child) => {
					this.child = child;
				}}
			/>
		);
	}
}
export default AddDayDetailScreen;
