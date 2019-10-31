import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Image, TouchableOpacity } from 'react-native';

import { ProfileNumber, Button } from '@components';
import { Images, Languages, Color } from '@common';

import styles from './styles';

import _ from 'lodash';

const UNFOLLOW = 'UNFOLLOW';
const FOLLOW = 'FOLLOW';

const UserProfileHeader = ({
	user,
	isMe = false,
	onViewFollowersPress = undefined,
	onViewFollowingPress = undefined,
	onViewItinerariesPress = undefined,
	onEditProfilePress = undefined,
	onFollowClick = undefined
}) => {
	const [ isFollow, setIsFollow ] = useState(false);

	useEffect(() => {
		if (!isMe) {
			setIsFollow(user.following);
		}
	}, []);

	const onFollowPress = (action) => {
		if (action === UNFOLLOW) {
			let message = `${Languages.AreYouSureToUnfollow}${user.username} ?`;

			Alert.alert('', message, [
				{
					text: Languages.Cancel,
					onPress: null
				},
				{
					text: Languages.Confirm,
					onPress: () => {
						if (!isMe) {
							setIsFollow(action === FOLLOW);
							onFollowClick(action === FOLLOW ? FOLLOW : UNFOLLOW);
						}
					},
					style: 'destructive'
				}
			]);
		} else {
			if (!isMe) {
				setIsFollow(action === FOLLOW);
				onFollowClick(action === FOLLOW ? FOLLOW : UNFOLLOW);
			}
		}
	};

	const avatar = user && user.photo ? { uri: user.photo } : Images.defaultAvatar;

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<View style={styles.avatarWrapper}>
					<Image
						source={avatar}
						style={styles.avatar}
						//  PlaceholderContent={<ActivityIndicator />}
					/>
				</View>

				<View style={styles.userInfoWrapper}>
					<View style={styles.textContainer}>
						<Text style={styles.fullName}>{user.username}</Text>
						{isMe ? (
							<TouchableOpacity disabled={user.bio !== ''} onPress={onEditProfilePress}>
								<Text style={styles.bio}>{user.bio ? user.bio : Languages.AddBio}</Text>
							</TouchableOpacity>
						) : (
							<Text style={styles.bio}>{user ? user.bio : ''}</Text>
						)}
					</View>

					{isMe ? (
						<Button
							text={Languages.EditProfile}
							textColor={Color.primaryLight}
							textStyle={styles.editButtonText}
							containerStyle={styles.editButton}
							gradientColors={[ Color.secondPrimary, Color.primary ]}
							type="gradientBorder"
							onPress={onEditProfilePress}
						/>
					) : isFollow ? (
						<Button
							text={Languages.ButtonFollowing}
							textStyle={styles.followButtonText}
							containerStyle={styles.followButton}
							onPress={() => onFollowPress(UNFOLLOW)}
						/>
					) : (
						<Button
							text={Languages.ButtonFollow}
							textColor={Color.primaryLight}
							textStyle={styles.unFollowButtonText}
							containerStyle={styles.unFollowButton}
							gradientColors={[ Color.secondPrimary, Color.primary ]}
							type="gradientBorder"
							onPress={() => onFollowPress(FOLLOW)}
						/>
					)}
				</View>
			</View>
			<View style={styles.headerColumn}>
				<ProfileNumber
					onPress={onViewItinerariesPress}
					header={Languages.Itineraries}
					number={user.totalItineraries}
				/>
				<ProfileNumber
					onPress={onViewFollowersPress}
					header={Languages.Followers}
					number={user.totalFollowers}
				/>
				<ProfileNumber
					onPress={onViewFollowingPress}
					header={Languages.Following}
					number={user.totalFollowing}
				/>
			</View>
		</View>
	);
};

export default UserProfileHeader;
