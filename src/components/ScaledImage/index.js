import React, { useState, useEffect } from 'react';
import { Image, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { createImageProgress } from 'react-native-image-progress';

const { width } = Dimensions.get('window');
const LoadImage = createImageProgress(FastImage);

const ScaledImage = (props) => {
	const [ source ] = useState(props.uri);
	const [ imageWidth, setImageWidth ] = useState(width - 40);
	const [ imageHeight, setImageHeight ] = useState(width - 40);

	useEffect(() => {
		Image.getSize(source, (width, height) => {
			if (props.width && !props.height) {
				setImageWidth(props.width);
				setImageHeight(height * (props.width / width));
			} else if (!props.width && props.height) {
				setImageWidth(width * (props.height / height));
				setImageHeight(props.height);
			} else {
				setImageWidth(width);
				setImageHeight(height);
			}
		});
	}, []);

	return (
		<LoadImage
			source={{ uri: source }}
			style={{ width: imageWidth, height: imageHeight }}
		/>
	);
};

export default ScaledImage;
