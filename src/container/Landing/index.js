import React, { Component } from 'react';
import { View, Text, Animated, TouchableOpacity, Image, Dimensions, Platform } from 'react-native';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import { SocialIcon, Icon } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { connect } from 'react-redux';
import { login, register, loginBySocial } from '@actions';

import { Login, Register } from '@container';

import { Images, Color, Languages, Styles, Constants, showOkAlert } from '@common';
import { Button, Spinner } from '@components';
import styles from './styles';

const { width, height } = Dimensions.get('window');
const { Mode, Sizes } = Constants.Spinner;

const LOGIN_TYPE_FACEBOOK = 'FACEBOOK';
const LOGIN_TYPE_GOOGLE = 'GOOGLE';

class Landing extends Component {
	constructor(props) {
		super(props);
		GoogleSignin.configure();

		this.state = {
			optionAnimations: new Animated.Value(1),
			optionVisible: true,
			backVisible: new Animated.Value(0),
			landingAnimation: new Animated.Value(0),
			isLogin: true,
			isLoading: false
		};
	}

	componentDidMount() {}

	componentDidUpdate() {}

	componentWillUnmount() {}

	onNavigateToMain = () => {
		const { navigation } = this.props;

		navigation.dispatch({
			type: 'Navigation/RESET',
			index: 0,
			key: null,
			actions: [ { type: 'Navigate', routeName: 'Main' } ]
		});
	};

	onNavigateToForgotPassword = () => {
		this.props.navigation.navigate('ForgotPassword');
	};

	onBackToOptions = () => {
		if (!this.state.optionVisible) {
			this.setState(
				{
					optionAnimations: new Animated.Value(0)
				},
				() => {
					const optionAnimate = Animated.timing(this.state.optionAnimations, {
						toValue: 1,
						duration: 500,
						useNativeDriver: true
					});

					const backOpacity = Animated.timing(this.state.backVisible, {
						toValue: 0,
						duration: 200,
						useNativeDriver: true
					});

					const landingAnimate = Animated.timing(this.state.landingAnimation, {
						toValue: 0,
						duration: 500,
						useNativeDriver: true
					});

					Animated.parallel([ backOpacity, landingAnimate ]).start(({ finished }) => {
						if (finished) {
							this.setState({
								optionVisible: true
							});
							optionAnimate.start();
						} else {
							if (this.state.isLogin) {
								this.onLoginPressHandle();
							} else {
								this.onRegisterPressHandle();
							}
						}
					});
				}
			);
		}
	};

	// Result: {
	// 	'email': 'ohyeah547@gmail.com',
	// 	'id': '10220086199094726',
	// 	'picture': {
	// 		'data': {
	// 			'is_silhouette': false,
	// 			'width': 50,
	// 			'height': 50,
	// 			'url': 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10220086199094726&height=50&width=50&ext=1573996369&hash=AeTB4lWqSYslQ-6p'
	// 		}
	// 	},
	// 	'name': 'Sze Jing'
	// };
	responseInfoCallback = async (error, result) => {
		if (error) {
			//TODO: show something went wrong message
			console.log('Error fetching data: ' + error.toString());
			showOkAlert(Languages.LoginFail, Languages.SystemError);
		} else {
			//FACEBOOK LOGIN
			const { name, picture, id, email } = result;

			try {
				let response = await this.props.loginBySocial(name, email, id, picture.data.url, LOGIN_TYPE_FACEBOOK);

				if (response.OK) {
					this.onNavigateToMain();
				} else {
					showOkAlert(Languages.LoginFail, response.message);
				}
			} catch (e) {
				console.log(e);
				showOkAlert(Languages.LoginFail, Languages.SystemError);
			}
		}
		LoginManager.logOut();
	};

	onFacebookLogin = () => {
		LoginManager.logInWithPermissions([ 'public_profile', 'email' ]).then(
			(result) => {
				if (result.isCancelled) {
					//TODO: CANCEL MESSAGE
					console.log('Login cancelled');
				} else {
					AccessToken.getCurrentAccessToken().then((data) => {
						const req = new GraphRequest('/me?fields=name,picture,email', null, this.responseInfoCallback);
						new GraphRequestManager().addRequest(req).start();
					});
				}
			},
			(error) => {
				//TODO: SHOW SYSTEM ERROR MESSAGE
				console.log('Login fail with error: ' + error);
			}
		);
	};

	// 	email: "lejoury.my@gmail.com"
	// familyName: null
	// givenName: "lejoury"
	// id: "115603408340880260293"
	// name: "lejoury"
	// photo: "https://lh4.googleusercontent.com/-Sv6e8t5bUC4/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3reJNnEGmC6sCqk1XzVJgMtzNlXucw/s120/photo.jpg"

	// GOOGLE LOGIN
	onGoogleLogin = async () => {
		try {
			await GoogleSignin.hasPlayServices();
			const userInfo = await GoogleSignin.signIn();

			const { user } = userInfo;

			const { email, id, name, photo } = user;

			try {
				let response = await this.props.loginBySocial(name, email, id, photo, LOGIN_TYPE_GOOGLE);

				if (response.OK) {
					this.onNavigateToMain();
				} else {
					showOkAlert(Languages.LoginFail, response.message);
				}
			} catch (e) {
				console.log(e);
				showOkAlert(Languages.LoginFail, Languages.SystemError);
			}

			console.log(userInfo);
		} catch (error) {
			if (error.code === statusCodes.SIGN_IN_CANCELLED) {
				// user cancelled the login flow
			} else if (error.code === statusCodes.IN_PROGRESS) {
				// operation (e.g. sign in) is in progress already
			} else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
				// play services not available or outdated
			} else {
				// some other error happened
			}
		}
	};

	onLoginPressHandle = () => {
		//type = email, social
		this.setState(
			{
				isLogin: true
			},
			() => {
				const optionAnimate = Animated.timing(this.state.optionAnimations, {
					toValue: 0,
					duration: 500,
					useNativeDriver: true
				});

				const backOpacity = Animated.timing(this.state.backVisible, {
					toValue: 1,
					duration: 200,
					useNativeDriver: true
				});

				const landingAnimate = Animated.timing(this.state.landingAnimation, {
					toValue: 1,
					duration: 500,
					useNativeDriver: true
				});

				optionAnimate.start(({ finished }) => {
					if (finished) {
						this.setState({ optionVisible: false });
						Animated.parallel([ backOpacity, landingAnimate ]).start();
					} else {
						this.onBackToOptions();
					}
				});
			}
		);
	};

	onRegisterWithEmail = async (username, email, password) => {
		this.setState({ isLoading: true });
		try {
			let result = await this.props.register(username, email, password);

			if (result.OK) {
				let loginResult = await this.props.login(email, password);

				this.setState({ isLoading: false }, () => {
					if (loginResult.OK) {
						showOkAlert(Languages.RegisterSuccess, Languages.RegisterSuccessDescription, Languages.OK, () =>
							this.onNavigateToMain()
						);
					}
				});
			} else {
				showOkAlert(Languages.RegisterFail, result.message);
			}
		} catch (error) {
			this.setState({ isLoading: false });
		}
	};

	onLoginWithEmail = async (email, password) => {
		if (!email || !password) {
			showOkAlert(Languages.Empty, Languages.FillUpBothField);
		}

		this.setState({ isLoading: true });
		try {
			let result = await this.props.login(email, password);

			this.setState({ isLoading: false }, () => {
				if (result.OK) {
					this.onNavigateToMain();
				} else {
					showOkAlert(Languages.LoginFail, result.message);
				}
			});
		} catch (error) {
			this.setState({ isLoading: false });
		}
	};

	onRegisterPressHandle = () => {
		this.setState(
			{
				isLogin: false
			},
			() => {
				const optionAnimate = Animated.timing(this.state.optionAnimations, {
					toValue: 0,
					duration: 500,
					useNativeDriver: true
				});

				const backOpacity = Animated.timing(this.state.backVisible, {
					toValue: 1,
					duration: 200,
					useNativeDriver: true
				});

				const landingAnimate = Animated.timing(this.state.landingAnimation, {
					toValue: 1,
					duration: 500,
					useNativeDriver: true
				});

				optionAnimate.start(({ finished }) => {
					if (finished) {
						this.setState({ optionVisible: false });
						Animated.parallel([ backOpacity, landingAnimate ]).start();
					} else {
						this.onBackToOptions();
					}
				});
			}
		);
	};

	renderLoading() {
		const { isLoading } = this.state;

		if (!isLoading) {
			return;
		}

		return <Spinner mode={Mode.overlayLogin} size={Sizes.SMALL} color={Color.lightTextPrimary} />;
	}

	render() {
		const { navigation } = this.props;
		const { optionAnimations, backVisible, landingAnimation } = this.state;

		const backButtonInterpolate = backVisible.interpolate({
			inputRange: [ 0, 1 ],
			outputRange: [ 0, 1 ]
		});

		const translateOptionYInterpolate = optionAnimations.interpolate({
			inputRange: [ 0, 1 ],
			outputRange: [ height, 0 ]
		});

		const translateLoginRegisterYInterpolate = landingAnimation.interpolate({
			inputRange: [ 0, 1 ],
			outputRange: [ height, 0 ]
		});

		const optionAnimationStyles = {
			opacity: optionAnimations,
			transform: [
				{
					translateY: translateOptionYInterpolate
				}
			]
		};

		const loginAnimationStyles = {
			transform: [
				{
					translateY: translateLoginRegisterYInterpolate
				}
			]
		};

		const backButtonStyles = {
			opacity: backButtonInterpolate
		};

		return (
			<View style={styles.landingBackground}>
				<KeyboardAwareScrollView
					contentContainerStyle={{ flexGrow: 1 }}
					behavior="padding"
					enabled
					enableOnAndroid={true}
				>
					<View style={styles.container}>
						<View style={styles.innerContainer}>
							<View style={styles.logoWrapper}>
								<Image style={styles.logo} source={Images.appLogoOutline} />

								<Text style={styles.logoText}>{Languages.HelloThere}</Text>
								<Text style={styles.welcomeDescriptionText}>
									{Languages.WelcomeDescription}
									<Text style={styles.appNameText}>{Languages.AppName}</Text>
								</Text>

								<Animated.View style={[ backButtonStyles, styles.backButtonWrapper ]}>
									<TouchableOpacity onPress={() => this.onBackToOptions()}>
										<Icon
											name="chevron-left"
											type="feather"
											size={Styles.IconSize.xLarge}
											color={Color.primary}
										/>
									</TouchableOpacity>
								</Animated.View>
							</View>

							<View style={styles.subContainer}>
								{this.state.optionVisible ? (
									<Animated.View style={[ optionAnimationStyles, styles.landingContainer ]}>
										<View style={styles.buttonWrap}>
											<Button
												text={Languages.Login}
												textStyle={styles.loginTextStyle}
												containerStyle={styles.loginButton}
												onPress={() => this.onLoginPressHandle('normal')}
											/>
											<Button
												text={Languages.Register}
												textStyle={styles.registerTextStyle}
												containerStyle={styles.registerButton}
												onPress={() => this.onRegisterPressHandle()}
											/>
										</View>
										<View style={styles.separatorWrap}>
											<View style={styles.separator} />
											<Text style={styles.separatorText}> Or </Text>
											<View style={styles.separator} />
										</View>
										<View style={styles.socialButtonsContainer}>
											<SocialIcon
												button
												type="facebook"
												style={styles.socialButtonStyle}
												underlayColor={Color.normalButtonHover}
												onPress={() => this.onFacebookLogin()}
											/>

											<SocialIcon
												button
												light
												type="google"
												style={styles.socialButtonStyle}
												underlayColor={Color.normalButtonHover}
												onPress={() => this.onGoogleLogin()}
											/>
										</View>
									</Animated.View>
								) : (
									<Animated.View style={[ loginAnimationStyles, styles.login_registerContainer ]}>
										{this.state.isLogin ? (
											<Login
												navigation={navigation}
												onLoginWithEmail={this.onLoginWithEmail}
												onNavigateToForgotPassword={this.onNavigateToForgotPassword}
											/>
										) : (
											<Register
												navigation={navigation}
												onRegisterWithEmail={this.onRegisterWithEmail}
											/>
										)}
									</Animated.View>
								)}
							</View>

							{this.renderLoading()}
						</View>
					</View>
				</KeyboardAwareScrollView>
			</View>
		);
	}
}

// const mapStateToProps = ({  user }) => ({
// 	user
// });

export default connect(null, { login, register, loginBySocial })(Landing);
