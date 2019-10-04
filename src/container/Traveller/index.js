import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	FlatList,
	Image,
	TouchableOpacity,
	Platform,
	ScrollView,
	TouchableWithoutFeedback
} from 'react-native';
import { SearchBar } from 'react-native-elements';

import { Color, Languages } from '@common';

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

	const _keyExtractor = (item) => item.travellerID;

	const updateSearch = (value) => {
		setSearch(value);
	};

	const navigateToSelectedTraveller = () => {
		console.log('pressed');
	};

	const renderTravellerHolder = ({ item }) => {
		const functionButtonBGStyle = item.following ? styles.followingButtonStyle : styles.followButtonStyle;
		const functionTextColor = item.following ? Color.white : Color.blue5;
		const functionText = item.following ? Languages.ButtonFollowing : Languages.ButtonFollow;

		return (
			<View style={styles.travellerContainer}>
				<Image style={styles.travellerThumbnails} source={{ uri: item.travellerThumbnails }} />
				<View style={styles.travellerSubcontainer}>
					<TouchableWithoutFeedback
						style={styles.travellerNameContainer}
						onPress={navigateToSelectedTraveller}
					>
						<View style={styles.travellerNameContainer}>
							<Text style={styles.travellerUsernameTextStyle}>{item.travellerName}</Text>
							<Text style={styles.travellerNameTextStyle}>{item.travellerName}</Text>
						</View>
					</TouchableWithoutFeedback>

					<TouchableOpacity style={[ styles.travellerFunctionButton, functionButtonBGStyle ]}>
						<Text style={[ styles.travellerFunctionTextStyle, { color: functionTextColor } ]}>
							{functionText}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	};

	const renderSearchBar = () => (
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
		<ScrollView style={styles.container} contentContainerStyle={styles.scrollViewContentContainerStyle}>
			{renderSearchBar()}
			<FlatList
				data={travellers}
				// ListHeaderComponent={_renderSearchBar}
				keyExtractor={_keyExtractor}
				renderItem={renderTravellerHolder}
			/>
		</ScrollView>
	);
};

export default Traveller;
