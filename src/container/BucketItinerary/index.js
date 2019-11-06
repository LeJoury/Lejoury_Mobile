import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';

import { Icon } from 'react-native-elements';

import { connect } from 'react-redux';
import { getItineraryBookmark } from '@actions';

import { ItineraryHolder } from '@components';
import { Styles, Languages, Color } from '@common';

import styles from './styles';

const BucketItinerary = (props) => {
	const [ itineraries, setItineraries ] = useState([]);

	useEffect(() => {
		const getBookmarks = async () => {
			try {
				let response = await props.getItineraryBookmark(props.user.token);

				if (response.OK) {
					setItineraries(response.data);
				}
			} catch (error) {
				console.log(error);
			}
		};

		getBookmarks();
	}, []);

	const _keyExtractor = (item, index) => item.itineraryId.toString();

	const onPressItinerary = (selectedItinerary) => {
		// updater functions are preferred for transactional updates
		this.props.navigation.navigate('ItineraryDetails', {
			itinerary: selectedItinerary
		});
	};

	const renderEmpty = () => (
		<View style={styles.emptyContainer}>
			<Icon name="bookmark" type="feather" size={Styles.IconSize.CenterView} color={Color.lightGrey5} />
			<Text style={styles.emptyBucketListText}>{Languages.EmptyBucketText}</Text>
		</View>
	);

	const renderItinerary = ({ item }) => {
		return <ItineraryHolder itinerary={item} key={item.itineraryId} onPress={() => onPressItinerary(item)} />;
	};

	return (
		<View style={styles.container}>
			{itineraries.length > 0 ? (
				<FlatList
					data={itineraries}
					contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}
					keyExtractor={_keyExtractor}
					renderItem={renderItinerary}
				/>
			) : (
				renderEmpty()
			)}
		</View>
	);
};

const mapStateToProps = ({ user }) => ({
	user
});

export default connect(mapStateToProps, { getItineraryBookmark })(BucketItinerary);
