import React, { Component } from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Icon } from 'react-native-elements';
import PopupDialog, { DialogTitle, DialogButton, FadeAnimation } from 'react-native-popup-dialog'; // try to use alert

import { connect } from 'react-redux';
import { resetPassword, resetToken } from '@actions';

import { Images, Color, Styles, Languages, toCapitalized, Constants } from '@common';
import { ButtonIndex, CheckLabelBox, Spinner } from '@components';

import styles from './styles';

const LENGTHPASSWORD = '1';
const CAPITALPASSWORD = '2';
const MATCHPASSWORD = '3';

const { Mode, Sizes } = Constants.Spinner;
const fadeAnimation = new FadeAnimation({ animationDuration: 150 });

class ChangePassword extends Component {
	// static navigationOptions = ({ navigation }) => ({
	// 	headerRight: BlackBackView(),
	// });

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

	getColor(type) {
		const { new_password, confirm_password } = this.state;

		if (type == LENGTHPASSWORD) {
			return new_password.length > 6 ? Color.green1 : Color.grey1;
		} else if (type == CAPITALPASSWORD) {
			return /[A-Z]/.test(new_password) ? Color.green1 : Color.grey1;
		} else if (type == MATCHPASSWORD) {
			return new_password !== '' && new_password === confirm_password ? Color.green1 : Color.grey1;
		}
	}

	onSubmitChangePassword() {
		// const {login, netInfo} = this.props;
		// if (!netInfo.isConnected) {
		//   return toast(Languages.noConnection);
		// }
		// const { username, password, isLoading } = this.state;
		// if (isLoading) return;
		// this.setState({ isLoading: true });
		// this.props.navigation.navigate('Main');
		// // login the customer via Wordpress API and get the access token
		// const json = await WPUserAPI.login(username.trim(), password);
		// if (json === undefined) {
		//   this.stopAndToast('Can\'t get data from server');
		// } else if (json.error) {
		//   this.stopAndToast(json.error);
		// } else {
		//   let customers = await WooWorker.getCustomerById(json.user.id);
		//   customers = {...customers, username, password};
		//   login(customers, json.cookie);
		// }
		const { current_password, new_password, isLoading } = this.state;
		const { token, username } = this.props.user;

		if (isLoading) return;

		this.setState({ isLoading: true });

		this.props
			.resetPassword(username, current_password, new_password, token)
			.then((res) => {
				this.setState({
					message: Languages.resetPasswordSuccess,
					isLoading: false,
					isError: false,
					current_password: '',
					new_password: '',
					confirm_password: '',
					newToken: res.data.token
				});
			})
			.catch((error) =>
				this.setState({
					message: json.error,
					isLoading: false,
					isError: true,
					current_password: '',
					new_password: '',
					confirm_password: '',
					newToken: ''
				})
			);
	}

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
				<ButtonIndex
					disabled={disabledButton}
					text={Languages.Submit}
					containerStyle={disabledButton ? styles.disabledButton : styles.submitButton}
					onPress={() => this.onSubmitChangePassword()}
				/>
			</View>
		);
	}

	renderPopUp() {
		const { isLoading, message, isError } = this.state;

		return (
			<PopupDialog
				visible={message !== '' && !isLoading}
				dialogTitle={<DialogTitle title={isError ? Languages.Error : Languages.Success} />}
				containerStyle={Styles.DialogContainer}
				width={0.8}
				height={null}
				dialogAnimation={fadeAnimation}
				dismissOnTouchOutside={false}
			>
				<View style={Styles.DialogContentView}>
					<Text style={Styles.DialogContentTextStyle}>{toCapitalized(message)}</Text>
				</View>
				<View style={Styles.DialogButtonView}>
					<DialogButton
						text={Languages.OK}
						key="button-ok"
						onPress={() => {
							this.setState({ message: '' });
							this.props.resetToken(this.state.newToken);
						}}
						textStyle={Styles.DialogOkTextStyle}
					/>
				</View>
			</PopupDialog>
		);
	}

	renderLoading() {
		const { isLoading } = this.state;

		if (!isLoading) return;

		return <Spinner mode={Mode.overlayLogin} size={Sizes.LARGE} color={Color.lightTextPrimary} />;
	}

	render() {
		const { current_password, new_password, confirm_password, isLoading } = this.state;
		return (
			<KeyboardAwareScrollView style={styles.scrollContainer}>
				{this.renderLoading()}
				<Text style={styles.title}>{Languages.ChangeYourPassword}</Text>
				<View style={styles.subContain}>
					<View>
						<View style={styles.inputWrap}>
							<Icon
								name="lock"
								type="feather"
								size={Styles.IconSize.TextInput}
								color={Color.blackTextSecondary}
							/>
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
							<Icon
								name="lock"
								type="feather"
								size={Styles.IconSize.TextInput}
								color={Color.blackTextSecondary}
							/>
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
							<Icon
								name="lock"
								type="feather"
								size={Styles.IconSize.TextInput}
								color={Color.blackTextSecondary}
							/>
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
					{this.renderSubmitButton()}
					{this.renderPopUp()}
				</View>
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

export default connect(mapStateToProps, { resetPassword, resetToken })(ChangePassword);
