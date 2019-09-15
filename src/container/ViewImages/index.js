import React from 'react';
import { View, FlatList, Image, Dimensions } from 'react-native';

import { ScaledImage } from '@components';

import styles from './styles';

const { width, height } = Dimensions.get('window');

const ViewImages = ({ images }) => {
	renderImage = ({ item, index }) => {
		console.log(item);
		return (
			<View style={styles.images}>
				<ScaledImage uri={item} key={index} width={width - 16} />
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<FlatList data={images} renderItem={renderImage} />
		</View>
	);
};
export default ViewImages;
