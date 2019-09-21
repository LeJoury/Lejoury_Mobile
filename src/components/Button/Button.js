import React from 'react';
import {
	Dimensions,
	StyleSheet,
	TouchableOpacity,
	View,
	Image,
	Platform,
	TouchableHighlight,
	Text
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ActionButton from 'react-native-action-button';

import { Color } from '@common';

const { width, height } = Dimensions.get('window');

const Button = (props) => {
	console.log(props);
	if (props.type === 'image') {
		return <ImageButton {...props} />;
	} else if (props.type === 'tab') {
		return <TabButton {...props} />;
	} else if (props.type === 'gradient') {
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
		<TouchableOpacity
			disabled={props.disabled}
			onPress={() => props.onPress()}
			style={[ styles.gradientButtonContainer, props.buttonBGColor ]}
			activeOpacity={0.9}
		>
			<Text style={[ styles.text, props.textStyle ]}>{props.text}</Text>
		</TouchableOpacity>
	</LinearGradient>
);

const GradientButton = (props) => (
	<TouchableOpacity
		disabled={props.disabled}
		onPress={() => props.onPress()}
		style={props.buttonContainerStyle}
		activeOpacity={0.6}
		underlayColor="#ccc"
	>
		<LinearGradient
			style={props.containerStyle}
			colors={props.gradientColors}
			start={{ x: -0.15, y: 0.15 }}
			end={{ x: 0.05, y: 1.0 }}
		>
			<Text style={[ styles.text, props.textStyle ]}>{props.text}</Text>
		</LinearGradient>
	</TouchableOpacity>
);

const StandardButton = (props) => (
	<TouchableOpacity
		disabled={props.disabled}
		onPress={() => props.onPress()}
		style={[ styles.button, props.style, props.inactive && { backgroundColor: '#C6D8E4' } ]}
		activeOpacity={0.9}
		underlayColor="#ccc"
	>
		<Text style={[ styles.text, props.textStyle ]}>{props.text}</Text>
	</TouchableOpacity>
);

const ImageButton = (props) => (
	<TouchableHighlight
		disabled={props.disabled}
		onPress={() => props.onPress()}
		activeOpacity={0.8}
		underlayColor={'#eeeeee'}
		style={props.buttonStyle}
	>
		<Image
			{...props}
			defaultSource={props.defaultSource}
			style={[
				props.imageStyle,
				props.isAddWishList && { tintColor: Color.heartActiveWishList },
				props.isAddToCart && { tintColor: Color.TabActive }
			]}
			resizeMode="contain"
		/>
	</TouchableHighlight>
);

const TabButton = (props) => (
	<TouchableOpacity onPress={() => props.onPress()} activeOpacity={0} selected={props.selected}>
		<View style={[ styles.tabButton, props.buttonStyle, props.selected && styles.tabActive ]}>
			<Text style={[ styles.tabButtonText, props.textStyle, props.selected && styles.tabActiveText ]}>
				{props.text}
			</Text>
		</View>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	tabActiveText: {
		color: Color.TabActiveText
	},
	tabActive: {
		marginTop: 1,
		borderBottomWidth: 2,
		borderBottomColor: Color.TabActive
	},
	button: {
		backgroundColor: '#0B4A7D',
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttonView: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	imageIcon: {
		resizeMode: 'contain',
		width: 20,
		marginRight: 8
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
	tabButton: {
		height: 50,
		justifyContent: 'center'
	},
	tabButtonText: {
		marginLeft: 10,
		marginRight: 10,
		textAlign: 'center',
		fontSize: 12
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

export default Button;
