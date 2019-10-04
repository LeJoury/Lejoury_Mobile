import React from 'react';
import { Image, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Images, Color, Constants } from '@common';

import { Spinner } from '@components';

const { Mode, Sizes } = Constants.Spinner;

import styles from './styles';

const Splash = (props) => {
	return (
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
			<View style={styles.logoWrapper}>
				<Image style={styles.logo} source={Images.splashScreenLogo} />
				<Spinner mode={Mode.normal} size={Sizes.SMALL} color={Color.lightTextPrimary} />
			</View>
		</LinearGradient>
	);
};

export default Splash;
