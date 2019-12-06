import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Platform, TouchableNativeFeedback } from 'react-native';

import styles from './styles';
import Languages from '../../common/Languages';

const Touchable = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;

const UploadImageBox = ({ background, onPress = undefined, hide = false }) => (
	<Touchable onPress={() => onPress()} activeOpacity={0.8}>
		<ImageBackground
			source={hide === true ? { uri: background } : background}
			style={styles.bgImageContainer}
			resizeMode={'cover'}
		>
			{hide === false && (
				<View style={styles.container}>
					<Touchable activeOpacity={0.9} onPress={() => onPress()}>
						<View style={styles.uploadContainer}>
							<Text style={styles.uploadTextStyle}>{Languages.ShareCoverPhoto}</Text>
						</View>
					</Touchable>
				</View>
			)}
		</ImageBackground>
	</Touchable>
);
export default UploadImageBox;
