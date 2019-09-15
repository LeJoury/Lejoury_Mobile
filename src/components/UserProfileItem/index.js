import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import { Color } from '@common';
import styles from './styles';

export default class UserProfileItem extends PureComponent {
	static propTypes = {
		label: PropTypes.string,
		value: PropTypes.string
	};

	static defaultProps = {
		icon: false
	};

	render() {
		const { label, value, onPress } = this.props;

		return (
			<TouchableOpacity style={styles.row} onPress={onPress}>
				<Text style={styles.leftText}>{label}</Text>
				<View style={styles.rightContainer}>
					<Text style={styles.rightText}>{value}</Text>
					{!value && <Icon name="chevron-right" type="feather" color={Color.lightGrey1} />}
				</View>
			</TouchableOpacity>
		);
	}
}
