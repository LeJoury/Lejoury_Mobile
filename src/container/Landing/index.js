import React, { Component } from 'react';
import { View, Text, Animated, TouchableOpacity, Image, Dimensions, Platform } from 'react-native';
import { SocialIcon, Icon } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-community/async-storage';

import { Login, Register } from '@container';

// import { connect } from 'react-redux';
// import { login, dismissLoginDialog } from '@actions';

import { Images, Color, Languages, Styles, Constants, showOkAlert } from '@common';
import { Button, Spinner } from '@components';
import styles from './styles';

const { width, height } = Dimensions.get('window');
const { ASYNCKEY } = Constants.ASYNCKEY;

class Landing extends Component {
	constructor(props) {
		super(props);

		this.state = {
			optionAnimations: new Animated.Value(1),
			optionVisible: true,
			backVisible: new Animated.Value(0),
			landingAnimation: new Animated.Value(0),
			isLogin: true
		};
	}

	componentDidMount() {}

	componentDidUpdate() {}

	componentWillUnmount() {}

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

	onLoginWithEmail = async (email, password) => {
		const { navigation } = this.props;

		const fakeEmail = 'testing@test.com';
		const fakePassword = 'testing123';

		//show loading
		if (!email || !password) {
			showOkAlert(Languages.Empty, Languages.FillUpBothField);
		}

		if (email === fakeEmail && password === fakePassword) {
			try {
				await AsyncStorage.setItem(ASYNCKEY.SESSION, '123');

				navigation.dispatch({
					type: 'Navigation/RESET',
					index: 0,
					key: null,
					actions: [ { type: 'Navigate', routeName: 'Main' } ]
				});
			} catch (e) {
				// saving error
				console.log(e);
			}
		} else {
			showOkAlert(Languages.LoginFail, Languages.PleaseMakeSureYourLoginDetails);
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

	onNavigateToForgotPassword = () => {
		this.props.navigation.navigate('ForgotPassword');
	};

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
												onPress={() => this.onLoginPressHandle('fb')}
											/>

											<SocialIcon
												button
												light
												type="google"
												style={styles.socialButtonStyle}
												underlayColor={Color.normalButtonHover}
												onPress={() => this.onLoginPressHandle('gmail')}
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
											<Register navigation={navigation} />
										)}
									</Animated.View>
								)}
							</View>
						</View>
					</View>
				</KeyboardAwareScrollView>
			</View>
		);
	}
}

// const mapStateToProps = ({ netInfo, user }) => ({
// 	netInfo,
// 	user
// });

export default Landing;
