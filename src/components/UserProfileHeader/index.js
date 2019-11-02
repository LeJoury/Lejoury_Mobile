import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ReadMore from 'react-native-read-more-text';

import { ProfileNumber, Button } from '@components';
import { Images, Languages, Color, Constants } from '@common';

import styles from './styles';

const { Follow_Type } = Constants.Follow_Type;

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
		if (action === Follow_Type.UNFOLLOW) {
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
							setIsFollow(action === Follow_Type.FOLLOW);
							onFollowClick(action === Follow_Type.FOLLOW ? Follow_Type.FOLLOW : Follow_Type.UNFOLLOW);
						}
					},
					style: 'destructive'
				}
			]);
		} else {
			if (!isMe) {
				setIsFollow(action === Follow_Type.FOLLOW);
				onFollowClick(action === Follow_Type.FOLLOW ? Follow_Type.FOLLOW : Follow_Type.UNFOLLOW);
			}
		}
	};

	const renderTruncatedFooter = (handlePress) => {
		return (
			<Text style={styles.bioMoreLess} onPress={handlePress}>
				{Languages.ReadMore}
			</Text>
		);
	};

	const renderRevealedFooter = (handlePress) => {
		return (
			<Text style={styles.bioMoreLess} onPress={handlePress}>
				{Languages.ReadLess}
			</Text>
		);
	};

	const avatar = user && user.photo ? { uri: user.photo } : Images.defaultAvatar;

	// !isMe show Back button
	return (
		<LinearGradient
			style={styles.container}
			colors={[
				Color.splashScreenBg1,
				Color.splashScreenBg2,
				Color.splashScreenBg3,
				Color.splashScreenBg4,
				Color.transparent,
				Color.transparent
			]}
		>
			<View style={styles.header}>
				<View style={styles.avatarWrapper}>
					<Image source={avatar} style={styles.avatar} PlaceholderContent={<ActivityIndicator />} />
				</View>

				<View style={styles.userInfoWrapper}>
					<View style={styles.textContainer}>
						<Text style={styles.fullName}>{user.username}</Text>
						<Text style={styles.name}>{user.name ? user.name : user.username}</Text>
					</View>

					<View style={styles.textContainer}>
						{isMe ? (
							<TouchableOpacity disabled={user.bio !== ''} onPress={onEditProfilePress}>
								<ReadMore
									numberOfLines={5}
									renderTruncatedFooter={renderTruncatedFooter}
									renderRevealedFooter={renderRevealedFooter}
								>
									<Text style={styles.bio}>{user.bio ? user.bio : Languages.AddBio}</Text>
								</ReadMore>
							</TouchableOpacity>
						) : (
							user.bio && <Text style={styles.bio}>{user ? user.bio : ''}</Text>
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
							onPress={() => onFollowPress(Follow_Type.UNFOLLOW)}
						/>
					) : (
						<Button
							text={Languages.ButtonFollow}
							textColor={Color.primaryLight}
							textStyle={styles.unFollowButtonText}
							containerStyle={styles.unFollowButton}
							gradientColors={[ Color.secondPrimary, Color.primary ]}
							type="gradientBorder"
							onPress={() => onFollowPress(Follow_Type.FOLLOW)}
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
		</LinearGradient>
	);
};

export default UserProfileHeader;
