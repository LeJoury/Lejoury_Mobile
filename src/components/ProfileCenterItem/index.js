import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import styles from './styles';

const ProfileCenterItem = ({ label, onPress }) => (
	<TouchableOpacity style={styles.centerRow} onPress={onPress}>
		<Text style={styles.leftText}>{label}</Text>
	</TouchableOpacity>
);

export default ProfileCenterItem;
