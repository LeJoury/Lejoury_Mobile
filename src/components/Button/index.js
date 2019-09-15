/**
 * Created by InspireUI on 17/02/2017.
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Styles, Color } from '@common';

class Button extends React.Component {
	render() {
		const {
			text,
			icon,
			onPress,
			button,
			containerStyle,
			textStyle,
			containerColor,
			textColor,
			disabled
		} = this.props;
		return (
			<TouchableOpacity
				disabled={disabled}
				style={[ styles.container, button, { backgroundColor: containerColor }, containerStyle ]}
				onPress={onPress}
			>
				<Text style={[ styles.text, { color: textColor }, textStyle ]}>{text}</Text>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		minHeight: 44,
		padding: 10,
		flexDirection: 'row'
	},
	text: {
		fontWeight: 'bold',
		fontFamily: 'Quicksand-Regular'
	},
	icon: {
		marginRight: 10
	}
});

Button.defaultProps = {
	text: 'Button',
	onPress: () => 'Button pressed!',
	containerStyle: {},
	textStyle: {},
	containerColor: Color.theme2,
	textColor: 'white'
};

export default Button;
