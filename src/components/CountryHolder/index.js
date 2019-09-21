import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Card } from 'react-native-elements';
// import { CachedImage, ImageCacheProvider } from 'react-native-cached-image';

import styles from './styles';

const CountryHolder = ({ country, onPress }) => (
	<Card containerStyle={styles.container}>
		<TouchableOpacity onPress={onPress}>
			<View style={styles.imageWrapper}>
				<Image
					source={{
						uri: country.thumbnails,
						// cache: 'only-if-cached'
					}}
					style={styles.countryImage}
					resizeMode={'cover'}
				/>
			</View>
			<View style={styles.separator} />
			<Text style={styles.countrNameStyle}>{country.countryName}</Text>
		</TouchableOpacity>
	</Card>
);

export default CountryHolder;
