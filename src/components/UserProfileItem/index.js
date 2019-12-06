import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Platform, TouchableNativeFeedback } from 'react-native';
import { Icon } from 'react-native-elements';

import { Color } from '@common';
import styles from './styles';
const Touchable = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;

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
			<Touchable onPress={onPress} activeOpacity={0.8}>
				<View style={styles.row}>
					<Text style={styles.leftText}>{label}</Text>
					<View style={styles.rightContainer}>
						<Text style={styles.rightText}>{value}</Text>
						{!value && <Icon name="chevron-right" type="feather" color={Color.lightGrey1} />}
					</View>
				</View>
			</Touchable>
		);
	}
}
