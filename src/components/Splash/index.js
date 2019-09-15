import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Images } from '@common';

import styles from './styles';

const Splash = (props) => (
	<View style={styles.container}>
		<Image style={styles.logo} source={Images.appLogo} resizeMode={'contain'} />
	</View>
);

export default Splash;
