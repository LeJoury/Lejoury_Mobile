import React, { useState, useEffect } from 'react';
import { Animated, TouchableOpacity, Image, Platform, TouchableNativeFeedback, View } from 'react-native';
import { Icon } from 'react-native-elements';

import { Color, Styles } from '@common';

import styles from './styles';

const Touchable = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;

const ImageHolder = (props) => {
	const [ removeViewOpacity ] = useState(new Animated.Value(0));
	const [ canRemove, setCanRemove ] = useState(false);

	const showRemoveImageView = () => {
		setCanRemove(true);
		Animated.timing(removeViewOpacity, {
			duration: 300,
			delay: 0.3,
			toValue: 1
		}).start(() => {
			Animated.sequence([
				Animated.delay(800),
				Animated.timing(removeViewOpacity, {
					duration: 300,
					toValue: 0
				})
			]).start(() => {
				setCanRemove(false);
			});
		});
	};

	const removeRemoveView = () => {
		const { imageStyle, imageUri, onRemovePress } = props;

		if (!canRemove) {
			return;
		}

		return (
			<Animated.View
				style={[
					styles.removeContainer,
					imageStyle,
					{
						opacity: removeViewOpacity
					}
				]}
			>
				<Touchable
					onPress={() => (canRemove ? onRemovePress(imageUri) : showRemoveImageView)}
					activeOpacity={0.8}
				>
					<View>
						<Icon name="x" size={Styles.IconSize.CenterTab} type="feather" color={Color.red1} />
					</View>
				</Touchable>
			</Animated.View>
		);
	};

	const { containerStyle, imageStyle, imageUri } = props;

	return (
		<View style={containerStyle}>
			<Touchable onPress={showRemoveImageView} activeOpacity={0.8}>
				<View>
					<Image style={imageStyle} source={{ uri: imageUri }} />
					{removeRemoveView()}
				</View>
			</Touchable>
		</View>
	);
};
export default ImageHolder;
