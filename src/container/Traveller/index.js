import React, { Component } from 'react';
import {
	BackHandler,
	View,
	Text,
	FlatList,
	Image,
	RefreshControl,
	TouchableOpacity,
	Alert,
	TouchableWithoutFeedback,
	Platform,
	TouchableNativeFeedback
} from 'react-native';

import { connect } from 'react-redux';
import { getTravellers, followTraveller, getProfile } from '@actions';

import { Images, Color, Languages, Constants, create_UUID } from '@common';

import styles from './styles';

const Touchable = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;

const { Follow_Type } = Constants.Follow_Type;

class Traveller extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page: 1,
			endReachedCalledDuringMomentum: true,
			pullToRefresh: false
		};
	}

	_keyExtractor = (item) => item.userId.toString();

	componentWillMount() {
		BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonPressAndroid);
	}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonPressAndroid);
	}

	handleBackButtonPressAndroid = () => {
		this.props.navigation.goBack(null);
		return true;
	};

	navigateToSelectedTraveller = (selectedUser) => {
		this.props.navigation.navigate('TravellerProfile', {
			user: selectedUser
		});
	};

	refreshTravellers = async () => {
		const { token } = this.props.user;
		this.setState({ pullToRefresh: true });

		try {
			let response = await this.props.getTravellers(token);

			if (response.OK) {
				this.setState({ pullToRefresh: false });
			}
		} catch (error) {
			this.setState({ pullToRefresh: false });
		}
		// console.log(this.props.profile);
	};

	onHandleFollow = async (token, travellerId, following) => {
		const { userId } = this.props.user;

		try {
			let response = await this.props.followTraveller(
				token,
				travellerId,
				following ? Follow_Type.UNFOLLOW : Follow_Type.FOLLOW
			);

			if (response.OK) {
				await this.props.getProfile(userId, token);
			}
		} catch (error) {}
	};

	handleLoadMore = async () => {
		const { token } = this.props.user;

		if (!this.state.endReachedCalledDuringMomentum && !this.state.pullToRefresh) {
			if (!this.props.traveller.isTravellerLastPage) {
				try {
					let response = await this.props.getTravellers(token, this.state.page + 1);

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
		const functionTextColor = item.following ? Color.white : Color.blue5;
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
							<Text style={styles.travellerNameTextStyle}>{item.bio ? item.bio : item.username}</Text>
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

	render() {
		return (
			<FlatList
				data={this.props.traveller.travellers}
				extraData={[ this.props.traveller, this.state ]}
				refreshControl={
					<RefreshControl refreshing={this.state.pullToRefresh} onRefresh={this.refreshTravellers} />
				}
				keyExtractor={this._keyExtractor}
				renderItem={this.renderTravellerHolder}
				style={styles.container}
				contentContainerStyle={styles.scrollViewContentContainerStyle}
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

const mapStateToProps = ({ user, profile, traveller }) => ({
	user,
	profile,
	traveller
});

export default connect(mapStateToProps, { getTravellers, followTraveller, getProfile })(Traveller);
