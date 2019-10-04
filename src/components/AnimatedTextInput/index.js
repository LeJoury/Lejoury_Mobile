import React from 'react';
import { TextInput, Animated } from 'react-native';

import { Color } from '@common';

const AnimateTextInput = Animated.createAnimatedComponent(TextInput);

const AnimatedTextInput = (props) => {
	const {
		inputRef = null,
		inputStyle,
		placeHolderColor = Color.lightGrey3,
		selectionColor = Color.textSelectionColor,
		autoCapitalize = 'none',
		onFocus = null,
		onBlur = null,
		onChangeText = null,
	} = props;

	return (
		<AnimateTextInput
			ref={(ref) => inputRef(ref)}
			style={inputStyle}
			underlineColorAndroid={'transparent'}
			placeholderTextColor={placeHolderColor}
			selectionColor={selectionColor}
			autoCapitalize={autoCapitalize}
			onFocus={() => onFocus}
			onBlur={() => onBlur}
			onChangeText={(text) => onChangeText(text)}
			{...props}
		/>
	);
};
export default AnimatedTextInput;
