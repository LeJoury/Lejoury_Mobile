import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';

import { connect } from 'react-redux';
import { getActivityBookmark } from '@actions';

import { BookmarkActivityHolder } from '@components';

import { Styles, Languages, Color } from '@common';

import styles from './styles';

const BucketActivity = (props) => {
	const [ activities, setActivities ] = useState([]);
	useEffect(
		() => {
			const getBookmarks = async () => {
				try {
					let response = await props.getActivityBookmark(props.user.token);

					if (response.OK) {
						setActivities(response.data);
					}
				} catch (error) {
					console.log(error);
				}
			};
			getBookmarks();

			const didFocusSubscription = props.navigation.addListener('didFocus', (payload) => {
				getBookmarks();
			});

			return () => {
				didFocusSubscription.remove();
			};
		},
		[ props ]
	);

	const _keyExtractor = (item, index) => item.id.toString();

	const refreshBookmarks = async () => {
		try {
			let response = await props.getActivityBookmark(props.user.token);

			if (response.OK) {
				setActivities(response.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const onPressActivity = (selectedActivity) => {
		props.navigation.navigate('BucketActivityDetail', {
			selectedActivity: selectedActivity,
			updateBookmark: refreshBookmarks
		});
	};

	const renderEmpty = () => (
		<View style={styles.emptyContainer}>
			<Icon name="bookmark" type="feather" size={Styles.IconSize.CenterView} color={Color.lightGrey5} />
			<Text style={styles.emptyBucketListText}>{Languages.EmptyBucketText}</Text>
		</View>
	);

	const renderActivity = ({ item }) => {
		return <BookmarkActivityHolder activity={item} onPress={(activity) => onPressActivity(activity)} />;
	};

	return (
		<View style={styles.container}>
			{activities.length > 0 ? (
				<FlatList
					data={activities}
					contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}
					keyExtractor={_keyExtractor}
					renderItem={renderActivity}
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

export default connect(mapStateToProps, { getActivityBookmark })(BucketActivity);
