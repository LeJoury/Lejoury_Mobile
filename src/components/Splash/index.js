import React from 'react';
import { Image, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Images, Color, Constants } from '@common';

import { Spinner } from '@components';

const { Mode, Sizes } = Constants.Spinner;

import styles from './styles';

const Splash = (props) => {
	return (
		<View style={styles.container}>
			<View style={styles.logoWrapper}>
				<Image style={styles.logo} source={Images.splashScreenLogo} />
				<Spinner mode={Mode.normal} size={Sizes.SMALL} color={Color.black} />
			</View>
		</View>
	);
};

export default Splash;
