import React, { Component } from 'react';
import { View, Animated, ScrollView, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationActions } from 'react-navigation';

import { Back } from '../../navigation/IconNav';

import { UserProfileHeader, UserProfileItem, ProfileCenterItem } from '@components';
import { Color, Languages, Constants } from '@common';
import styles from './styles';
import { updateLocale } from 'moment';

const { ASYNCKEY } = Constants.ASYNCKEY;

class Settings extends Component {
	//constructor(props) {
	//super (props)
	//}

	componentDidMount() {}

	componentDidUpdate() {}

	componentWillUnmount() {}

	_getListItem = () => {
		const listItem = [
			{
				label: Languages.ChangeUsername,
				routeName: 'ChangeUsername'
			}
		];
		return listItem;
	};
	_getSettingsItem = () => {
		const listItem = [
			{
				label: Languages.Language,
				value: 'EN'
			},
			{
				label: Languages.ContactUs,
				routeName: 'contact'
			},
			{
				label: Languages.PrivacyPolicies,
				routeName: 'privacy'
			},
			{
				label: Languages.TermConditions,
				routeName: 'terms'
			},
			{
				label: Languages.AboutUs,
				routeName: 'about'
			},
			{
				label: Languages.Version,
				value: '1.0'
			}
		];
		return listItem;
	};

	_handlePress = (item) => {
		const { navigation } = this.props;
		const { routeName, isActionSheet } = item;

		if (routeName && !isActionSheet) {
			navigation.navigate(routeName);
		}
	};

	onSignOutHandle = async () => {
		// this.props.logout();
		await AsyncStorage.removeItem(ASYNCKEY.SESSION);

		this.props.navigation.dispatch({
			type: 'Navigation/RESET',
			index: 0,
			key: null,
			actions: [ NavigationActions.navigate({ routeName: 'Landing' }) ]
		});

	};

	render() {
		// const { user } = this.props;
		// const name = this._getName(user);
		const { navigation } = this.props;
		const listItem = this._getListItem();
		const settingItems = this._getSettingsItem();

		return (
			<View style={styles.container}>
				<ScrollView ref="scrollView">
					<View style={styles.profileSection}>
						<Text style={styles.headerSection}>{Languages.AccountInformations.toUpperCase()}</Text>
						{listItem.map((item, index) => {
							return (
								item && (
									<UserProfileItem key={index} onPress={() => this._handlePress(item)} {...item} />
								)
							);
						})}
					</View>
					<View style={styles.profileSection}>
						<Text style={styles.headerSection}>{Languages.Settings.toUpperCase()}</Text>
						{settingItems.map((item, index) => {
							return <UserProfileItem key={index} onPress={() => this._handlePress(item)} {...item} />;
						})}
					</View>
					<ProfileCenterItem label={Languages.SignOut} onPress={this.onSignOutHandle} />
				</ScrollView>
			</View>
		);
	}
}
export default Settings;
