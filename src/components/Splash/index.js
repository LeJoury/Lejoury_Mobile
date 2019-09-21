import React from 'react';
import { Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Images, Color } from '@common';

import styles from './styles';

const Splash = (props) => (
	<LinearGradient
		style={styles.container}
		start={{ x: -0.15, y: 0.15 }}
		end={{ x: 0.05, y: 1.0 }}
		colors={[
			Color.splashScreenBg1,
			Color.splashScreenBg2,
			Color.splashScreenBg3,
			Color.splashScreenBg4,
			Color.splashScreenBg5,
			Color.splashScreenBg6,
			Color.splashScreenBg7,
			Color.splashScreenBg8,
			Color.splashScreenBg9,
			Color.splashScreenBg10
		]}
	>
		<Image style={styles.logo} source={Images.splashScreenLogo} resizeMode={'contain'} />
	</LinearGradient>
);

export default Splash;
