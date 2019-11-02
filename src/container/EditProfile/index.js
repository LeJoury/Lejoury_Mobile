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
	Dimensions
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import { connect } from 'react-redux';
import { getProfile, uploadProfilePhoto, editProfile } from '@actions';

import { Styles, Languages, Color, Images, Constants, Device } from '@common';
import { Spinner } from '@components';

import styles from './styles';

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

		return () => {
			props.onRef(undefined);
			ImagePicker.clean();
		};
	}, []);

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

	const onPressUploadProfilePhoto = () => {
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
						<TouchableOpacity style={Styles.Common.FullFlex} onPress={onPressUploadProfilePhoto}>
							<Text style={styles.profileImageText}>{Languages.ChangeProfilePicture}</Text>
						</TouchableOpacity>
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
