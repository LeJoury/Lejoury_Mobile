import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { Color } from '@common';

import styles from './styles';

const CheckLabelBox = ({ label, color }) => (
	<View style={styles.container}>
		<View style={[ styles.circleContainer, { borderColor: color } ]}>
			<Icon color={color} size={12} name="check" />
		</View>
		<Text style={[ styles.labelContainer, { color } ]}>{label}</Text>
	</View>
);

export default CheckLabelBox;
