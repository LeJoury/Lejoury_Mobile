import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import { createImageProgress } from 'react-native-image-progress';

// import { CachedImage, ImageCacheProvider } from 'react-native-cached-image';

import styles from './styles';

const LoadImage = createImageProgress(FastImage);

const CountryHolder = ({ country, onPress }) => (
	<Card containerStyle={styles.container}>
		<TouchableOpacity onPress={onPress}>
			<View style={styles.imageWrapper}>
				<LoadImage
					source={{
						uri: country.thumbnails
						// cache: 'only-if-cached'
					}}
					style={styles.countryImage}
					resizeMode={FastImage.resizeMode.cover}
				/>
			</View>
			<View style={styles.separator} />
			<Text style={styles.countrNameStyle}>{country.countryName}</Text>
		</TouchableOpacity>
	</Card>
);

export default CountryHolder;
