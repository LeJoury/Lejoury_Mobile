import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { SearchBar } from 'react-native-elements';

import { Color, Styles, Languages } from '@common';

import styles from './styles';

const travellers = [
	{
		travellerID: '1',
		travellerName: 'Alex',
		travellerThumbnails: 'https://randomuser.me/api/portraits/men/57.jpg',
		following: true
	},
	{
		travellerID: '2',
		travellerName: 'Lily',
		travellerThumbnails: 'https://randomuser.me/api/portraits/women/57.jpg',
		following: false
	},
	{
		travellerID: '3',
		travellerName: 'Daniel',
		travellerThumbnails: 'https://randomuser.me/api/portraits/men/7.jpg',
		following: false
	},
	{
		travellerID: '4',
		travellerName: 'Alice',
		travellerThumbnails: 'https://randomuser.me/api/portraits/women/7.jpg',
		following: true
	}
];

const Traveller = (props) => {
	const [ search, setSearch ] = useState('');

	_keyExtractor = (item) => item.travellerID;

	updateSearch = (search) => {
		setSearch(search);
	};

	_renderTravellerHolder = ({ item }) => {
		const functionButtonBGStyle = item.following ? styles.followingButtonStyle : styles.followButtonStyle;
		const functionTextColor = item.following ? Color.white : Color.blue5;
		const functionText = item.following ? Languages.ButtonFollowing : Languages.ButtonFollow;

		return (
			<View style={styles.travellerContainer}>
				<Image style={styles.travellerThumbnails} source={{ uri: item.travellerThumbnails }} />
				<View style={styles.travellerSubcontainer}>
					<View style={styles.travellerNameContainer}>
						<Text style={styles.travellerUsernameTextStyle}>{item.travellerName}</Text>
						<Text style={styles.travellerNameTextStyle}>{item.travellerName}</Text>
					</View>
					<TouchableOpacity style={[ styles.travellerFunctionButton, functionButtonBGStyle ]}>
						<Text style={[ styles.travellerFunctionTextStyle, { color: functionTextColor } ]}>
							{functionText}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	};

	_renderSearchBar = () => (
		<SearchBar
			placeholder={Languages.Search}
			onChangeText={updateSearch}
			value={search}
			lightTheme={true}
			platform={Platform.OS}
			containerStyle={styles.searchBarContainerStyle}
			inputContainerStyle={styles.searchBarInputContainerStyle}
			inputStyle={styles.searchBarInputStyle}
			leftIconContainerStyle={{ paddingLeft: 6 }}
		/>
	);

	return (
		<ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
			{_renderSearchBar()}
			<FlatList
				data={travellers}
				// ListHeaderComponent={_renderSearchBar}
				keyExtractor={_keyExtractor}
				renderItem={_renderTravellerHolder}
			/>
		</ScrollView>
	);
};

export default Traveller;
