import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

import { Icon } from 'react-native-elements';

import { connect } from 'react-redux';
import { getActivityBookmark } from '@actions';

import { Styles, Languages, Color } from '@common';

import styles from './styles';

const BucketActivity = (props) => {
	useEffect(() => {
		const getBookmarks = async () => {
			try {
				let response = await props.getActivityBookmark(props.user.token);

				if (response.OK) {
				}
			} catch (error) {
				console.log(error);
			}
		};

		getBookmarks();
	}, []);

	return (
		<View style={styles.container}>
			<Icon name="bookmark" type="feather" size={Styles.IconSize.CenterView} color={Color.lightGrey5} />
			<Text style={styles.emptyBucketListText}>{Languages.EmptyBucketText}</Text>
		</View>
	);
};

const mapStateToProps = ({ user }) => ({
	user
});

export default connect(mapStateToProps, { getActivityBookmark })(BucketActivity);
