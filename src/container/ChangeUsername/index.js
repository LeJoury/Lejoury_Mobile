import React, { Component } from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Icon } from 'react-native-elements';
import PopupDialog, { DialogTitle, DialogButton, FadeAnimation } from 'react-native-popup-dialog'; // try to use alert

import { connect } from 'react-redux';
import { changeUsername, resetToken } from '@actions';

import { Images, Color, Styles, Languages, toCapitalized, Constants } from '@common';
import { ButtonIndex, CheckLabelBox, Spinner } from '@components';

import styles from './styles';

const LENGTHPASSWORD = '1';

const { Mode, Sizes } = Constants.Spinner;
const fadeAnimation = new FadeAnimation({ animationDuration: 150 });

class ChangeUsername extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ic_no: '',
			new_username: '',
			isLoading: false,
			message: '',
			isError: true,
			newToken: ''
		};

		this.onICNoEditHandle = (ic_no) => this.setState({ ic_no });
		this.onNewUsernameEditHandle = (new_username) => this.setState({ new_username });
	}

	getColor(type) {
		const { new_username } = this.state;

		if (type == LENGTHPASSWORD) {
			return new_username.length > 6 ? Color.green1 : Color.grey1;
		}
	}

	onSubmitChangeUsername() {
		const { ic_no, new_username, isLoading } = this.state;
		const { token, username } = this.props.user;

		if (isLoading) return;

		this.setState({ isLoading: true });

		this.props
			.changeUsername(username, new_username, ic_no, token)
			.then((res) => {
				this.setState({
					ic_no: '',
					isLoading: false,
					message: Languages.changedUsernameSuccess,
					isError: false,
					newToken: res.data.token
				});
			})
			.catch((error) =>
				this.setState({
					ic_no: '',
					new_username: '',
					isLoading: false,
					message: json.error,
					isError: true,
					newToken: ''
				})
			);
	}

	renderSubmitButton() {
		const { new_username } = this.state;

		const disabledButton = !(new_username.length > 6);

		return (
			<View style={styles.buttonWrap}>
				<ButtonIndex
					disabled={disabledButton}
					text={Languages.Submit}
					containerStyle={disabledButton ? styles.disabledButton : styles.submitButton}
					onPress={() => this.onSubmitChangeUsername()}
				/>
			</View>
		);
	}

	renderLoading() {
		const { isLoading } = this.state;

		if (!isLoading) return;

		return <Spinner mode={Mode.overlayLogin} size={Sizes.LARGE} color={Color.lightTextPrimary} />;
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
							let name = this.state.new_username;
							this.setState({ message: '', new_username: '' });
							this.props.resetToken(this.state.newToken, name);
						}}
						textStyle={Styles.DialogOkTextStyle}
					/>
				</View>
			</PopupDialog>
		);
	}

	render() {
		const { ic_no, new_username, isLoading } = this.state;

		return (
			<KeyboardAwareScrollView style={styles.scrollContainer}>
				{this.renderLoading()}
				<Text style={styles.title}>{Languages.ChangeYourUsername}</Text>
				<View style={styles.subContain}>
					<View>
						<View style={styles.inputWrap}>
							<Icon
								name="id-badge"
								type="font-awesome"
								size={Styles.IconSize.TextInput}
								color={Color.blackTextSecondary}
							/>
							<TextInput
								{...commonInputProps}
								ref="ic_no"
								placeholder={Languages.identifyNo}
								onChangeText={this.onICNoEditHandle}
								returnKeyType={'next'}
								value={ic_no}
							/>
						</View>
						<View style={styles.inputWrap}>
							<Icon
								name="user"
								type="feather"
								size={Styles.IconSize.TextInput}
								color={Color.blackTextSecondary}
							/>
							<TextInput
								{...commonInputProps}
								ref="new_username"
								placeholder={Languages.newUsername}
								onChangeText={this.onNewUsernameEditHandle}
								returnKeyType={'go'}
								value={new_username}
							/>
						</View>
						<View style={styles.checkButtonContainer}>
							<CheckLabelBox color={this.getColor(LENGTHPASSWORD)} label={Languages.mustMatchLength} />
						</View>
					</View>
					{this.renderPopUp()}
					{this.renderSubmitButton()}
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

export default connect(mapStateToProps, { changeUsername, resetToken })(ChangeUsername);
