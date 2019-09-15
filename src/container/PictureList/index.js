import React, { Component } from 'react';
import { View, Text, FlatList, Image, Dimensions } from 'react-native';

import { PictureHolder } from '@components';
import { Languages } from '@common';

import styles from './styles';

const { width, height } = Dimensions.get('window');

class PictureList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: {}
		};
	}

	componentDidMount() {
		var that = this;
		let items = Array.apply(null, Array(60)).map((v, i) => {
			return { id: i, src: 'http://placehold.it/200x200?text=' + (i + 1) };
		});

		that.setState({
			dataSource: items
		});
	}

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

	_renderItem = ({ item }) => <Image style={styles.imageThumbnail} source={{ uri: item.src }} />;

	_renderEmpty = () => <Text>{Languages.Empty}</Text>;

	render() {
		const { pictures, user } = this.props;

		const { dataSource } = this.state;
		return (
			<View style={styles.container}>
				<FlatList
					style={{ width: width }}
					data={dataSource}
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					keyExtractor={this._keyExtractor}
					renderItem={this._renderItem}
					ListEmptyComponent={this._renderEmpty}
				/>
			</View>
		);
	}
}
export default PictureList;
