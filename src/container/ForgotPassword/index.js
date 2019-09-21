import React, { useState, useEffect } from 'react';
import { View, TextInput, Animated, KeyboardAvoidingView } from 'react-native';

import { ButtonIndex, Spinner } from '@components';
import { Color, Languages, showOkAlert, validateEmail, createStaggerAnimationStyle } from '@common';

import styles from './styles';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const ForgotPassword = (props) => {
	const [ emailTitleBox ] = useState(new Animated.Value(0));
	const [ emailAddressBox ] = useState(new Animated.Value(0));
	const [ sendButtonBox ] = useState(new Animated.Value(0));

	const [ emailAddress, setEmailAddress ] = useState('');
	const [ isEmailAddressFocus, setEmailAddressFocus ] = useState(false);
	const [ isEmailAddressDirty, setEmailAddressDirty ] = useState(false);

	useEffect(() => {
		Animated.stagger(100, [
			Animated.timing(emailTitleBox, {
				toValue: 1,
				duration: 200
			}),
			Animated.timing(emailAddressBox, {
				toValue: 1,
				duration: 200
			}),
			Animated.timing(sendButtonBox, {
				toValue: 1,
				duration: 200
			})
		]).start(() => {
			this._emailAddress.getNode().focus();
		});
	}, []);

	const onChangeEmailAddress = (value) => {
		setEmailAddressDirty(true);
		setEmailAddress(value);
	};

	const onSubmitPress = () => {
		console.log(emailAddress);
	};

	const shouldButtonDisabled = () => {
		const validEmailAddress = isEmailAddressDirty && validateEmail(emailAddress);

		if (validEmailAddress) {
			return false;
		} else {
			return true;
		}
	};

	const buttonTextColor = shouldButtonDisabled() ? Color.lightGrey1 : Color.white;

	const buttonStyle = shouldButtonDisabled()
		? { backgroundColor: Color.lightGrey6, shadowOpacity: 0 }
		: { backgroundColor: Color.splashScreenBg5, shadowOpacity: 0.5 };

	const emailAddressTitleBoxStyle = createStaggerAnimationStyle(emailTitleBox);
	const emailAddressBoxStyle = createStaggerAnimationStyle(emailAddressBox);
	const sendButtonBoxStyle = createStaggerAnimationStyle(sendButtonBox);

	return (
		<View style={styles.container}>
			<KeyboardAvoidingView style={styles.form} behavior="padding">
				<View>
					<Animated.Text style={[ styles.forgotPasswordText, emailAddressTitleBoxStyle ]}>
						{Languages.ForgotPasswordMessage}
					</Animated.Text>
					<AnimatedTextInput
						ref={(email) => (this._emailAddress = email)}
						style={[
							styles.input,
							emailAddressBoxStyle,
							{ borderColor: isEmailAddressFocus ? Color.primary : Color.lightGrey6 }
						]}
						underlineColorAndroid={'transparent'}
						placeholderTextColor={Color.lightGrey3}
						placeholder={Languages.Email}
						keyboardType="email-address"
						selectionColor={Color.textSelectionColor}
						autoCapitalize={'none'}
						onFocus={() => setEmailAddressFocus(true)}
						onBlur={() => {
							setEmailAddressFocus(false);
						}}
						onChangeText={onChangeEmailAddress}
						value={emailAddress}
					/>

					<Animated.View style={[ sendButtonBoxStyle ]}>
						<ButtonIndex
							disabled={shouldButtonDisabled()}
							text={Languages.Submit}
							textColor={buttonTextColor}
							containerStyle={[ styles.button, buttonStyle ]}
							onPress={onSubmitPress}
						/>
					</Animated.View>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
};

export default ForgotPassword;
