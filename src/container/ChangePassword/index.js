import React, { Component } from 'react';
import { View, Text, BackHandler, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Icon } from 'react-native-elements';

import { connect } from 'react-redux';
import { changePassword } from '@actions';

import { Images, Color, Styles, Languages, toCapitalized, Constants, showOkAlert } from '@common';
import { Button, CheckLabelBox, Spinner } from '@components';

import styles from './styles';

const LENGTHPASSWORD = '1';
const CAPITALPASSWORD = '2';
const MATCHPASSWORD = '3';

const { Mode, Sizes } = Constants.Spinner;

class ChangePassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			current_password: '',
			new_password: '',
			confirm_password: '',
			isLoading: false,
			message: '',
			isError: true,
			newToken: ''
		};

		this.onCurrentPasswordEditHandle = (current_password) => this.setState({ current_password });
		this.onNewPasswordEditHandle = (new_password) => this.setState({ new_password });
		this.onConfirmPasswordEditHandle = (confirm_password) => this.setState({ confirm_password });
	}

	componentWillMount() {
		BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
	}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
	}

	handleBackButtonClick = () => {
		this.props.navigation.goBack(null);
		return true;
	};

	getColor(type) {
		const { new_password, confirm_password } = this.state;

		if (type === LENGTHPASSWORD) {
			return new_password.length > 6 ? Color.green1 : Color.grey1;
		} else if (type === CAPITALPASSWORD) {
			return /[A-Z]/.test(new_password) ? Color.green1 : Color.grey1;
		} else if (type === MATCHPASSWORD) {
			return new_password !== '' && new_password === confirm_password ? Color.green1 : Color.grey1;
		}
	}

	onSubmitChangePassword = async () => {
		const { current_password, new_password, isLoading } = this.state;
		const { token, userId } = this.props.user;

		if (isLoading) return;

		try {
			let response = await this.props.changePassword(userId, current_password, new_password, token);
			if (response.OK) {
				showOkAlert(Languages.ChangePasswordSuccessTitle, response.message, Languages.OK, () => {
					this.props.navigation.goBack(null);
				});
			} else {
				showOkAlert(Languages.Error, Languages.SomethingWentWrong, Languages.OK);
			}
			this.setState({ isLoading: false });
		} catch (error) {
			showOkAlert(Languages.Error, Languages.SomethingWentWrong, Languages.OK);
			this.setState({ isLoading: false });
		}
	};

	renderSubmitButton() {
		const { current_password, new_password, confirm_password } = this.state;

		const disabledButton = !(
			new_password.length > 6 &&
			/[A-Z]/.test(new_password) &&
			new_password !== '' &&
			new_password === confirm_password &&
			current_password.length > 6
		);

		return (
			<View style={styles.buttonWrap}>
				<Button
					disabled={disabledButton}
					text={Languages.Submit}
					textStyle={styles.buttonTextStyle}
					containerStyle={disabledButton ? styles.disabledButton : styles.submitButton}
					onPress={() => this.onSubmitChangePassword()}
				/>
			</View>
		);
	}

	renderLoading() {
		const { isLoading } = this.state;

		if (!isLoading) return;

		return <Spinner mode={Mode.overlayLogin} size={Sizes.LARGE} color={Color.lightTextPrimary} />;
	}

	render() {
		const { current_password, new_password, confirm_password } = this.state;
		return (
			<KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
				<View style={styles.subContain}>
					<View>
						<View style={styles.inputWrap}>
							<TextInput
								{...commonInputProps}
								ref="current_password"
								placeholder={Languages.currentPassword}
								secureTextEntry={true}
								onChangeText={this.onCurrentPasswordEditHandle}
								returnKeyType={'next'}
								value={current_password}
							/>
						</View>
						<View style={styles.inputWrap}>
							<TextInput
								{...commonInputProps}
								ref="new_password"
								placeholder={Languages.newPassword}
								secureTextEntry={true}
								onChangeText={this.onNewPasswordEditHandle}
								returnKeyType={'next'}
								value={new_password}
							/>
						</View>
						<View style={styles.inputWrap}>
							<TextInput
								{...commonInputProps}
								ref="confirm_password"
								placeholder={Languages.confirmPassword}
								secureTextEntry={true}
								onChangeText={this.onConfirmPasswordEditHandle}
								returnKeyType={'next'}
								value={confirm_password}
							/>
						</View>
						<View style={styles.checkButtonContainer}>
							<CheckLabelBox color={this.getColor(LENGTHPASSWORD)} label={Languages.mustMatchLength} />
							<CheckLabelBox
								color={this.getColor(CAPITALPASSWORD)}
								label={Languages.mustContainCapital}
							/>
							<CheckLabelBox color={this.getColor(MATCHPASSWORD)} label={Languages.mustMatchPassword} />
						</View>
					</View>
				</View>
				{this.renderLoading()}
				{this.renderSubmitButton()}
			</KeyboardAwareScrollView>
		);
	}
}

const commonInputProps = {
	style: styles.input,
	underlineColorAndroid: 'transparent',
	placeholderTextColor: Color.blackTextSecondary
};

const mapStateToProps = ({ netInfo, user }) => ({
	netInfo,
	user
});

export default connect(mapStateToProps, { changePassword })(ChangePassword);
