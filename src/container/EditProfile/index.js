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
		const { navigation } = props;

		return () => {
			ImagePicker.clean()
				.then(() => {
					console.log('removed all tmp images from tmp directory');
				})
				.catch((e) => {
					alert(e);
				});
		};
	}, []);

	showAlert = () => {
		const { navigation } = props;

		if (isDirty) {
			Alert.alert(Languages.UnsavedTitle, Languages.UnsavedDescription, [
				{
					text: Languages.SaveAsDraft,
					onPress: onSaveActivity
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

	onPressUploadProfilePhoto = () => {
		ImagePicker.openPicker({
			cropping: true,
			includeBase64: true,
			cropperCircleOverlay: true,
			cropperToolbarTitle: Languages.MoveScale,
			cropperChooseText:  Languages.Done
		}).then((image) => {
			setIsDirty(true);
			setProfilePhoto(image.sourceURL);
		});
	};

	return (
		<KeyboardAvoidingView style={styles.scrollViewContainer} behavior="padding" enabled>
			<ScrollView
				style={styles.scrollViewContainer}
				contentContainerStyle={{
					flexGrow: 1,
					paddingBottom: 80
				}}
				backgroundColor={Color.white}
			>
				<View style={styles.subContain}>
					<View style={styles.profileImageContainer}>
						<Image
							source={{ uri: profilePhoto === "" ? 'https://randomuser.me/api/portraits/women/47.jpg' : profilePhoto }}
							style={styles.profileImage}
						/>
						<TouchableOpacity style={{ flex: 1 }} onPress={onPressUploadProfilePhoto}>
							<Text style={styles.profileImageText}>Change Profile Picture</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.inputContainer}>
						<View style={[ styles.inputWrapper, { marginTop: 0 } ]}>
							<Text style={styles.titleStyle}>{Languages.Name}</Text>
							<TextInput
								underlineColorAndroid="transparent"
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
