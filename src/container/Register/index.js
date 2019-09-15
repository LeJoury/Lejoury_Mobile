import React, { useState, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';

// import { connect } from 'react-redux';
// import { login, dismissLoginDialog } from '@actions';

import { Color, Styles, Languages, validateEmail, validatePassword } from '@common';
import { ButtonIndex } from '@components';

import styles from './styles';

const Register = (props) => {
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

	useEffect(() => {}, []);

	const onChangeUsername = (name) => {
		setUsernameDirty(true);
		setUsername(name);
	};

	const onChangeEmailAddress = (emailAddress) => {
		setEmailAddressDirty(true);
		setEmailAddress(emailAddress);
	};

	const onChangePassword = (password) => {
		setPasswordDirty(true);
		setPassword(password);
	};

	const onRegisterPress = () => {
		const isValidDetails = !shouldButtonDisabled;

		// if (isValidDetails) then register
		// props.onRegisterWithEmail(username, emailAddress, password)
	};

	renderUsernameError = () => {
		const opacity = hasUsernameError ? 1 : 0;

		return (
			<View style={{ opacity, flex: 1 }}>
				<Text style={styles.error}>{Languages.UsernameErrorMessage}</Text>
			</View>
		);
	};

	renderEmailAddressError = () => {
		const opacity = hasEmailAddressError ? 1 : 0;

		return (
			<View style={{ opacity, flex: 1 }}>
				<Text style={styles.error}>{Languages.EmailAddressErrorMessage}</Text>
			</View>
		);
	};

	renderPasswordError = () => {
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
		} else return true;
	};

	const buttonTextColor = shouldButtonDisabled() ? Color.lightGrey1 : Color.primary;

	const buttonStyle = shouldButtonDisabled()
		? { backgroundColor: Color.lightGrey6 }
		: { backgroundColor: Color.white };

	// renderRegisterButton = () => {};

	return (
		<View style={styles.loginForm}>
			<View style={styles.sectionWrapper}>
				<Text style={styles.sectionHeaderStyle}>{Languages.AccountInfo}</Text>
			</View>
			<View style={[ styles.inputWrap, { marginTop: 12 } ]}>
				<TextInput
					underlineColorAndroid={'transparent'}
					placeholderTextColor={Color.lightGrey3}
					placeholder={Languages.username}
					selectionColor={Color.textSelectionColor}
					onChangeText={onChangeUsername}
					onFocus={() => setUsernameFocus(true)}
					onBlur={() => {
						setUsernameError(isUsernameDirty && username.length < 6);
						setUsernameFocus(false);
					}}
					returnKeyType={'next'}
					value={username}
					style={[ styles.input, { borderColor: isUsernameFocus ? Color.primary : Color.lightGrey6 } ]}
				/>
				{renderUsernameError()}
			</View>
			<View style={styles.inputWrap}>
				<TextInput
					underlineColorAndroid={'transparent'}
					placeholderTextColor={Color.lightGrey3}
					placeholder={Languages.Email}
					selectionColor={Color.textSelectionColor}
					keyboardType={'email-address'}
					onChangeText={onChangeEmailAddress}
					onFocus={() => setEmailAddressFocus(true)}
					onBlur={() => {
						setEmailAddressError(isEmailAddressDirty && !validateEmail(emailAddress));
						setEmailAddressFocus(false);
					}}
					returnKeyType={'next'}
					value={emailAddress}
					style={[ styles.input, { borderColor: isEmailAddressFocus ? Color.primary : Color.lightGrey6 } ]}
				/>
				{renderEmailAddressError()}
			</View>
			<View style={styles.inputWrap}>
				<TextInput
					underlineColorAndroid={'transparent'}
					placeholderTextColor={Color.lightGrey3}
					placeholder={Languages.password}
					selectionColor={Color.textSelectionColor}
					secureTextEntry={true}
					onChangeText={onChangePassword}
					onFocus={() => setPasswordFocus(true)}
					onBlur={() => {
						setPasswordError(isPasswordDirty && !validatePassword(password));
						setPasswordFocus(false);
					}}
					returnKeyType={'go'}
					value={password}
					style={[ styles.input, { borderColor: isPasswordFocus ? Color.primary : Color.lightGrey6 } ]}
				/>
				{renderPasswordError()}
			</View>
			<View style={styles.buttonWrap}>
				<ButtonIndex
					disabled={shouldButtonDisabled()}
					text={Languages.Register}
					textColor={Color.primary}
					textColor={buttonTextColor}
					containerStyle={[ styles.registerButton, buttonStyle ]}
					onPress={onRegisterPress}
				/>
			</View>
		</View>
	);
};

// const mapStateToProps = ({ netInfo, user }) => ({
// 	netInfo,
// 	user
// });

export default Register;
