import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';

import { Images, Languages, Device, Color, Styles } from '@common';

import styles from './styles';

const RECENT_SEARCH = [
	{ keyword: 'Malaysia', type: 'country' },
	{ keyword: 'Maldives', type: 'country' },
	{ keyword: 'Malaysia KLCC 2D1N', type: 'itinerary' },
	{ keyword: 'Road Trip in Malaysia 4D3N', type: 'itinerary' }
];

const Search = (props) => {
	const _keyExtractor = (item, index) => index.toString();

	const renderResult = ({ item }) => {
		if (item.type === 'country') {
			return (
				<View style={styles.resultRow}>
					<View style={styles.resultIconContainer}>
						<Icon color={Color.primary} type="feather" size={14} name="map-pin" />
					</View>
					<View style={styles.resultKeywordContainer}>
						<Text style={styles.resultKeywordTextStyle}>{item.keyword}</Text>
					</View>
				</View>
			);
		} else {
			return (
				<View style={styles.resultRow}>
					<View style={styles.resultIconContainer}>
						<Icon color={Color.primary} type="feather" size={14} name="list" />
					</View>
					<View style={styles.resultKeywordContainer}>
						<Text style={styles.resultKeywordTextStyle}>{item.keyword}</Text>
					</View>
				</View>
			);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.recentSearchText}>{Languages.RecentSearch}</Text>
			<FlatList
				data={RECENT_SEARCH}
				keyExtractor={_keyExtractor}
				style={styles.flatListStyle}
				renderItem={renderResult}
			/>
		</View>
	);
};

export default Search;
