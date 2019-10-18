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
	Animated,
	Dimensions
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import { Styles, Languages, Color, Device } from '@common';

import styles from './styles';

const { width, height } = Dimensions.get('window');

const EditProfile = (props) => {
	const [ isDirty, setIsDirty ] = useState(false);

	const [ profilePhoto, setProfilePhoto ] = useState('');

	const [ name, setName ] = useState('');
	const [ isNameFocus, setNameFocus ] = useState(false);

	const [ username, setUsername ] = useState('');
	const [ isUsernameFocus, setUsernameFocus ] = useState(false);

	const [ bio, setBio ] = useState('');
	const [ isBioFocus, setBioFocus ] = useState(false);

	useEffect(() => {
		return () => {
			ImagePicker.clean();
		};
	}, []);

	const onConfirmSave = () => {};

	const showAlert = () => {
		const { navigation } = props;

		if (isDirty) {
			Alert.alert(Languages.UnsavedTitle, Languages.UnsavedDescription, [
				{
					text: Languages.SaveAsDraft,
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
		}).then((image) => {
			setIsDirty(true);
			// TODO: RESIZE AND UPLOAD
			setProfilePhoto(image.path);
		});
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
							source={{
								uri:
									profilePhoto === ''
										? 'https://randomuser.me/api/portraits/women/47.jpg'
										: profilePhoto
							}}
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
		</KeyboardAvoidingView>
	);
};
export default EditProfile;
