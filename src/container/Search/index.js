import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Images, Languages, Device, Color, Styles } from '@common';

import styles from './styles';

const Search = (props) => {
	return (
		<View style={styles.container}>
			<Text style={styles.recentSearchText}>{Languages.RecentSearch}</Text>
		</View>
	);
};

export default Search;
