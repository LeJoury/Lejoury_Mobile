import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	FlatList,
	Image,
	TouchableOpacity,
	Alert,
	Platform,
	ScrollView,
	TouchableWithoutFeedback
} from 'react-native';
import { SearchBar } from 'react-native-elements';

import { connect } from 'react-redux';
import { getFollowing, followTraveller, getProfile } from '@actions';

import { Color, Languages, Images } from '@common';

import styles from './styles';

const UNFOLLOW = 'UNFOLLOW';
const FOLLOW = 'FOLLOW';

const Following = (props) => {
	const [ search, setSearch ] = useState('');

	const _keyExtractor = (item) => item.userId;

	useEffect(() => {});

	const updateSearch = (value) => {
		setSearch(value);
	};

	const navigateToSelectedTraveller = (selectedUser) => {
		props.navigation.navigate('TravellerProfile', {
			user: selectedUser
		});
	};

	const onHandleFollow = async (token, travellerId, following) => {
		const { userId } = props.user;

		try {
			let response = await props.followTraveller(
				token,
				travellerId,
				following ? UNFOLLOW : FOLLOW,
				'FollowingList'
			);

			if (response.OK) {
				await props.getProfile(userId, token);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const onFollowClick = async (item) => {
		const { token } = props.user;
		const { following, userId, username } = item;

		if (following) {
			let message = `${Languages.AreYouSureToUnfollow}${username} ?`;

			Alert.alert('', message, [
				{
					text: Languages.Cancel,
					onPress: null
				},
				{
					text: Languages.Confirm,
					onPress: () => onHandleFollow(token, userId, following),
					style: 'destructive'
				}
			]);
		} else {
			onHandleFollow(token, userId, following);
		}
	};

	const renderTravellerHolder = ({ item }) => {
		const functionButtonBGStyle = item.following ? styles.followingButtonStyle : styles.followButtonStyle;
		const functionTextColor = item.following ? Color.white : Color.blue5;
		const functionText = item.following ? Languages.ButtonFollowing : Languages.ButtonFollow;

		return (
			<View style={styles.travellerContainer}>
				<Image
					style={styles.travellerThumbnails}
					source={item.photo ? { uri: item.photo } : Images.defaultAvatar}
				/>

				<View style={styles.travellerSubcontainer}>
					<TouchableWithoutFeedback
						style={styles.travellerNameContainer}
						onPress={() => navigateToSelectedTraveller(item)}
					>
						<View style={styles.travellerNameContainer}>
							<Text style={styles.travellerUsernameTextStyle}>{item.username}</Text>
							<Text style={styles.travellerNameTextStyle}>{item.username}</Text>
						</View>
					</TouchableWithoutFeedback>

					<TouchableOpacity
						style={[ styles.travellerFunctionButton, functionButtonBGStyle ]}
						onPress={() => onFollowClick(item)}
					>
						<Text style={[ styles.travellerFunctionTextStyle, { color: functionTextColor } ]}>
							{functionText}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	};

	const renderSearchBar = () => (
		<SearchBar
			placeholder={Languages.Search}
			onChangeText={updateSearch}
			value={search}
			lightTheme={true}
			platform={Platform.OS}
			showCancel={false}
			containerStyle={styles.searchBarContainerStyle}
			inputContainerStyle={styles.searchBarInputContainerStyle}
			inputStyle={styles.searchBarInputStyle}
			leftIconContainerStyle={{ paddingLeft: 6 }}
		/>
	);

	return (
		<ScrollView style={styles.container} contentContainerStyle={styles.scrollViewContentContainerStyle}>
			{renderSearchBar()}
			<FlatList
				data={props.profile.following}
				extraData={props.profile}
				keyExtractor={_keyExtractor}
				renderItem={renderTravellerHolder}
			/>
		</ScrollView>
	);
};

const mapStateToProps = ({ user, profile }) => ({
	user,
	profile
});

export default connect(mapStateToProps, { getFollowing, followTraveller, getProfile })(Following);
