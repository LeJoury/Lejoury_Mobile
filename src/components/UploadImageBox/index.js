import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, TouchableWithoutFeedback } from 'react-native';

import styles from './styles';

const UploadImageBox = ({ background, onPress= undefined, hide = false }) => (
	<TouchableOpacity onPress={() => onPress()} activeOpacity={0.9}>
		<ImageBackground source={hide === true ? { uri: background } : background} style={styles.bgImageContainer}>
			{hide === false && (
				<TouchableOpacity style={styles.container} activeOpacity={0.9} onPress={() => onPress()}>
					<View style={styles.uploadContainer}>
						<Text style={styles.uploadTextStyle}>Share Your Cover Photo</Text>
						<Text style={styles.uploadDescriptionTextStyle}>400 x 400 preferrable</Text>
					</View>
				</TouchableOpacity>
			)}
		</ImageBackground>
	</TouchableOpacity>
);
export default UploadImageBox;
