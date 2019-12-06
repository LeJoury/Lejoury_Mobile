import React, { useState, useEffect } from 'react';
import {
	KeyboardAvoidingView,
	ScrollView,
	View,
	Text,
	TouchableOpacity,
	Image,
	TextInput,
	Alert,
	Dimensions,
	Platform,
	BackHandler,
	TouchableNativeFeedback
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { check, request, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';

import { connect } from 'react-redux';
import { getProfile, uploadProfilePhoto, editProfile } from '@actions';

import { Styles, Languages, Color, Images, Constants, showOkCancelAlert } from '@common';
import { Spinner } from '@components';

import styles from './styles';

const Touchable = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;

const { width, height } = Dimensions.get('window');
const { Mode, Sizes } = Constants.Spinner;

const EditProfile = (props) => {
	const [ isDirty, setIsDirty ] = useState(false);

	const [ profilePhoto, setProfilePhoto ] = useState(props.profile.photo);

	const [ name, setName ] = useState(props.profile.name);
	const [ isNameFocus, setNameFocus ] = useState(false);

	const [ username, setUsername ] = useState(props.profile.username);
	const [ isUsernameFocus, setUsernameFocus ] = useState(false);

	const [ bio, setBio ] = useState(props.profile.bio);
	const [ isBioFocus, setBioFocus ] = useState(false);

	const [ isLoading, setIsLoading ] = useState(false);

	useEffect(() => {
		props.onRef(this);
		BackHandler.addEventListener('hardwareBackPress', handleBackButtonPressAndroid);

		return () => {
			BackHandler.removeEventListener('hardwareBackPress', handleBackButtonPressAndroid);

			props.onRef(undefined);
			ImagePicker.clean();
		};
	}, []);

	const handleBackButtonPressAndroid = () => {
		showDiscardAlert();
		return true;
	};

	//parent called
	onConfirmSave = async () => {
		let newProfile = {
			bio: bio,
			username: username,
			name: name
		};
		setIsLoading(true);

		let response = await props.editProfile(props.user.token, newProfile);

		if (response.OK) {
			setIsLoading(false);
			setIsDirty(false);
			props.navigation.goBack(null);
		}
	};

	//parent called
	showDiscardAlert = () => {
		const { navigation } = props;
		if (isDirty) {
			Alert.alert(Languages.UnsavedTitle, Languages.UnsavedDescription, [
				{
					text: Languages.Save,
					onPress: onConfirmSave
				},
				{
					text: Languages.Discard,
					onPress: () => {
						navigation.goBack(null);
					},
					style: 'destructive'
				}
			]);
		} else {
			navigation.goBack(null);
		}
	};

	const onUploadProfilePhoto = () => {
		ImagePicker.openPicker({
			cropping: true,
			cropperCircleOverlay: true,
			cropperToolbarTitle: Languages.MoveScale,
			cropperChooseText: Languages.Done
		}).then(async (image) => {
			setIsLoading(true);
			let response = await props.uploadProfilePhoto(props.user.token, image);

			if (response.OK) {
				setIsLoading(false);
				setProfilePhoto(image.path);
			}
		});
	};

	const checkPermission = () => {
		if (Platform.OS === 'ios') {
			check(PERMISSIONS.IOS.PHOTO_LIBRARY).then((result) => {
				switch (result) {
					case RESULTS.UNAVAILABLE:
						break;
					case RESULTS.DENIED:
						console.log('undenied');
						request(PERMISSIONS.IOS.PHOTO_LIBRARY).then((requestResult) => {
							switch (requestResult) {
								case RESULTS.UNAVAILABLE:
									break;
								case RESULTS.DENIED:
									console.log('undenied');
									break;
								case RESULTS.GRANTED:
									onUploadProfilePhoto();
									break;
								case RESULTS.BLOCKED:
									console.log('blocked');
									break;
							}
						});
						break;
					case RESULTS.GRANTED:
						onUploadProfilePhoto();
						break;
					case RESULTS.BLOCKED:
						console.log('blocked');
						showOkCancelAlert(Languages.Settings, Languages.OpenSettings, Languages.Settings, () =>
							openSettings().catch(() => console.warn('cannot open settings'))
						);
						break;
				}
			});
		} else {
			check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then((result) => {
				switch (result) {
					case RESULTS.UNAVAILABLE:
						break;
					case RESULTS.DENIED:
						request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then((requestResult) => {
							switch (requestResult) {
								case RESULTS.UNAVAILABLE:
									break;
								case RESULTS.DENIED:
									console.log('denied');
									break;
								case RESULTS.GRANTED:
									onUploadProfilePhoto();
									break;
								case RESULTS.BLOCKED:
									console.log('blocked');
									break;
							}
						});
						break;
					case RESULTS.GRANTED:
						onUploadProfilePhoto();
						break;
					case RESULTS.BLOCKED:
						console.log('blocked');
						// showOkCancelAlert(Languages.Settings, Languages.OpenSettings, Languages.Settings, () =>
						// 	openSettings().catch(() => console.warn('cannot open settings'))
						// );
						break;
				}
			});
		}
	};

	const renderLoading = () => {
		if (!isLoading) {
			return;
		}
		return <Spinner mode={Mode.overlay} size={Sizes.SMALL} color={Color.lightTextPrimary} />;
	};

	return (
		<KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
			<ScrollView
				style={styles.scrollViewContainer}
				contentContainerStyle={styles.scrollViewContainer}
				backgroundColor={Color.white}
			>
				<View style={styles.subContain}>
					<View style={styles.profileImageContainer}>
						<Image
							source={profilePhoto ? { uri: profilePhoto } : Images.defaultAvatar}
							style={styles.profileImage}
						/>
						<Touchable activeOpacity={0.8} style={Styles.Common.FullFlex} onPress={checkPermission}>
							<Text style={styles.profileImageText}>{Languages.ChangeProfilePicture}</Text>
						</Touchable>
					</View>
					<View style={styles.inputContainer}>
						<View style={[ styles.inputWrapper, { marginTop: 0 } ]}>
							<Text style={styles.titleStyle}>{Languages.Name}</Text>
							<TextInput
								underlineColorAndroid="transparent"
								selectionColor={Color.textSelectionColor}
								value={name}
								onFocus={() => setNameFocus(true)}
								onBlur={() => setNameFocus(false)}
								style={[
									styles.inputStyle,
									{
										borderBottomColor: isNameFocus ? Color.primary : Color.lightGrey1
									}
								]}
								onChangeText={(text) => {
									setName(text);
									setIsDirty(true);
								}}
							/>
						</View>
						<View style={styles.inputWrapper}>
							<Text style={styles.titleStyle}>{Languages.Username}</Text>
							<TextInput
								underlineColorAndroid="transparent"
								selectionColor={Color.textSelectionColor}
								value={username}
								onFocus={() => setUsernameFocus(true)}
								onBlur={() => setUsernameFocus(false)}
								style={[
									styles.inputStyle,
									{
										borderBottomColor: isUsernameFocus ? Color.primary : Color.lightGrey1
									}
								]}
								onChangeText={(text) => {
									setUsername(text);
									setIsDirty(true);
								}}
							/>
						</View>
						<View style={styles.inputWrapper}>
							<Text style={styles.titleStyle}>{Languages.Bio}</Text>
							<TextInput
								underlineColorAndroid="transparent"
								selectionColor={Color.textSelectionColor}
								value={bio}
								multiline={true}
								numberOfLines={4}
								onFocus={() => setBioFocus(true)}
								onBlur={() => setBioFocus(false)}
								style={[
									styles.inputStyle,
									styles.bio,
									{
										borderBottomColor: isBioFocus ? Color.primary : Color.lightGrey1
									}
								]}
								onChangeText={(text) => {
									setBio(text);
									setIsDirty(true);
								}}
							/>
						</View>
					</View>
				</View>
			</ScrollView>
			{renderLoading()}
		</KeyboardAvoidingView>
	);
};

const mapStateToProps = ({ user, profile }) => ({
	user,
	profile
});

export default connect(mapStateToProps, { getProfile, uploadProfilePhoto, editProfile })(EditProfile);
