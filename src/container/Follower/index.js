import React, { Component } from 'react';
import {
	View,
	Text,
	FlatList,
	Image,
	TouchableOpacity,
	Alert,
	Platform,
	TouchableWithoutFeedback,
	TouchableNativeFeedback
} from 'react-native';
import { SearchBar } from 'react-native-elements';

import { connect } from 'react-redux';
import { getFollowers, getProfile, followTraveller } from '@actions';

import { Color, Languages, Images, Constants } from '@common';

import styles from './styles';

const Touchable = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;

const { Follow_Type } = Constants.Follow_Type;

class Follower extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			page: 1,
			endReachedCalledDuringMomentum: true
		};
	}

	_keyExtractor = (item) => item.userId.toString();

	updateSearch = (value) => {
		this.setState({ search: value });
	};

	navigateToSelectedTraveller = (selectedUser) => {
		this.props.navigation.navigate('TravellerProfile', {
			user: selectedUser
		});
	};

	onHandleFollow = async (token, travellerId, following) => {
		const { userId } = this.props.user;
		try {
			let response = await this.props.followTraveller(
				token,
				travellerId,
				following ? Follow_Type.UNFOLLOW : Follow_Type.FOLLOW,
				'FollowerList'
			);

			if (response.OK) {
				await this.props.getProfile(userId, token);
			}
		} catch (error) {
			console.log(error);
		}
	};

	handleLoadMore = async () => {
		const { token } = this.props.user;

		if (!this.state.endReachedCalledDuringMomentum) {
			if (!this.props.profile.isFollowerLastPage) {
				try {
					let response = await this.props.getFollowers(token, this.state.page + 1);

					if (response.OK) {
						this.setState((prevState) => {
							return {
								page: prevState.page + 1,
								endReachedCalledDuringMomentum: true
							};
						});
					}
				} catch (error) {
					console.log(error);
				}
			} else {
				this.setState({
					endReachedCalledDuringMomentum: true
				});
			}
		}
	};

	onFollowClick = async (item) => {
		const { token } = this.props.user;
		const { following, userId, username } = item;

		if (following) {
			let message = `${Languages.AreYouSureToUnfollow}${username} ?`;

			Alert.alert('', message, [
				{
					text: Languages.Cancel,
					onPress: null
				},
				{
					text: Languages.Confirm,
					onPress: () => this.onHandleFollow(token, userId, following),
					style: 'destructive'
				}
			]);
		} else {
			this.onHandleFollow(token, userId, following);
		}
	};

	renderTravellerHolder = ({ item }) => {
		const functionButtonBGStyle = item.following ? styles.followingButtonStyle : styles.followButtonStyle;
		const functionTextColor = item.following ? Color.lightGrey3 : Color.white;
		const functionText = item.following ? Languages.ButtonFollowing : Languages.ButtonFollow;

		return (
			<View style={styles.travellerContainer}>
				<Image
					style={styles.travellerThumbnails}
					source={item.photo ? { uri: item.photo } : Images.defaultAvatar}
				/>

				<View style={styles.travellerSubcontainer}>
					<TouchableWithoutFeedback
						style={styles.travellerNameContainer}
						onPress={() => this.navigateToSelectedTraveller(item)}
					>
						<View style={styles.travellerNameContainer}>
							<Text style={styles.travellerUsernameTextStyle}>{item.username}</Text>
							<Text style={styles.travellerNameTextStyle}>{item.username}</Text>
						</View>
					</TouchableWithoutFeedback>

					<Touchable activeOpacity={0.8} onPress={() => this.onFollowClick(item)}>
						<View style={[ styles.travellerFunctionButton, functionButtonBGStyle ]}>
							<Text style={[ styles.travellerFunctionTextStyle, { color: functionTextColor } ]}>
								{functionText}
							</Text>
						</View>
					</Touchable>
				</View>
			</View>
		);
	};

	renderSearchBar = () => (
		<SearchBar
			placeholder={Languages.Search}
			onChangeText={this.updateSearch}
			value={this.state.search}
			lightTheme={true}
			platform={Platform.OS}
			showCancel={false}
			containerStyle={styles.searchBarContainerStyle}
			inputContainerStyle={styles.searchBarInputContainerStyle}
			inputStyle={styles.searchBarInputStyle}
			leftIconContainerStyle={{ paddingLeft: 6 }}
		/>
	);

	render() {
		return (
			<FlatList
				ListHeaderComponent={this.renderSearchBar()}
				style={styles.container}
				contentContainerStyle={styles.scrollViewContentContainerStyle}
				data={this.props.profile.followers}
				extraData={[ this.state, this.props.profile ]}
				keyExtractor={this._keyExtractor}
				renderItem={this.renderTravellerHolder}
				onEndReachedThreshold={0.2}
				onEndReached={() => this.handleLoadMore()}
				onMomentumScrollBegin={() => {
					this.setState({
						endReachedCalledDuringMomentum: false
					});
				}}
			/>
		);
	}
}

const mapStateToProps = ({ user, profile }) => ({
	user,
	profile
});

export default connect(mapStateToProps, { getFollowers, followTraveller, getProfile })(Follower);
