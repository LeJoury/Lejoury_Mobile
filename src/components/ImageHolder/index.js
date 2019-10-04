import React, { useState, useEffect } from 'react';
import { Animated, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-elements';

import { Color, Styles } from '@common';

import styles from './styles';

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
				<TouchableOpacity onPress={() => (canRemove ? onRemovePress(imageUri) : showRemoveImageView)}>
					<Icon name="x" size={Styles.IconSize.CenterTab} type="feather" color={Color.red1} />
				</TouchableOpacity>
			</Animated.View>
		);
	};

	const { containerStyle, imageStyle, imageUri } = props;

	return (
		<TouchableOpacity style={containerStyle} onPress={showRemoveImageView}>
			<Image style={imageStyle} source={{ uri: imageUri }} />
			{removeRemoveView()}
		</TouchableOpacity>
	);
};
export default ImageHolder;
