import React from 'react';
import { TouchableOpacity, Text, Platform, View, TouchableNativeFeedback } from 'react-native';

import styles from './styles';
const Touchable = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;

const ProfileNumber = ({ header, number, onPress = undefined }) => (
	<Touchable onPress={onPress} activeOpacity={0.8}>
		<View style={styles.container}>
			<Text style={styles.numberStyle}>{number}</Text>
			<Text style={styles.titleStyle}>{header}</Text>
		</View>
	</Touchable>
);
export default ProfileNumber;
