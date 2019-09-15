import React from 'react';
import { Image, StyleSheet } from 'react-native';

import { Images } from '@common';

const Footpath = ({ no = 1 }) => {
	let feets = [];

	for (let i = 0; i < no; i++) {
		feets.push(<Image key={i} style={styles.shoePrintImage} source={Images.shoePrint} />);
	}

	return feets;
};

export default Footpath;

const styles = StyleSheet.create({
	shoePrintImage: {
		width: 36,
		height: 36,
		marginTop: 12
	}
});
