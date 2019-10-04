import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import styles from './styles';

const ProfileCenterItem = ({ label, onPress }) => (
	<TouchableOpacity style={styles.centerRow} onPress={onPress}>
		<Text style={styles.centerText}>{label}</Text>
	</TouchableOpacity>
);

export default ProfileCenterItem;
