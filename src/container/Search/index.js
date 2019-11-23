import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import { Images, Languages, Device, Color, Styles, getCountryEmoji } from '@common';

import styles from './styles';

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
				<TouchableOpacity style={styles.resultRow} onPress={() => props.onResultPress(item)}>
					<View style={styles.resultIconContainer}>
						<Icon color={Color.primary} type="feather" size={14} name="map-pin" />
					</View>
					<View style={styles.resultKeywordContainer}>
						<Text style={styles.resultKeywordTextStyle}>{item.title}</Text>
						{/* <View style={{ flexDirection: 'row' }}>
							{item.country &&
								item.country.length > 0 &&
								item.country.map((country, index) => {
									return (
										<Text key={index} style={{ fontSize: 16 }} numberOfLines={1}>
											{getCountryEmoji(country.alpha2)}
										</Text>
									);
								})}
						</View> */}
					</View>
				</TouchableOpacity>
			);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.recentSearchText}>{Languages.Result}</Text>
			<FlatList
				data={props.data}
				keyExtractor={_keyExtractor}
				style={styles.flatListStyle}
				renderItem={renderResult}
			/>
		</View>
	);
};

export default Search;
