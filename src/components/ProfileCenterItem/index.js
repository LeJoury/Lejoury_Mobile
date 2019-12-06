import React from 'react';
import { Text, TouchableOpacity, Platform, TouchableNativeFeedback, View } from 'react-native';

import styles from './styles';

const Touchable = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;

const ProfileCenterItem = ({ label, onPress }) => (
	<Touchable onPress={onPress} activeOpacity={0.8}>
		<View style={styles.centerRow}>
			<Text style={styles.centerText}>{label}</Text>
		</View>
	</Touchable>
);

export default ProfileCenterItem;
