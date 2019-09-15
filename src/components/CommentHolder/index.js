import React from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';

import styles from './styles';

const CommentHolder = ({ comment }) => (
	<View style={styles.wrapper}>
		<View style={styles.avatarWrapper}>
			<Image
				source={{ uri: comment.profileUrl }}
				style={styles.avatar}
				// PlaceholderContent={<ActivityIndicator />}
			/>
		</View>
		<View style={styles.contentWrapper}>
			<Text numberOfLines={1} style={styles.contentUsername}>
				{comment.username}
			</Text>
			<Text numberOfLines={2} style={styles.contentDescription}>
				{comment.content}
			</Text>
		</View>
	</View>
);
export default CommentHolder;
