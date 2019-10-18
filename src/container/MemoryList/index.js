import React, { Component } from 'react';
import { View, Text, Dimensions, FlatList } from 'react-native';

import { MemoryHolder } from '@components';
import { Languages } from '@common';

import styles from './styles';

const { width, height } = Dimensions.get('window');

class MemoryList extends Component {
	//constructor(props) {
	//super (props)
	//}

	_keyExtractor = (item, index) => item.itineraryId;

	componentDidMount() {}

	componentDidUpdate() {}

	componentWillUnmount() {}

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
		<ItineraryHolder itinerary={item} key={item.itineraryId} onPress={() => this._onPressItinerary(item)} />
	);

	_renderEmpty = () => {
		return <Text>Empty</Text>;
	};

	render() {
		const { memories } = this.props;

		return (
			<FlatList
				style={{ width: width }}
				data={memories}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				keyExtractor={this._keyExtractor}
				renderItem={this._renderItem}
				ListEmptyComponent={this._renderEmpty}
			/>
		);

		// if (memories.length > 0) {
		// 	return (
		// 		<View>
		// 			{memories.map((memory, index) => {
		// 				return <MemoryHolder memory={memory} key={index} />;
		// 			})}
		// 			{this.renderEndofList()}
		// 		</View>
		// 	);
		// }
		// return (
		// 	<View style={styles.emptyView}>
		// 		<Text style={styles.emptyText}>No Memories</Text>
		// 	</View>
		// );
	}
}
export default MemoryList;
