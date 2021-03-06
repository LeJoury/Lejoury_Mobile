import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, Text, Platform, View, TouchableNativeFeedback } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ActionButton from 'react-native-action-button';
import _ from 'lodash';

import { Color } from '@common';
const { width, height } = Dimensions.get('window');
const Touchable = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;

const withPreventDoubleClick = (WrappedComponent) => {
	class PreventDoubleClick extends React.PureComponent {
		debouncedOnPress = () => {
			this.props.onPress && this.props.onPress();
		};

		onPress = _.debounce(this.debouncedOnPress, 300, { leading: true, trailing: false });

		render() {
			return <WrappedComponent {...this.props} onPress={this.onPress} />;
		}
	}

	PreventDoubleClick.displayName = `withPreventDoubleClick(${WrappedComponent.displayName || WrappedComponent.name})`;
	return PreventDoubleClick;
};

const Button = (props) => {
	if (props.type === 'gradient') {
		return <GradientButton {...props} />;
	} else if (props.type === 'gradientBorder') {
		return <GradientBorderButton {...props} />;
	} else if (props.type === 'floating') {
		return <FloatingButton {...props} />;
	} else {
		return <StandardButton {...props} />;
	}
};

const FloatingButton = (props) => (
	<ActionButton buttonColor={props.buttonColor} onPress={() => props.onPress()} degrees={0}>
		{props.icon}
	</ActionButton>
);

const GradientBorderButton = (props) => (
	<LinearGradient
		style={props.containerStyle}
		start={{ x: 0.0, y: 1.0 }}
		end={{ x: 1.0, y: 1.0 }}
		colors={props.gradientColors}
	>
		<Touchable disabled={props.disabled} onPress={() => props.onPress()} activeOpacity={0.8}>
			<View style={[ styles.gradientButtonContainer, props.buttonBGColor ]}>
				<Text style={[ styles.text, props.textStyle ]}>{props.text}</Text>
			</View>
		</Touchable>
	</LinearGradient>
);

const GradientButton = (props) => (
	<Touchable disabled={props.disabled} onPress={() => props.onPress()} activeOpacity={0.8} underlayColor="#ccc">
		<View style={props.buttonContainerStyle}>
			<LinearGradient
				style={props.containerStyle}
				colors={props.gradientColors}
				start={{ x: -0.15, y: 0.15 }}
				end={{ x: 0.05, y: 1.0 }}
			>
				<Text style={[ styles.text, props.textStyle ]}>{props.text}</Text>
			</LinearGradient>
		</View>
	</Touchable>
);

const StandardButton = (props) => {
	if (Platform.OS === 'ios') {
		return (
			<Touchable disabled={props.disabled} onPress={props.onPress} activeOpacity={0.8}>
				<View style={[ styles.container, props.containerStyle ]}>
					<Text style={[ styles.text, props.textStyle ]}>{props.text}</Text>
				</View>
			</Touchable>
		);
	} else {
		return (
			<Touchable
				disabled={props.disabled}
				onPress={props.onPress}
				background={TouchableNativeFeedback.SelectableBackground()}
			>
				<View style={[ styles.container, props.containerStyle ]}>
					<Text style={[ styles.text, props.textStyle ]}>{props.text}</Text>
				</View>
			</Touchable>
		);
	}
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#0B4A7D',
		justifyContent: 'center',
		alignItems: 'center'
	},
	text: {
		color: 'white',
		fontSize: 17,
		marginTop: 3
	},
	borderButton: {
		height: 25,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		borderRadius: 5,
		borderColor: 'white'
	},
	gradientButtonContainer: {
		width: width / 2.3 - 2,
		height: 38,
		borderRadius: 20,
		backgroundColor: Color.white,
		alignItems: 'center',
		justifyContent: 'center'
	}
});

export default withPreventDoubleClick(Button);
