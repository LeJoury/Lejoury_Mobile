import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Alert, TouchableWithoutFeedback } from 'react-native';

import { connect } from 'react-redux';
import { getTravellers, followTraveller, getProfile } from '@actions';

import { Images, Color, Languages, Constants, create_UUID } from '@common';

import styles from './styles';

const { Follow_Type } = Constants.Follow_Type;

const Traveller = (props) => {
	const [ page, setPage ] = useState(1);
	const [ endReachedCalledDuringMomentum, setEndReachedCalledDuringMomentum ] = useState(true);

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
			let response = await props.followTraveller(
				token,
				travellerId,
				following ? Follow_Type.UNFOLLOW : Follow_Type.FOLLOW
			);

			if (response.OK) {
				await props.getProfile(userId, token);
			}
		} catch (error) {}
	};

	const handleLoadMore = async () => {
		const { token } = props.user;

		if (!endReachedCalledDuringMomentum) {
			try {
				let response = await props.getTravellers(token, page + 1);
				if (response.OK) {
					setEndReachedCalledDuringMomentum(true);
					setPage(page + 1);
				}
			} catch (error) {
				console.log(error);
			}
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
		<FlatList
			data={props.traveller.travellers}
			extraData={props.traveller}
			keyExtractor={_keyExtractor}
			renderItem={renderTravellerHolder}
			style={styles.container}
			contentContainerStyle={styles.scrollViewContentContainerStyle}
			onEndReachedThreshold={0.2}
			onEndReached={() => handleLoadMore()}
			onMomentumScrollBegin={() => setEndReachedCalledDuringMomentum(false)}
		/>
	);
};

const mapStateToProps = ({ user, profile, traveller }) => ({
	user,
	profile,
	traveller
});

export default connect(mapStateToProps, { getTravellers, followTraveller, getProfile })(Traveller);
