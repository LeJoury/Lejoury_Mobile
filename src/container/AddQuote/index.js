import React, { useState, useEffect } from 'react';
import { View, Text, Animated, Dimensions } from 'react-native';

import { Button, AnimatedTextInput } from '@components';
import { Styles, Languages, Color, Device, createStaggerAnimationStyle } from '@common';

import styles from './styles';

const { width, height } = Dimensions.get('window');

const AddQuote = (props) => {
	const [ quoteBox ] = useState(new Animated.Value(0));
	const [ confirmButtonBox ] = useState(new Animated.Value(0));

	const [ quote, setQuote ] = useState('');
	const [ isQuoteFocus, setQuoteFocus ] = useState(false);

	const onChangeQuote = (value) => {
		setQuote(value);
	};

	useEffect(() => {
		Animated.stagger(100, [
			Animated.timing(quoteBox, {
				toValue: 1,
				duration: 200
			}),
			Animated.timing(confirmButtonBox, {
				toValue: 1,
				duration: 200
			})
		]).start(() => {
			this._quote.getNode().focus();
		});
	}, []);
	
	const quoteBoxStyle = createStaggerAnimationStyle(quoteBox);
	const confirmButtonBoxStyle = createStaggerAnimationStyle(confirmButtonBox);

	return (
		<View style={styles.container}>
			<View style={styles.subContainer}>
				<Text style={styles.finalStepTitleStyle}>One More Step !</Text>
				<Text style={styles.finalStepTextStyle}>Any Quote of the trip you want to share ?</Text>
				<AnimatedTextInput
					inputRef={(ref) => (this._quote = ref)}
					inputStyle={[
						styles.input,
						quoteBoxStyle,
						{ borderColor: isQuoteFocus ? Color.primary : Color.lightGrey6 }
					]}
					placeholder={Languages.ShareYourQuote}
					onFocus={() => setQuoteFocus(true)}
					onBlur={() => setQuoteFocus(false)}
					onChangeText={(text) => onChangeQuote(text)}
					value={quote}
				/>
			</View>
			<Animated.View style={[ styles.buttonWrap, confirmButtonBoxStyle ]}>
				<Button
					text={Languages.Confirm}
					textStyle={styles.confirmTextStyle}
					containerStyle={styles.confirmButton}
					// onPress={() => props.onLoginWithEmail(emailAddress, password)}
				/>
			</Animated.View>
		</View>
	);
};
export default AddQuote;
