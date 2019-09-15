import React, { Component } from 'react';
import { View, FlatList, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';

import { getItineraryDraft, removeItineraryDraft, addItineraryToRedux } from '@actions';

import { ItineraryHolder, Button } from '@components';
import { Color, Styles, Languages } from '@common';

import styles from './styles';

class DraftItinerary extends Component {
	//constructor(props) {
	//super (props)
	//}
	_keyExtractor = (item, index) => item.itineraryID;

	componentDidUpdate() {}

	componentWillUnmount() {}

	_onPressItinerary = (itinerary) => {
		// console.log(itinerary);

		this.props.addItineraryToRedux(itinerary);
		this.props.navigation.navigate('AddItineraryDetail');
	};

	_onPressAddNewItinerary = () => {
		this.props.navigation.navigate('UploadNewItineraryScreen');
	};

	_onRemoveDraft = (itineraryID) => {
		this.props
			.removeItineraryDraft(itineraryID)
			.then((removedID) => {
				console.log(removedID);
				// dispatch({
				// 	type: Types.REMOVE_ITINERARY_FROM_DRAFT
				// });
			})
			.catch((error) => {
				console.log(error);
			});
		this.props.getItineraryDraft();
	};

	renderEndofList() {
		return (
			<View style={styles.separatorWrap}>
				<View style={styles.separator} />
				<Text style={styles.separatorText}>{Languages.End}</Text>
				<View style={styles.separator} />
			</View>
		);
	}

	_renderItem = ({ item }) => (
		<ItineraryHolder
			type="draft"
			itinerary={item}
			key={item.itineraryId}
			onPress={() => this._onPressItinerary(item)}
			onRemovePress={() => this._onRemoveDraft(item.itineraryID)}
		/>
	);

	_renderEmpty = () => (
		<ItineraryHolder
			type="emptyDraft"
			onPress={() => this._onPressAddNewItinerary()}
		/>
	);

	render() {
		const { navigation } = this.props;
		const { itineraries } = this.props.draft;

		return (
			<View style={{ flex: 1 }}>
				<FlatList
					data={itineraries}
					keyExtractor={this._keyExtractor}
					renderItem={this._renderItem}
					ListEmptyComponent={this._renderEmpty}
				/>
				<Button
					type="floating"
					onPress={() => this._onPressAddNewItinerary()}
					buttonColor={Color.primary}
					icon={<Icon name="plus" type="feather" size={Styles.IconSize.Medium} color={Color.white} />}
				/>
			</View>
		);
	}
}

const mapStateToProps = ({ draft }) => ({
	draft
});

export default connect(mapStateToProps, { getItineraryDraft, removeItineraryDraft, addItineraryToRedux })(
	DraftItinerary
);
