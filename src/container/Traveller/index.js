import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	FlatList,
	Image,
	TouchableOpacity,
	Alert,
	ScrollView,
	TouchableWithoutFeedback
} from 'react-native';

import { connect } from 'react-redux';
import { getTravellers, followTraveller, getProfile } from '@actions';

import { Images, Color, Languages, Constants } from '@common';

import styles from './styles';

const { Follow_Type } = Constants.Follow_Type;

const Traveller = (props) => {
	useEffect(() => {
		// const { token } = props.user;
		// try {
		// 	let response = props.getTravellers(token, 1);

		// 	if (response.OK) {
		// 	} else {
		// 	}
		// } catch (error) {}
	}, []);

	const _keyExtractor = (item) => item.userId.toString();

	const navigateToSelectedTraveller = (selectedUser) => {
		//TODO: GO TO TRAVELLER PROFILE
		props.navigation.navigate('TravellerProfile', {
			user: selectedUser
		});
	};

	const onHandleFollow = async (token, travellerId, following) => {
		const { userId } = props.user;

		try {
			let response = await props.followTraveller(token, travellerId, following ? Follow_Type.UNFOLLOW : Follow_Type.FOLLOW);

			if (response.OK) {
				await props.getProfile(userId, token);
			}
		} catch (error) {}
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
							<Text style={styles.travellerNameTextStyle}>{item.bio ? item.bio : item.username}</Text>
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
	return (
		<ScrollView style={styles.container} contentContainerStyle={styles.scrollViewContentContainerStyle}>
			<FlatList
				data={props.traveller.travellers}
				extraData={props.traveller}
				keyExtractor={_keyExtractor}
				renderItem={renderTravellerHolder}
			/>
		</ScrollView>
	);
};

const mapStateToProps = ({ user, profile, traveller }) => ({
	user,
	profile,
	traveller
});

export default connect(mapStateToProps, { getTravellers, followTraveller, getProfile })(Traveller);
