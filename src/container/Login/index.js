import React, { useState, useEffect } from 'react';
import { View, TouchableWithoutFeedback, Animated, Text } from 'react-native';

import { Button, AnimatedTextInput } from '@components';
import { Color, Languages, createStaggerAnimationStyle } from '@common';

import styles from './styles';

const Login = (props) => {
	const [ emailAddressBox ] = useState(new Animated.Value(0));
	const [ passwordBox ] = useState(new Animated.Value(0));
	const [ forgotPasswordBox ] = useState(new Animated.Value(0));
	const [ loginButtonBox ] = useState(new Animated.Value(0));

	const [ emailAddress, setEmailAddress ] = useState('');
	const [ isEmailAddressFocus, setEmailAddressFocus ] = useState(false);

	const [ password, setPassword ] = useState('');
	const [ isPasswordFocus, setPasswordFocus ] = useState(false);

	const onChangeEmailAddress = (value) => {
		setEmailAddress(value);
	};

	const onChangePassword = (value) => {
		setPassword(value);
	};

	const shouldButtonDisabled = () => {
		if (emailAddress && password) {
			return false;
		} else {
			return true;
		}
	};

	useEffect(() => {
		Animated.stagger(100, [
			Animated.timing(emailAddressBox, {
				toValue: 1,
				duration: 200
			}),
			Animated.timing(passwordBox, {
				toValue: 1,
				duration: 200
			}),
			Animated.timing(forgotPasswordBox, {
				toValue: 1,
				duration: 200
			}),
			Animated.timing(loginButtonBox, {
				toValue: 1,
				duration: 200
			})
		]).start(() => {
			this._emailAddress.getNode().focus();
		});
	}, []);

	const buttonTextColor = shouldButtonDisabled() ? { color: Color.lightGrey1 } : { color: Color.white };

	const buttonStyle = shouldButtonDisabled()
		? { backgroundColor: Color.lightGrey6, shadowOpacity: 0 }
		: { backgroundColor: Color.splashScreenBg5, shadowOpacity: 0.5 };

	const emailAddressBoxStyle = createStaggerAnimationStyle(emailAddressBox);
	const passwordBoxStyle = createStaggerAnimationStyle(passwordBox);
	const forgotPasswordBoxStyle = createStaggerAnimationStyle(forgotPasswordBox);
	const loginButtonBoxStyle = createStaggerAnimationStyle(loginButtonBox);

	return (
		<View style={styles.loginForm}>
			<View style={[ styles.inputWrap, { marginTop: 0 } ]}>
				<AnimatedTextInput
					inputRef={(ref) => (this._emailAddress = ref)}
					inputStyle={[
						emailAddressBoxStyle,
						styles.input,
						{ borderColor: isEmailAddressFocus ? Color.primary : Color.lightGrey6 }
					]}
					placeholder={Languages.Email}
					keyboardType="email-address"
					onFocus={() => setEmailAddressFocus(true)}
					onBlur={() => setEmailAddressFocus(false)}
					onChangeText={(text) => onChangeEmailAddress(text)}
					onSubmitEditing={() => this._password.getNode().focus()}
					blurOnSubmit={false}
					value={emailAddress}
					returnKeyType={'next'}
				/>
			</View>

			<View style={styles.inputWrap}>
				<AnimatedTextInput
					inputRef={(ref) => (this._password = ref)}
					inputStyle={[
						passwordBoxStyle,
						styles.input,
						{ borderColor: isPasswordFocus ? Color.primary : Color.lightGrey6 }
					]}
					placeholder={Languages.password}
					secureTextEntry={true}
					onFocus={() => setPasswordFocus(true)}
					onBlur={() => setPasswordFocus(false)}
					onChangeText={(text) => onChangePassword(text)}
					blurOnSubmit={true}
					returnKeyType={'go'}
					value={password}
				/>
			</View>

			<Animated.View style={[ styles.forgotPasswordContainer, forgotPasswordBoxStyle ]}>
				<TouchableWithoutFeedback onPress={() => props.onNavigateToForgotPassword()}>
					<Text style={styles.forgotPasswordText}>{Languages.ForgotPassword}</Text>
				</TouchableWithoutFeedback>
			</Animated.View>

			<Animated.View style={[ styles.buttonWrap, loginButtonBoxStyle ]}>
				<Button
					disabled={shouldButtonDisabled()}
					text={Languages.Login}
					textStyle={[ styles.loginTextStyle, buttonTextColor ]}
					containerStyle={[ styles.loginButton, buttonStyle ]}
					onPress={() => props.onLoginWithEmail(emailAddress, password)}
				/>
			</Animated.View>
		</View>
	);
};

export default Login;
