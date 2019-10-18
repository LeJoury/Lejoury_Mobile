import React, { useState, useEffect } from 'react';
import { View, Text, Animated } from 'react-native';

import { Button, AnimatedTextInput } from '@components';
import { Color, Languages, validateEmail, validatePassword, createStaggerAnimationStyle } from '@common';

import styles from './styles';

const Register = (props) => {
	const [ usernameBox ] = useState(new Animated.Value(0));
	const [ emailAddressBox ] = useState(new Animated.Value(0));
	const [ passwordBox ] = useState(new Animated.Value(0));
	const [ registerButtonBox ] = useState(new Animated.Value(0));

	const [ username, setUsername ] = useState('');
	const [ isUsernameDirty, setUsernameDirty ] = useState(false);
	const [ isUsernameFocus, setUsernameFocus ] = useState(false);
	const [ hasUsernameError, setUsernameError ] = useState(false);

	const [ emailAddress, setEmailAddress ] = useState('');
	const [ isEmailAddressDirty, setEmailAddressDirty ] = useState(false);
	const [ isEmailAddressFocus, setEmailAddressFocus ] = useState(false);
	const [ hasEmailAddressError, setEmailAddressError ] = useState(false);

	const [ password, setPassword ] = useState('');
	const [ isPasswordDirty, setPasswordDirty ] = useState(false);
	const [ isPasswordFocus, setPasswordFocus ] = useState(false);
	const [ hasPasswordError, setPasswordError ] = useState(false);

	useEffect(() => {
		Animated.stagger(100, [
			Animated.timing(usernameBox, {
				toValue: 1,
				duration: 200
			}),
			Animated.timing(emailAddressBox, {
				toValue: 1,
				duration: 200
			}),
			Animated.timing(passwordBox, {
				toValue: 1,
				duration: 200
			}),
			Animated.timing(registerButtonBox, {
				toValue: 1,
				duration: 200
			})
		]).start(() => {
			this._username.getNode().focus();
		});
	}, []);

	const onChangeUsername = (name) => {
		setUsernameDirty(true);
		setUsername(name);
	};

	const onChangeEmailAddress = (value) => {
		setEmailAddressDirty(true);
		setEmailAddress(value);
	};

	const onChangePassword = (value) => {
		setPasswordDirty(true);
		setPassword(value);
	};

	const renderUsernameError = () => {
		const opacity = hasUsernameError ? 1 : 0;

		return (
			<View style={{ opacity, flex: 1 }}>
				<Text style={styles.error}>{Languages.UsernameErrorMessage}</Text>
			</View>
		);
	};

	const renderEmailAddressError = () => {
		const opacity = hasEmailAddressError ? 1 : 0;

		return (
			<View style={{ opacity, flex: 1 }}>
				<Text style={styles.error}>{Languages.EmailAddressErrorMessage}</Text>
			</View>
		);
	};

	const renderPasswordError = () => {
		const opacity = hasPasswordError ? 1 : 0;

		return (
			<View style={{ opacity, flex: 1 }}>
				<Text style={styles.error}>{Languages.PasswordErrorMessage}</Text>
			</View>
		);
	};

	const shouldButtonDisabled = () => {
		const validUsername = isUsernameDirty && username.length >= 6;
		const validEmailAddress = isEmailAddressDirty && validateEmail(emailAddress);
		const validPassword = isPasswordDirty && validatePassword(password);

		if (validUsername && validEmailAddress && validPassword) {
			return false;
		} else {
			return true;
		}
	};

	const buttonTextColor = shouldButtonDisabled() ? { color: Color.lightGrey1 } : { color: Color.white };

	const buttonStyle = shouldButtonDisabled()
		? { backgroundColor: Color.lightGrey6, shadowOpacity: 0 }
		: { backgroundColor: Color.splashScreenBg5, shadowOpacity: 0.5 };

	const usernameBoxStyle = createStaggerAnimationStyle(usernameBox);
	const emailAddressBoxStyle = createStaggerAnimationStyle(emailAddressBox);
	const passwordBoxStyle = createStaggerAnimationStyle(passwordBox);
	const registerButtonBoxStyle = createStaggerAnimationStyle(registerButtonBox);

	return (
		<View style={styles.loginForm}>
			<View style={[ styles.inputWrap, { marginTop: 0 } ]}>
				<AnimatedTextInput
					inputRef={(ref) => (this._username = ref)}
					underlineColorAndroid={'transparent'}
					inputStyle={[
						styles.input,
						usernameBoxStyle,
						{ borderColor: isUsernameFocus ? Color.primary : Color.lightGrey6 }
					]}
					placeholder={Languages.username}
					onChangeText={(text) => onChangeUsername(text)}
					onFocus={() => setUsernameFocus(true)}
					onBlur={() => {
						setUsernameError(isUsernameDirty && username.length < 6);
						setUsernameFocus(false);
					}}
					onSubmitEditing={() => this._emailAddress.getNode().focus()}
					blurOnSubmit={false}
					returnKeyType={'next'}
					value={username}
				/>
				{renderUsernameError()}
			</View>
			<View style={styles.inputWrap}>
				<AnimatedTextInput
					inputRef={(ref) => (this._emailAddress = ref)}
					inputStyle={[
						styles.input,
						emailAddressBoxStyle,
						{ borderColor: isEmailAddressFocus ? Color.primary : Color.lightGrey6 }
					]}
					placeholder={Languages.Email}
					keyboardType="email-address"
					onChangeText={(text) => onChangeEmailAddress(text)}
					onFocus={() => setEmailAddressFocus(true)}
					onBlur={() => {
						setEmailAddressError(isEmailAddressDirty && !validateEmail(emailAddress));
						setEmailAddressFocus(false);
					}}
					onSubmitEditing={() => this._password.getNode().focus()}
					blurOnSubmit={false}
					value={emailAddress}
					returnKeyType={'next'}
				/>
				{renderEmailAddressError()}
			</View>
			<View style={styles.inputWrap}>
				<AnimatedTextInput
					inputRef={(ref) => (this._password = ref)}
					underlineColorAndroid={'transparent'}
					inputStyle={[
						styles.input,
						passwordBoxStyle,
						{ borderColor: isPasswordFocus ? Color.primary : Color.lightGrey6 }
					]}
					placeholder={Languages.password}
					keyboardType="email-address"
					secureTextEntry={true}
					onChangeText={(text) => onChangePassword(text)}
					onFocus={() => setPasswordFocus(true)}
					onBlur={() => {
						setPasswordError(isPasswordDirty && !validatePassword(password));
						setPasswordFocus(false);
					}}
					blurOnSubmit={true}
					returnKeyType={'next'}
					value={password}
				/>
				{renderPasswordError()}
			</View>
			<Animated.View style={[ styles.buttonWrap, registerButtonBoxStyle ]}>
				<Button
					disabled={shouldButtonDisabled()}
					text={Languages.Register}
					textStyle={[ styles.registerTextStyle, buttonTextColor ]}
					containerStyle={[ styles.registerButton, buttonStyle ]}
					onPress={() => props.onRegisterWithEmail(username, emailAddress, password)}
				/>
			</Animated.View>
		</View>
	);
};

// const mapStateToProps = ({  user }) => ({
// 	user
// });

export default Register;
