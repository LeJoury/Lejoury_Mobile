import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	Platform,
	TouchableNativeFeedback
} from 'react-native';
import { Icon } from 'react-native-elements';

import { Color, Languages, Styles } from '@common';

import styles from './styles';
const Touchable = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;

const PictureHolder = ({ picture, user }) => (
	<View style={styles.container}>
		<Touchable activeOpacity={0.8}>
			<View style={styles.userProfileWrapper}>
				<Image
					source={{ uri: user.userProfilePicture }}
					style={styles.userProfilePicture}
					// PlaceholderContent={<ActivityIndicator />}
				/>
				<Text style={styles.userProfileName}>{user.username}</Text>
			</View>
		</Touchable>
		<View style={styles.imageWrapper}>
			<Image source={picture.imageUrl} style={styles.image} resizeMode={'cover'} />
		</View>
		<View style={styles.socialWrapper}>
			<View style={styles.socialIconsWrapper}>
				<View style={styles.socialIconWrapper}>
					<Icon name="heart" type="feather" size={Styles.IconSize.xLarge} color={Color.black} />
				</View>
				<View style={styles.socialIconWrapper}>
					<Icon name="message-circle" type="feather" size={Styles.IconSize.xLarge} color={Color.black} />
				</View>
			</View>
		</View>
		<View style={styles.descriptionWrapper}>
			<Text style={styles.descriptionBaseline} numberOfLines={3}>
				<Text style={styles.descriptionUsername}>{user.username}</Text>
				<Text style={styles.imageDescription} ellipsizeMode={'tail'}>
					{picture.description}
				</Text>
			</Text>
		</View>
		<Touchable activeOpacity={0.8}>
			<View style={styles.commentsWrapper}>
				<Text style={styles.viewComments}>View all comments</Text>
			</View>
		</Touchable>
	</View>
);
export default PictureHolder;
