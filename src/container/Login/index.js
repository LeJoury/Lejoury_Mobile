import React, { useState } from 'react';
import { View, TextInput } from 'react-native';

import { Color, Styles, Languages } from '@common';
import { ButtonIndex } from '@components';

import styles from './styles';

const Login = (props) => {
	const [ username, setUsername ] = useState('');
	const [ isUsernameFocus, setUsernameFocus ] = useState(false);

	const [ password, setPassword ] = useState('');
	const [ isPasswordFocus, setPasswordFocus ] = useState(false);

	const onChangeUsername = (name) => {
		setUsername(name);
	};

	const onChangePassword = (password) => {
		setPassword(password);
	};

	const shouldButtonDisabled = () => {
		if (username && password) return false;
		else return true;
	};

	const buttonTextColor = shouldButtonDisabled() ? Color.lightGrey1 : Color.primary;

	const buttonStyle = shouldButtonDisabled()
		? { backgroundColor: Color.lightGrey6 }
		: { backgroundColor: Color.white };

	return (
		<View style={styles.loginForm}>
			<View style={styles.inputWrap}>
				<TextInput
					{...commonInputProps}
					underlineColorAndroid={'transparent'}
					placeholder={Languages.username}
					selectionColor={Color.textSelectionColor}
					keyboardType={'email-address'}
					onChangeText={onChangeUsername}
					onFocus={() => setUsernameFocus(true)}
					onBlur={() => {
						setUsernameFocus(false);
					}}
					returnKeyType={'next'}
					value={username}
					style={[ styles.input, { borderColor: isUsernameFocus ? Color.primary : Color.lightGrey6 } ]}
				/>
			</View>

			<View style={styles.inputWrap}>
				<TextInput
					{...commonInputProps}
					underlineColorAndroid={'transparent'}
					placeholder={Languages.password}
					selectionColor={Color.textSelectionColor}
					secureTextEntry={true}
					onChangeText={onChangePassword}
					onFocus={() => setPasswordFocus(true)}
					onBlur={() => {
						setPasswordFocus(false);
					}}
					returnKeyType={'go'}
					value={password}
					style={[ styles.input, { borderColor: isPasswordFocus ? Color.primary : Color.lightGrey6 } ]}
				/>
			</View>

			<View style={styles.buttonWrap}>
				<ButtonIndex
					disabled={shouldButtonDisabled()}
					text={Languages.Login}
					textColor={buttonTextColor}
					containerStyle={[ styles.loginButton, buttonStyle ]}
					onPress={() => props.onLoginWithEmail(username, password)}
				/>
			</View>
		</View>
	);
};

const commonInputProps = {
	style: styles.input,
	underlineColorAndroid: 'transparent',
	placeholderTextColor: Color.lightGrey3
};

export default Login;
