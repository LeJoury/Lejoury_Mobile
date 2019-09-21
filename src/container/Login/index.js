import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableWithoutFeedback, Animated, Text } from 'react-native';

import { Color, Languages, createStaggerAnimationStyle } from '@common';
import { ButtonIndex } from '@components';

import styles from './styles';
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

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

	const buttonTextColor = shouldButtonDisabled() ? Color.lightGrey1 : Color.white;

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
					ref={(ref) => (this._emailAddress = ref)}
					underlineColorAndroid={'transparent'}
					placeholder={Languages.Email}
					placeholderTextColor={Color.lightGrey3}
					selectionColor={Color.textSelectionColor}
					autoCapitalize={'none'}
					keyboardType={'email-address'}
					onChangeText={onChangeEmailAddress}
					onFocus={() => setEmailAddressFocus(true)}
					onBlur={() => {
						setEmailAddressFocus(false);
					}}
					onSubmitEditing={() => {
						this._password.getNode().focus();
					}}
					blurOnSubmit={false}
					returnKeyType={'next'}
					value={emailAddress}
					style={[
						emailAddressBoxStyle,
						styles.input,
						{ borderColor: isEmailAddressFocus ? Color.primary : Color.lightGrey6 }
					]}
				/>
			</View>

			<View style={styles.inputWrap}>
				<AnimatedTextInput
					ref={(ref) => (this._password = ref)}
					underlineColorAndroid={'transparent'}
					placeholder={Languages.password}
					placeholderTextColor={Color.lightGrey3}
					selectionColor={Color.textSelectionColor}
					autoCapitalize={'none'}
					secureTextEntry={true}
					onChangeText={onChangePassword}
					onFocus={() => setPasswordFocus(true)}
					onBlur={() => {
						setPasswordFocus(false);
					}}
					blurOnSubmit={true}
					returnKeyType={'go'}
					value={password}
					style={[
						passwordBoxStyle,
						styles.input,
						{ borderColor: isPasswordFocus ? Color.primary : Color.lightGrey6 }
					]}
				/>
			</View>

			<Animated.View style={[ styles.forgotPasswordContainer, forgotPasswordBoxStyle ]}>
				<TouchableWithoutFeedback onPress={() => props.onNavigateToForgotPassword()}>
					<Text style={styles.forgotPasswordText}>{Languages.ForgotPassword}</Text>
				</TouchableWithoutFeedback>
			</Animated.View>

			<Animated.View style={[ styles.buttonWrap, loginButtonBoxStyle ]}>
				<ButtonIndex
					disabled={shouldButtonDisabled()}
					text={Languages.Login}
					textColor={buttonTextColor}
					containerStyle={[ styles.loginButton, buttonStyle ]}
					onPress={() => props.onLoginWithEmail(emailAddress, password)}
				/>
			</Animated.View>
		</View>
	);
};

export default Login;
