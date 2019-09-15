import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import styles from './styles';

const ProfileNumber = ({ header, number, onPress = undefined }) => (
	<TouchableOpacity style={styles.container} onPress={onPress}>
		<Text style={styles.numberStyle}>{number}</Text>
		<Text style={styles.titleStyle}>{header}</Text>
	</TouchableOpacity>
);
export default ProfileNumber;
