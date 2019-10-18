import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

import { Images, Color, Languages, Styles } from '@common';

import styles from './styles';

const MemoryHolder = ({ memory }) => (
	<TouchableOpacity>
		<Card containerStyle={{ padding: 0, borderRadius: 10 }}>
			<ImageBackground source={Images.testThumbnail} style={styles.imageBackground} resizeMode="stretch">
				<LinearGradient
					style={styles.itineraryContainer}
					colors={[ Color.transparent1, Color.black, Color.black ]}
				>
					<Text style={styles.titleItinerary}>{memory.title}</Text>
					<View style={styles.userContainer}>
						<Text style={styles.dateText}>
							{memory.dateStart} - {memory.dateEnd}
						</Text>
					</View>
				</LinearGradient>
			</ImageBackground>
		</Card>
	</TouchableOpacity>
);
export default MemoryHolder;
