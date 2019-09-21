import React, { PureComponent } from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';

import { ProfileNumber, Button } from '@components';
import { Images, Languages, Color } from '@common';

import styles from './styles';

import _ from 'lodash';

const UserProfileHeader = ({
	user,
	isMe = false,
	onViewFollowersPress = undefined,
	onViewFollowingPress = undefined,
	onViewItinerariesPress = undefined,
	onEditProfilePress = undefined,
	onFunctionPress = undefined
}) => {
	const avatar =
		user && user.avatar_url
			? { uri: user.avatar_url }
			: user && user.picture ? { uri: user.picture.data.url } : Images.defaultAvatar;

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
						<Text style={styles.fullName}>{user.name}</Text>
						<Text style={styles.bio}>{user ? user.bio : ''}</Text>
					</View>

					{isMe ? (
						<Button
							text={Languages.EditProfile}
							textColor={Color.primaryLight}
							textStyle={styles.followButtonText}
							containerStyle={styles.followButton}
							gradientColors={[ Color.secondPrimary, Color.primary ]}
							type="gradientBorder"
							onPress={onEditProfilePress}
						/>
					) : (
						<Button
							text={Languages.ButtonFollow}
							textColor={Color.primaryLight}
							textStyle={styles.followButtonText}
							containerStyle={styles.followButton}
							gradientColors={[ Color.secondPrimary, Color.primary ]}
							type="gradientBorder"
							onFunctionPress={onFunctionPress}
						/>
					)}
				</View>
			</View>
			<View style={styles.headerColumn}>
				<ProfileNumber onPress={onViewItinerariesPress} header={Languages.Itineraries} number={0} />
				<ProfileNumber onPress={onViewFollowersPress} header={Languages.Followers} number={25} />
				<ProfileNumber onPress={onViewFollowingPress} header={Languages.Following} number={20} />
			</View>
		</View>
	);
};

export default UserProfileHeader;
