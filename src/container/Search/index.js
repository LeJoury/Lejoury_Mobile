import React, { Component } from 'react';
import { View, SegmentedControlIOS, ScrollView, Text } from 'react-native';

import { connect } from 'react-redux';
import { setSearch } from '@actions';

import { Images, Languages, toCapitalized, Color } from '@common';
import { Search as SearchBar, HeaderAndSeeMoreWrapper, Section } from '@components';

import styles from './styles';

class Search extends Component {
	constructor(props) {
		super(props);

		this.state = { selectedIndex: 0, onFocus: false };
	}

	componentDidMount() {
		console.log(this.props);
	}

	componentDidUpdate() {}

	componentWillUnmount() {}

	renderMainView() {
		if (this.props.search.isSearching) {
			return (
				<View style={styles.mainViewContainer}>
					<SegmentedControlIOS
						values={[ Languages.Itineraries, Languages.Country ]}
						selectedIndex={this.state.selectedIndex}
					/>
				</View>
			);
		}

		return (
			<View>
				<Section
					containerStyle={styles.sectionContainer}
					titleStyle={styles.sectionTitle}
					isHorizontalList={true}
					showHorizontalIndicator={false}
					data={[]}
					sectionBigTitle={Languages.TopPhotos}
					seeMoreStyle={styles.seeMoreStyle}
					hasShowMore={true}
				/>

				<Section
					containerStyle={styles.sectionContainer}
					titleStyle={styles.sectionTitle}
					isHorizontalList={true}
					showHorizontalIndicator={false}
					data={[]}
					sectionBigTitle={Languages.PopularJourneys}
					seeMoreStyle={styles.seeMoreStyle}
					hasShowMore={true}
				/>

				<Section
					containerStyle={styles.sectionContainer}
					titleStyle={styles.sectionTitle}
					isHorizontalList={true}
					showHorizontalIndicator={false}
					data={[]}
					sectionBigTitle={Languages.TrendingInfluencers}
					seeMoreStyle={styles.seeMoreStyle}
					hasShowMore={true}
				/>
			</View>
		);
	}

	render() {
		return (
			<ScrollView style={{ flex: 1 }}>
				<SearchBar />
				{this.renderMainView()}
			</ScrollView>
		);
	}
}

const mapStateToProps = ({ netInfo, search }) => ({
	netInfo,
	search
});

export default connect(mapStateToProps, { setSearch })(Search);
