import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

import { Styles, Languages, Color, Device } from '@common';

import styles from './styles';

const BucketList = (props) => {
	useEffect(() => {}, []);

	return (
		<View style={styles.container}>
			<Icon name="bookmark" type="feather" size={Styles.IconSize.CenterView} color={Color.lightGrey5} />
			<Text style={styles.emptyBucketListText}>{Languages.EmptyBucketText}</Text>
		</View>
	);
};
export default BucketList;
