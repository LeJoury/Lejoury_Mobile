import React, { Component } from 'react';
import { View, FlatList, Text, TouchableOpacity, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { deleteItineraryByID, getDraftItineraries } from '@actions';

import { ItineraryHolder, Button } from '@components';
import { Color, Styles, Languages, Constants } from '@common';

import styles from './styles';

const { Action } = Constants.Action;

class DraftItinerary extends Component {
	//constructor(props) {
	//super (props)
	//}
	_keyExtractor = (item, index) => index.toString();

	componentDidMount() {
		this.props.onRef(this);
	}

	componentDidUpdate() {}

	componentWillUnmount() {
		this.props.onRef(null);
	}

	onPressItinerary = (itinerary) => {
		this.props.navigation.navigate('AddItineraryDetail', {
			draftItinerary: itinerary,
			itineraryId: itinerary.itineraryId,
			action: Action.EDIT
		});
	};

	onPressAddNewItinerary = () => {
		this.props.navigation.navigate('AddNewItineraryScreen');
	};

	onRemoveDraft = (itineraryId) => {
		const { token, userId } = this.props.user;

		Alert.alert(Languages.RemoveConfirmationItineraryTitle, Languages.RemoveConfirmationItinerary, [
			{
				text: Languages.Remove,
				onPress: () => {
					let needUpdate = this.props.draft.itineraries.length >= 10;

					try {
						let response = this.props.deleteItineraryByID(itineraryId, token);

						if (response.OK) {
							if (needUpdate) {
								this.props.getDraftItineraries(token, userId);
							}
						}
					} catch (error) {
						console.log(error);
					}
				},
				style: 'destructive'
			},
			{
				text: Languages.Cancel
			}
		]);
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
			onRemovePress={() => this.onRemoveDraft(item.itineraryId)}
		/>
	);

	renderEmpty = () => <ItineraryHolder type="emptyDraft" onPress={() => this.onPressAddNewItinerary()} />;

	render() {
		const { itineraries } = this.props.draft;
		return (
			<View style={Styles.Common.FullFlex}>
				<FlatList
					style={{ paddingTop: 6 }}
					data={itineraries}
					extraData={itineraries}
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

const mapStateToProps = ({ draft, user }) => ({
	draft,
	user
});

export default connect(mapStateToProps, { deleteItineraryByID, getDraftItineraries })(DraftItinerary);
