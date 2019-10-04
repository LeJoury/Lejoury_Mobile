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

	componentDidMount() {
		this.props.onRef(this);
	}

	componentDidUpdate() {}

	componentWillUnmount() {
		this.props.onRef(null);
	}

	onPressItinerary = (itinerary) => {
		// console.log(itinerary);

		this.props.addItineraryToRedux(itinerary);
		this.props.navigation.navigate('AddItineraryDetail');
	};

	onPressAddNewItinerary = () => {
		this.props.navigation.navigate('UploadNewItineraryScreen');
	};

	onRemoveDraft = (itineraryID) => {
		this.props
			.removeItineraryDraft(itineraryID)
			.then((removedID) => {
				console.log(removedID);
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

	renderItem = ({ item }) => (
		<ItineraryHolder
			type="draft"
			itinerary={item}
			key={item.itineraryId}
			onPress={() => this.onPressItinerary(item)}
			onRemovePress={() => this.onRemoveDraft(item.itineraryID)}
		/>
	);

	renderEmpty = () => <ItineraryHolder type="emptyDraft" onPress={() => this.onPressAddNewItinerary()} />;

	render() {
		const { navigation } = this.props;
		const { itineraries } = this.props.draft;

		return (
			<View style={{ flex: 1 }}>
				<FlatList
					style={{ paddingTop: 6 }}
					data={itineraries}
					keyExtractor={this._keyExtractor}
					renderItem={this.renderItem}
					ListEmptyComponent={this.renderEmpty}
				/>
				{/* <Button
					type="floating"
					onPress={() => this._onPressAddNewItinerary()}
					buttonColor={Color.primary}
					icon={<Icon name="plus" type="feather" size={Styles.IconSize.Medium} color={Color.white} />}
				/> */}
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
